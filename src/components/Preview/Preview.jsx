import React from 'react'
import Typography from '@material-ui/core/Typography'
import Thumbnail from './Thumbnail/Thumbnail'
import settings from '../../util/settings'

import styles from './Preview.css'
import DownloadButton from './DownloadButton'

const w = settings.outputWidth

const ThumbnailIRL = ({ width, caption }) => (
  <div className={styles.withCaption}>
    <div className={styles.withDuration}>
      <Thumbnail scale={width / w} />
      <div className={styles.duration}>
        <Typography className={styles.durationText}>1:19:48</Typography>
      </div>
    </div>
    <Typography variant="caption" className={styles.caption} color="textSecondary">
      {caption}
    </Typography>
  </div>
)

const Preview = () => (
  <div className={styles.thumbnails}>
    <Thumbnail scale={640 / w} />
    <div className={styles.secondLine}>
      <ThumbnailIRL width={210} caption="На странице канала" />
      <ThumbnailIRL width={100} caption="В плейлисте" />
      <div className={styles.downloadButtonContainer}>
        <DownloadButton />
      </div>
    </div>
  </div>
)

export default React.memo(Preview)
