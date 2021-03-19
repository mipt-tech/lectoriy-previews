import React from 'react'
import { Text } from 'react-konva'
import settings from '../../../util/settings'

const Topic = ({ text, year, size, x, y }) => (
  <Text
    text={text}
    x={x}
    y={y}
    align="right"
    fill={settings.textPrimaryColor[year]}
    fontSize={size}
    fontFamily={settings.fontFace}
    lineHeight={settings.lineHeight}
  />
)

export default Topic
