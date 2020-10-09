import React from 'react'
import { Group, Image, Rect } from 'react-konva'
import settings from '../../../util/settings'

const Silhouette = ({ image, year, ...props }) => (
  <Group {...props}>
    {year == 4 && (
      <Rect
        fill="white"
        width={image.width * 3}
        height={image.height * 3}
        x={-image.width}
        y={-image.height}
      />
    )}
    <Image image={image} width={image.width} height={image.height} />
    <Rect
      fill={settings.silhouetteColor[year]}
      width={image.width}
      height={image.height}
      globalCompositeOperation={year == 4 ? 'overlay' : 'screen'}
    />
  </Group>
)

export default React.memo(Silhouette)
