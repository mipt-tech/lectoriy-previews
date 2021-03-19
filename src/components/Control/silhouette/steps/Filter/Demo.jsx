import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Stage, Layer, Image } from 'react-konva'
import Konva from 'konva'
import { SilhouetteUnderlay, SilhouetteOverlay } from '../../../../Preview/Thumbnail/Silhouette'
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

  const chaplinRect = { left: 0, right: 0, width: chaplin.width, height: chaplin.height }
  const { inscribedRect } = inscribe(chaplinRect, rectToInscribeIn)
  const width = inscribedRect.width
  const height = inscribedRect.height
  const background = settings.backgroundColor[year]

  return (
    <div className={styles.canvasWrapper} style={{ background }}>
      <Stage width={width} height={height}>
        <Layer>
          <SilhouetteUnderlay year={year} dim={{ width, height }} />
          <Image
            image={chaplin}
            width={width}
            height={height}
            ref={ref}
            filters={[Konva.Filters.Brighten, Konva.Filters.Contrast, Konva.Filters.Posterize]}
          />
          <SilhouetteOverlay year={year} dim={{ width, height }} />
        </Layer>
      </Stage>
    </div>
  )
}

export default React.memo(Demo)
