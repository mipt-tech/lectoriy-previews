import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import Dialog from './Dialog'

const PrimaryButton = () => {
  const hasAnything = useSelector(state => state.photo != null)
  const hasSilhouette = useSelector(state => state.silhouette != null)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div>
      {hasSilhouette ? (
        <Button variant="outlined" color="primary" onClick={() => setDialogOpen(true)}>
          Редактировать фотку препода
        </Button>
      ) : hasAnything ? (
        <Button variant="contained" onClick={() => setDialogOpen(true)}>
          Доделать фотку препода
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          Добавить фотку препода
        </Button>
      )}
      <Dialog isOpen={dialogOpen} close={() => setDialogOpen(false)} />
    </div>
  )
}

export default React.memo(PrimaryButton)
