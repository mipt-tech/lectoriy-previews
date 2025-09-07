import React, { useState } from 'react'
import Thumbnail from './Thumbnail/Thumbnail'
import Button from '@material-ui/core/Button'
import GetAppIcon from '@material-ui/icons/GetApp'
import { THUMB_ACTION } from '../../constants'

const DownloadImageButton = () => {
  const [active, setActive] = useState(false)
  return (
    <>
      {active && (
        <div style={{ display: 'none' }}>
          <Thumbnail
            actionOnMount={THUMB_ACTION.EXPORT_IMAGE}
            downloadWhenMounted={true}
            onDownloadReady={() => setActive(false)}
          />
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        style={{
          color: '#fff',
          fontSize: 16,
          padding: '10px 18px',
        }}
        startIcon={<GetAppIcon />}
        onClick={() => setActive(true)}
        disabled={active}
      >
        Скачать результат
      </Button>
    </>
  )
}

export default DownloadImageButton
