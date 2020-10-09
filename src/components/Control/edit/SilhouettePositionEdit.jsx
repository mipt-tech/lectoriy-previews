import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAdditionalX } from '../../../store/actions'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const SilhouettePositionEdit = () => {
  const x = useSelector(state => state.additional_x)
  const dispatch = useDispatch()

  function onChange(_, x) {
    dispatch(setAdditionalX(x - 1))
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="caption">Горизонтальное положение</Typography>
      </Grid>
      <Grid item xs={12}>
        <Slider value={x + 1} onChange={onChange} min={0} step={0.01} max={1} track={false} />
      </Grid>
    </Grid>
  )
}

export default React.memo(SilhouettePositionEdit)
