import React, { useState } from 'react'
import Thumbnail from './Thumbnail/Thumbnail'
import Button from '@material-ui/core/Button'
import GetAppIcon from '@material-ui/icons/GetApp'
import { THUMB_ACTION } from '../../constants'

const DownloadStateButton = () => {
  const [active, setActive] = useState(false)
  const light_blue = '#6fb2ff'
  return (
    <>
      {active && (
        <div style={{ display: 'none' }}>
          <Thumbnail
            actionOnMount={THUMB_ACTION.EXPORT_STATE}
            downloadWhenMounted={true}
            onDownloadReady={() => setActive(false)}
          />
        </div>
      )}
      <Button
        variant="contained"
        style={{ backgroundColor: light_blue, color: '#fff', fontSize: 12 }}
        startIcon={<GetAppIcon style={{ transform: 'scale(0.85)' }} />}
        onClick={() => setActive(true)}
        disabled={active}
      >
        Скачать конфигурацию
      </Button>
    </>
  )
}

export default DownloadStateButton
