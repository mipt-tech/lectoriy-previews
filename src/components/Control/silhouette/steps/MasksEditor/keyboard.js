import { useEffect } from 'react'

function nextColor(prevColor) {
  if (prevColor == 'white') return 'black'
  if (prevColor == 'black') return 'red'
  return 'white'
}

function useKeyboard(
  color,
  scale,
  translation,
  activePolyline,
  setColor,
  scaleBy,
  translateBy,
  setActivePolyline,
  closePolyline
) {
  useEffect(() => {
    function onKey(e) {
      switch (e.code) {
        case 'KeyI':
          setColor(nextColor(color))
          break
        case 'Equal':
          scaleBy(1.3)
          break
        case 'Minus':
          scaleBy(1 / 1.3)
          break
        case 'ArrowUp':
          translateBy(0, 30)
          break
        case 'KeyW':
          translateBy(0, 30)
          break
        case 'ArrowDown':
          translateBy(0, -30)
          break
        case 'KeyS':
          translateBy(0, -30)
          break
        case 'ArrowLeft':
          translateBy(30, 0)
          break
        case 'KeyA':
          translateBy(30, 0)
          break
        case 'ArrowRight':
          translateBy(-30, 0)
          break
        case 'KeyD':
          translateBy(-30, 0)
          break
      }
      if (activePolyline) {
        switch (e.code) {
          case 'KeyZ':
            if (activePolyline.length > 1) {
              setActivePolyline(activePolyline.slice(0, -1))
            } else {
              setActivePolyline(null)
            }
            break
          case 'KeyC':
            closePolyline()
            break
        }
      }
    }
    document.addEventListener('keydown', onKey)

    return () => document.removeEventListener('keydown', onKey)
  }, [color, scale, translation, activePolyline])
}

export default useKeyboard
