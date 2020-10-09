import React from 'react'
import { Text } from 'react-konva'
import settings from '../../../util/settings'

const Subject = ({ text, year, x, y, size }) => (
  <Text
    text={text}
    x={x}
    y={y}
    fill={settings.textSecondaryColor[year]}
    fontSize={size}
    fontFamily={settings.fontFace}
  />
)

export default Subject
