import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Slider, Grid, Typography, CircularProgress } from '@material-ui/core'
import SilhouetteFactory from './SilhouetteFactory'
import ChaplinFactory from './ChaplinFactory'
import Demo from './Demo'
import {
  setSilhouette,
  setPosterization as setGlobalPosterization,
  setBrightness as setGlobalBrightness,
  setContrast as setGlobalContrast,
  setTransformation,
} from '../../../../../store/actions'

import styles from './Filter.css'

const Filter = ({ onReadyStateChange }) => {
  const [chaplin, setChaplin] = useState(null)
  const photo = useSelector(state => state.photo)
  const masks = useSelector(state => state.masks)

  const dispatch = useDispatch()

  const save = useCallback(img => {
    dispatch(setSilhouette(img))
    onReadyStateChange(true)
  })

  const global = useSelector(state => state.filters)

  const [posterization, setPosterization] = useState(global.posterization)
  const [brightness, setBrightness] = useState(global.brightness)
  const [contrast, setContrast] = useState(global.contrast)

  const onSliderChange = action => (_, value) => {
    action(value)
  }

  const onSliderCommit = (action, prevValue) => (_, newValue) => {
    if (prevValue != newValue) {
      onReadyStateChange(false)
      dispatch(action(newValue))
    }
  }

  function onChaplinDone(chaplin, transformation) {
    setChaplin(chaplin)
    dispatch(setTransformation(transformation))
  }

  if (!chaplin) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loading}>
          <CircularProgress />
        </div>
        <ChaplinFactory photo={photo} masks={masks} onDone={onChaplinDone} />
      </div>
    )
  } else {
    return (
      <div className={styles.wrapper}>
        <Grid container className={styles.filters}>
          <Grid item xs={4}>
            <Typography>Детализация</Typography>
          </Grid>
          <Grid item xs={8}>
            <Slider
              value={posterization}
              onChange={onSliderChange(setPosterization)}
              onChangeCommitted={onSliderCommit(setGlobalPosterization, global.posterization)}
              min={0}
              step={0.004}
              max={0.05}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography>Яркость</Typography>
          </Grid>
          <Grid item xs={8}>
            <Slider
              value={brightness}
              onChange={onSliderChange(setBrightness)}
              onChangeCommitted={onSliderCommit(setGlobalBrightness, global.brightness)}
              min={-0.5}
              step={0.01}
              max={0.5}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography>Контраст</Typography>
          </Grid>
          <Grid item xs={8}>
            <Slider
              value={contrast}
              onChange={onSliderChange(setContrast)}
              onChangeCommitted={onSliderCommit(setGlobalContrast, global.contrast)}
              min={-50}
              max={50}
            />
          </Grid>
        </Grid>
        <Demo
          chaplin={chaplin}
          posterization={posterization}
          brightness={brightness}
          contrast={contrast}
        />
        <SilhouetteFactory
          chaplin={chaplin}
          posterization={global.posterization}
          brightness={global.brightness}
          contrast={global.contrast}
          onDone={save}
        />
      </div>
    )
  }
}

export default React.memo(Filter)
