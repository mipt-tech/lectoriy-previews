import React from 'react'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import { useSelector, useDispatch } from 'react-redux'
import { setYear } from '../../../store/actions'

import styles from '../Control.css'

const years = [1, 2, 3, 4, 'Внеучебный курс']

const YearEdit = () => {
  const year = useSelector(state => state.year)
  const dispatch = useDispatch()

  function onChange(e) {
    dispatch(setYear(parseInt(e.target.value)))
  }

  return (
    <FormControl>
      <FormHelperText className={styles.yearCaption}>Год обучения</FormHelperText>
      <RadioGroup value={year} onChange={onChange} row={true} placeholder="test">
        {years.map((y, i) => (
          <FormControlLabel
            className={i == 4 ? styles.yearExtra : null}
            value={i}
            control={<Radio className={styles.yearRadio} color="primary" />}
            label={y}
            key={i}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default React.memo(YearEdit)
