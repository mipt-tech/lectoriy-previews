import React, { useRef, useEffect } from 'react'
import throttle from 'react-throttle-render'
import { Stage, Layer, Image } from 'react-konva'
import Konva from 'konva'
import { loadImage } from '../../../../../util/img'

const SilhouetteFactory = ({ chaplin, posterization, brightness, contrast, onDone }) => {
  const ref = useRef()
  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      if (ref.current) {
        ref.current.cache()
        ref.current.levels(posterization)
        ref.current.brightness(brightness)
        ref.current.contrast(contrast)
        ref.current.getLayer().draw()
        const src = ref.current.getCanvas().toDataURL()
        const img = await loadImage(src)
        onDone(img)
      }
    })()
  }, [posterization, brightness, contrast, chaplin])

  const width = chaplin.width / devicePixelRatio
  const height = chaplin.height / devicePixelRatio

  return (
    <Stage width={width} height={height} style={{ display: 'none' }}>
      <Layer>
        <Image
          width={width}
          height={height}
          image={chaplin}
          ref={ref}
          filters={[Konva.Filters.Brighten, Konva.Filters.Contrast, Konva.Filters.Posterize]}
        />
      </Layer>
    </Stage>
  )
}

export default React.memo(throttle(1000)(SilhouetteFactory))
