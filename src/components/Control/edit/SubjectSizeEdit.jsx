import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSubjectSize } from '../../../store/actions'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import settings from '../../../util/settings'

const SubjectSizeEdit = () => {
  const subject_size = useSelector(state => state.subject_size)
  const dispatch = useDispatch()

  function onChange(_, value) {
    dispatch(setSubjectSize(value))
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Slider
          value={subject_size}
          onChange={onChange}
          min={Math.min(...settings.subjectSizes)}
          max={Math.max(...settings.subjectSizes)}
          step={null}
          marks={settings.subjectSizes.map(value => ({ value }))}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item xs={8}>
        <Typography variant="caption">Кегль названия курса</Typography>
      </Grid>
    </Grid>
  )
}

export default React.memo(SubjectSizeEdit)
