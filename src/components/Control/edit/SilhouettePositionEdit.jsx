import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAdditionalX } from '../../../store/actions'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

import styles from '../Control.css'

const SilhouettePositionEdit = () => {
  const x = useSelector(state => state.additional_x)
  const dispatch = useDispatch()

  function onChange(_, x) {
    dispatch(setAdditionalX(x - 1))
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Typography variant="caption" color="textSecondary">
              Горизонтальное положение
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Оставьте не менее половины обложки для темы занятия">
              <InfoOutlinedIcon className={styles.infoIcon} />
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Slider value={x + 1} onChange={onChange} min={0} step={0.01} max={2} track="normal" />
      </Grid>
    </Grid>
  )
}

export default React.memo(SilhouettePositionEdit)
