import React, { useRef, useState, useCallback } from 'react'
import { MapInteractionCSS } from 'react-map-interaction'
import ActivePolyline from './ActivePolyline'
import useMouse from './mouse'
import useKeyboard from './keyboard'

import styles from './Canvas.css'

const minScale = 0.1
const maxScale = 3

const Canvas = ({
  render,
  width,
  height,
  padding,
  viewerWidth,
  viewerHeight,
  initialScale,
  initialTranslation,
  handleNewPolyline,
}) => {
  const stageRef = useRef()
  const [scale, setScale] = useState(initialScale)
  const [translation, setTranslation] = useState(initialTranslation)
  const [coords, setCoords] = useState(null)
  const [polyline, setPolyline] = useState(null)
  const [polylineColor, setPolylineColor] = useState('white')

  const scaleBy = useCallback(
    coef => {
      const newScale = scale * coef
      if (newScale < minScale || newScale > maxScale) return

      let { x, y } = translation
      const cx = viewerWidth / 2
      const cy = viewerHeight / 2
      x = cx + (x - cx) * coef
      y = cy + (y - cy) * coef
      setScale(newScale)
      setTranslation({ x, y })
    },
    [scale, translation, viewerWidth, viewerHeight]
  )

  const translateBy = useCallback(
    (dx, dy) => {
      const { x, y } = translation
      setTranslation({ x: x + dx, y: y + dy })
    },
    [translation]
  )

  const closePolyline = useCallback(() => {
    if (polyline.length >= 3) {
      setPolyline(null)
      handleNewPolyline(polyline)
    }
  }, [polyline])

  useKeyboard(
    polylineColor,
    scale,
    translation,
    polyline,
    setPolylineColor,
    scaleBy,
    translateBy,
    setPolyline,
    closePolyline
  )

  const {
    onCanvasMouseDown,
    onCanvasMouseUp,
    onCanvasMouseMove,
    onCanvasDoubleClick,
    onCloseMouseDown,
    onCloseMouseUp,
  } = useMouse(stageRef, scale, padding, polyline, setCoords, setPolyline, closePolyline)

  return (
    <MapInteractionCSS
      maxScale={Math.max(maxScale, initialScale)}
      minScale={Math.min(minScale, initialScale)}
      scale={scale}
      translation={translation}
      onChange={({ scale, translation }) => {
        setScale(scale)
        setTranslation(translation)
      }}
    >
      <div className={styles.stage} style={{ width, height }}>
        <span style={{ fontSize: 15 / scale }}>Холст</span>
        <svg
          className={styles.svg}
          width={width}
          height={height}
          ref={stageRef}
          onMouseDown={onCanvasMouseDown}
          onMouseUp={onCanvasMouseUp}
          onMouseMove={onCanvasMouseMove}
          onDoubleClick={onCanvasDoubleClick}
        >
          <g transform={`translate(${padding}, ${padding})`}>
            {render(scale)}
            {polyline && (
              <ActivePolyline
                polyline={polyline}
                color={polylineColor}
                weight={0.5 / scale}
                mouseCoords={coords}
                onCloseMouseDown={onCloseMouseDown}
                onCloseMouseUp={onCloseMouseUp}
              />
            )}
          </g>
        </svg>
      </div>
    </MapInteractionCSS>
  )
}

export default Canvas
