import React, { useState } from 'react'
import Thumbnail from './Thumbnail/Thumbnail'
import Button from '@material-ui/core/Button'
import GetAppIcon from '@material-ui/icons/GetApp'

const DownloadButton = () => {
  const [active, setActive] = useState(false)
  return (
    <>
      {active && (
        <div style={{ display: 'none' }}>
          <Thumbnail downloadOnMount={true} onDownloadReady={() => setActive(false)} />
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        startIcon={<GetAppIcon />}
        onClick={() => setActive(true)}
        disabled={active}
      >
        Скачать результат
      </Button>
    </>
  )
}

export default DownloadButton
