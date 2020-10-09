import React, { useEffect, useRef } from 'react'
import Konva from 'konva'
import { Stage, Layer, Group, Image, Line } from 'react-konva'
import { inscribe, getRect } from '../../../../../util/rect'
import { toKonvaTransform, compose } from '../../../../../util/transform'
import { loadImage } from '../../../../../util/img'
import settings from '../../../../../util/settings'

const maxWidth = settings.outputWidth / devicePixelRatio
const maxHeight = settings.outputHeight / devicePixelRatio
const rectToInscribeIn = {
  left: 0,
  top: 0,
  right: maxWidth,
  bottom: maxHeight,
}

const ChaplinFactory = ({ photo, masks, onDone }) => {
  const bodyBounds = getRect(photo, masks)
  const { transformation, inscribedRect } = inscribe(bodyBounds, rectToInscribeIn)
  const ref = useRef()

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      if (ref.current) {
        const base64src = await (async () => {
          ref.current.cache()
          ref.current.getLayer().draw()
          return ref.current.getCanvas().toDataURL()
        })()
        const preprocessedImage = await loadImage(base64src)
        const masksTransform = compose(transformation, {
          translation: { x: 0, y: 0 },
          scale: devicePixelRatio,
        })
        onDone(preprocessedImage, masksTransform)
      }
    })()
  }, [ref])

  const newWidth = inscribedRect.width
  const newHeight = inscribedRect.height

  return (
    <Stage width={newWidth} height={newHeight} style={{ display: 'none' }}>
      <Layer>
        <Group {...toKonvaTransform(transformation)}>
          <Image image={photo} ref={ref} filters={[Konva.Filters.Grayscale]} />
          {masks.map((mask, key) => (
            <Line
              key={key}
              points={mask.polyline.flat()}
              fill="black"
              closed
              globalCompositeOperation={mask.inverse ? 'destination-out' : 'destination-in'}
            />
          ))}
        </Group>
      </Layer>
    </Stage>
  )
}

export default ChaplinFactory
