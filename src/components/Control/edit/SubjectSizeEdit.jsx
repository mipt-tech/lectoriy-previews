import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSubjectSize } from '../../../store/actions'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import settings from '../../../util/settings'
import Tooltip from '@material-ui/core/Tooltip'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

import styles from '../Control.css'

const SubjectSizeEdit = () => {
  const subject_size = useSelector(state => state.subject_size)
  const dispatch = useDispatch()

  function onChange(_, value) {
    dispatch(setSubjectSize(value))
  }

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4} className={styles.cellWithSlider}>
        <Slider
          value={subject_size}
          onChange={onChange}
          min={Math.min(...settings.subjectSizes)}
          max={Math.max(...settings.subjectSizes)}
          step={null}
          marks={settings.subjectSizes.map(value => ({ value }))}
          valueLabelDisplay="auto"
          className={styles.compactSlider}
        />
      </Grid>
      <Grid item xs={8} className={styles.cellWithSliderCaption}>
        <Grid container spacing={1}>
          <Grid item>
            <Typography variant="caption" color="textSecondary" className={styles.sliderCaption}>
              Размер
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip title="При подборе размера названия курса держите дистанцию от #номера. Меньше пробела уже нельзя. Помните, что #номер может быть двузначным">
              <InfoOutlinedIcon className={styles.infoIcon} />
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default React.memo(SubjectSizeEdit)
