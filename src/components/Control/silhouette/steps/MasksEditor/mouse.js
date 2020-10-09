import { useRef } from 'react'

function useMouse(
  stageRef,
  scale,
  stagePadding,
  activePolyline,
  setMouseCoords,
  setActivePolyline,
  closePolyline
) {
  const clickEventBegan = useRef(false)

  function getCoords(e) {
    const dim = stageRef.current.getBoundingClientRect()
    const x = (e.clientX - dim.left) / scale - stagePadding
    const y = (e.clientY - dim.top) / scale - stagePadding
    return [x, y]
  }

  function onCanvasMouseDown(e) {
    clickEventBegan.current = true
    if (activePolyline) {
      setActivePolyline([...activePolyline, getCoords(e)])
    }
  }

  function onCanvasMouseUp(e) {
    if (clickEventBegan.current) {
      if (!activePolyline) {
        const coords = getCoords(e)
        setMouseCoords(coords)
        setActivePolyline([coords])
      }
    }
  }

  function onCanvasMouseMove(e) {
    clickEventBegan.current = false
    if (activePolyline) {
      setMouseCoords(getCoords(e))
    }
  }

  function onCanvasDoubleClick() {
    closePolyline()
  }

  function onCloseMouseDown(e) {
    e.stopPropagation()
    clickEventBegan.current = true
  }

  function onCloseMouseUp(e) {
    e.stopPropagation()
    if (clickEventBegan.current) {
      closePolyline()
    }
  }

  return {
    onCanvasMouseDown,
    onCanvasMouseUp,
    onCanvasMouseMove,
    onCanvasDoubleClick,
    onCloseMouseDown,
    onCloseMouseUp,
  }
}

export default useMouse
