import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Dialog from './Dialog'

import styles from './PrimaryButton.css'

const PrimaryButton = () => {
  const hasAnything = useSelector(state => state.photo != null)
  const hasSilhouette = useSelector(state => state.silhouette != null)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <FormControl>
      <FormHelperText className={styles.caption}>Фотка лектора</FormHelperText>
      {hasSilhouette ? (
        <Button variant="outlined" color="primary" onClick={() => setDialogOpen(true)}>
          Редактировать
        </Button>
      ) : hasAnything ? (
        <Button variant="contained" onClick={() => setDialogOpen(true)}>
          Доделать
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          Добавить
        </Button>
      )}
      <Dialog isOpen={dialogOpen} close={() => setDialogOpen(false)} />
    </FormControl>
  )
}

export default React.memo(PrimaryButton)
