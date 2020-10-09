import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTopicSize } from '../../../store/actions'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import settings from '../../../util/settings'

const TopicSizeEdit = () => {
  const topic_size = useSelector(state => state.topic_size)
  const dispatch = useDispatch()

  function onChange(_, value) {
    dispatch(setTopicSize(value))
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Slider
          value={topic_size}
          onChange={onChange}
          min={Math.min(...settings.topicSizes)}
          max={Math.max(...settings.topicSizes)}
          step={null}
          marks={settings.topicSizes.map(value => ({ value }))}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item xs={8}>
        <Typography variant="caption">Кегль темы занятия</Typography>
      </Grid>
    </Grid>
  )
}

export default React.memo(TopicSizeEdit)
