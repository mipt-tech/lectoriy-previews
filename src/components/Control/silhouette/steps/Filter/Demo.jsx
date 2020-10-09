import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Stage, Layer, Image, Rect } from 'react-konva'
import Konva from 'konva'
import settings from '../../../../../util/settings'
import { inscribe } from '../../../../../util/rect'

import styles from './Demo.css'

const maxWidth = 500
const maxHeight = Math.max(document.body.clientHeight - 400, 300)
const rectToInscribeIn = { width: maxWidth, height: maxHeight }

const Demo = ({ chaplin, posterization, brightness, contrast }) => {
  const year = useSelector(state => state.year)
  const ref = useRef()
  useEffect(() => {
    if (ref.current) {
      ref.current.cache()
      ref.current.levels(posterization)
      ref.current.brightness(brightness)
      ref.current.contrast(contrast)
      ref.current.getLayer().draw()
    }
  }, [posterization, brightness, contrast, chaplin])

  const { inscribedRect } = inscribe(chaplin, rectToInscribeIn)
  const width = inscribedRect.width
  const height = inscribedRect.height
  const background = settings.backgroundColor[year]

  return (
    <div className={styles.canvasWrapper} style={{ background }}>
      <Stage width={width} height={height}>
        <Layer>
          <Image
            image={chaplin}
            width={width}
            height={height}
            ref={ref}
            filters={[Konva.Filters.Brighten, Konva.Filters.Contrast, Konva.Filters.Posterize]}
          />
          <Rect
            fill={settings.silhouetteColor[year]}
            width={width}
            height={height}
            globalCompositeOperation={year < 4 ? 'screen' : 'overlay'}
          />
        </Layer>
      </Stage>
    </div>
  )
}

export default React.memo(Demo)
