import React from 'react'
import { Group, Image, Rect } from 'react-konva'
import settings from '../../../util/settings'

export const SilhouetteUnderlay = ({ year, dim: { width, height } }) =>
  year == 4 && <Rect fill="white" width={width * 3} height={height * 3} x={-width} y={-height} />

export const SilhouetteOverlay = ({ year, dim: { width, height } }) => (
  <Rect
    fill={settings.silhouetteColor[year]}
    width={width}
    height={height}
    globalCompositeOperation={year == 4 ? 'color-dodge' : 'color'}
  />
)

const Silhouette = ({ image, year, ...props }) => (
  <Group {...props}>
    <SilhouetteUnderlay year={year} dim={image} />
    <Image image={image} />
    <SilhouetteOverlay year={year} dim={image} />
  </Group>
)
export default React.memo(Silhouette)
