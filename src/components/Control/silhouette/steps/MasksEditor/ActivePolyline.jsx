import React from 'react'
import last from 'just-last'
import { polylineToSvgPath } from './paths'

import styles from './ActivePolyline.css'

const ActivePolyline = ({
  polyline,
  color,
  weight,
  mouseCoords,
  onCloseMouseDown,
  onCloseMouseUp,
}) => {
  const canClose = polyline.length >= 3
  return (
    <>
      <path
        strokeWidth={2 * weight}
        stroke={color}
        fill="transparent"
        d={polylineToSvgPath(polyline)}
      />
      {polyline.map((point, key) => (
        <circle cx={point[0]} cy={point[1]} r={Math.min(2, weight * 4)} fill={color} key={key} />
      ))}
      {mouseCoords && (
        <line
          x1={last(polyline)[0]}
          y1={last(polyline)[1]}
          x2={mouseCoords[0]}
          y2={mouseCoords[1]}
          strokeWidth={weight}
          stroke={color}
        />
      )}
      {canClose && (
        <circle
          cx={polyline[0][0]}
          cy={polyline[0][1]}
          r={8 * weight}
          fill={color}
          className={styles.finisher}
          onMouseDown={onCloseMouseDown}
          onMouseUp={onCloseMouseUp}
        />
      )}
    </>
  )
}

export default React.memo(ActivePolyline)
