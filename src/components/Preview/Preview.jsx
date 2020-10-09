import React from 'react'
import Thumbnail from './Thumbnail/Thumbnail'
import settings from '../../util/settings'

import styles from './Preview.css'

const w = settings.outputWidth

const ThumbnailsSprite = () => (
  <div className={styles.thumbnails}>
    <Thumbnail scale={640 / w} />
    <div style={{ display: 'flex', alignItems: 'start' }}>
      <Thumbnail scale={210 / w} />
      <Thumbnail scale={100 / w} />
    </div>
  </div>
)

export default React.memo(ThumbnailsSprite)
