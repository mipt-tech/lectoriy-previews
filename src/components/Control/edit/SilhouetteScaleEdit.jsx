import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAdditionalScale } from '../../../store/actions'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const SilhouetteScaleEdit = () => {
  const scale = useSelector(state => state.additional_scale)
  const dispatch = useDispatch()

  function onChange(_, value) {
    dispatch(setAdditionalScale(value))
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="caption">Размер</Typography>
      </Grid>
      <Grid item xs={12}>
        <Slider value={scale} onChange={onChange} min={1} step={0.01} max={2} />
      </Grid>
    </Grid>
  )
}

export default React.memo(SilhouetteScaleEdit)
