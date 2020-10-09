import React from 'react'
import { Text } from 'react-konva'
import settings from '../../../util/settings'

const Season = ({ text, year, x, y }) => (
  <Text
    text={text}
    x={x}
    y={y}
    fill={settings.textPrimaryColor[year]}
    fontSize={settings.seasonSize}
    fontFamily={settings.fontFace}
  />
)

export default Season
