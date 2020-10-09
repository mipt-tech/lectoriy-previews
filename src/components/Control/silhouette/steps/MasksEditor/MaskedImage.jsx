import React from 'react'
import { maskToSvgPath } from './paths'

const masksId = 'masks'

const MaskedImage = ({ masks, canvasWidth, canvasHeight, img }) => (
  <>
    <defs>
      <mask id={masksId}>
        <rect fill="white" width={canvasWidth} height={canvasHeight} />
        {Array.from(masks).map(([id, mask]) => (
          <path fill="black" key={id} d={maskToSvgPath(mask)} />
        ))}
      </mask>
    </defs>
    <image href={img.src} width={img.width} height={img.height} mask={`url(#${masksId})`} />
  </>
)

export default React.memo(MaskedImage)
