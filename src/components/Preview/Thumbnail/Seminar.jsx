import React from 'react'
import { Rect, Text, Group } from 'react-konva'
import settings from '../../../util/settings'

const w = 355
const h = 70

const Seminar = ({ year, ...props }) => (
  <Group {...props}>
    <Rect
      strokeWidth={6}
      stroke={settings.textSecondaryColor[year]}
      width={w}
      height={h}
      cornerRadius={14}
    />
    <Text
      x={12}
      text="семинар"
      fontFamily={settings.fontFace}
      fontSize={70}
      fill={settings.textSecondaryColor[year]}
    />
  </Group>
)

Seminar.width = w
Seminar.height = h

export default Seminar
