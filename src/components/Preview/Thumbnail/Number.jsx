import React from 'react'
import { Text } from 'react-konva'
import settings from '../../../util/settings'

const Number = ({ text, year, x, y }) => (
  <Text
    text={text}
    x={x}
    y={y}
    fill={settings.textSecondaryColor[year]}
    fontSize={settings.numberSize}
    fontFamily={settings.fontFace}
  />
)

export default Number
