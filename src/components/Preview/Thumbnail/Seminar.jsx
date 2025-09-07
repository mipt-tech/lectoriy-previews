import React from 'react'
import { Rect, Text, Group } from 'react-konva'
import settings from '../../../util/settings'

const h = 70

const Seminar = ({ year, text, width, ...props }) => (
  <Group {...props}>
    <Rect
      strokeWidth={6}
      stroke={settings.textSecondaryColor[year]}
      width={width}
      height={h}
      cornerRadius={14}
    />
    <Text
      x={12}
      text={text}
      fontFamily={settings.fontFace}
      fontSize={70}
      fill={settings.textSecondaryColor[year]}
      width={width - 24}
      align="center"
      verticalAlign="middle"
      height={h}
    />
  </Group>
)

Seminar.height = h

export default Seminar
