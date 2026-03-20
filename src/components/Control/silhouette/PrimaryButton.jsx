import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import Dialog from './Dialog'

import styles from './PrimaryButton.css'
import stylesControl from '../Control.css'

const PrimaryButton = () => {
  const hasAnything = useSelector(state => state.photo != null)
  const hasSilhouette = useSelector(state => state.silhouette != null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const button = hasSilhouette ? (
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
  )

  return (
    <FormControl fullWidth>
      <FormHelperText className={styles.caption}>Фотка лектора</FormHelperText>
      <Grid container spacing={1}>
        <Grid item>{button}</Grid>
        <Grid item>
          <Tooltip title="Все параметры, кроме номера и темы занятия, должны быть одинаковыми на протяжении всего семестра. Это относится и к фото и его расположению для каждого лектора по отдельности">
            <InfoOutlinedIcon
              className={stylesControl.infoIcon}
              style={{ marginTop: '6px', fontSize: '1.5rem' }}
            />
          </Tooltip>
        </Grid>
      </Grid>
      <Dialog isOpen={dialogOpen} close={() => setDialogOpen(false)} />
    </FormControl>
  )
}

export default React.memo(PrimaryButton)
