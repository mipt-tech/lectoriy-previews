import React from 'react'
import { Text } from 'react-konva'
import settings from '../../../util/settings'

const Topic = ({ text, year, size, ...layoutProps }) => (
  <Text
    text={text}
    fill={settings.textPrimaryColor[year]}
    fontSize={size}
    fontFamily={settings.fontFace}
    lineHeight={1.2}
    {...layoutProps}
  />
)

export default Topic
