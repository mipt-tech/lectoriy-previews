import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAdditionalScale } from '../../../store/actions'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

import styles from '../Control.css'

const SilhouetteScaleEdit = () => {
  const scale = useSelector(state => state.additional_scale)
  const dispatch = useDispatch()

  function onChange(_, value) {
    dispatch(setAdditionalScale(value))
  }

  // Добавляем невидимую иконку, чтобы с silhouettePositionEdit быть на одном уровне
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item>
            <Typography variant="caption" color="textSecondary">
              Размер
            </Typography>
          </Grid>
          <Grid item>
            <InfoOutlinedIcon className={styles.infoIcon} style={{ visibility: 'hidden' }} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Slider value={scale} onChange={onChange} min={0.5} step={0.01} max={2} track="normal" />
      </Grid>
    </Grid>
  )
}

export default React.memo(SilhouetteScaleEdit)
