import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTopicSize } from '../../../store/actions'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import settings from '../../../util/settings'

import styles from '../Control.css'

const TopicSizeEdit = () => {
  const topic_size = useSelector(state => state.topic_size)
  const dispatch = useDispatch()

  function onChange(_, value) {
    dispatch(setTopicSize(value))
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} className={styles.cellWithSlider}>
        <Slider
          value={topic_size}
          onChange={onChange}
          min={Math.min(...settings.topicSizes)}
          max={Math.max(...settings.topicSizes)}
          step={null}
          marks={settings.topicSizes.map(value => ({ value }))}
          valueLabelDisplay="auto"
          className={styles.compactSlider}
        />
      </Grid>
      <Grid item xs={8} className={styles.cellWithSliderCaption}>
        <Typography variant="caption" color="textSecondary" className={styles.sliderCaption}>
          Размер
        </Typography>
      </Grid>
    </Grid>
  )
}

export default React.memo(TopicSizeEdit)
