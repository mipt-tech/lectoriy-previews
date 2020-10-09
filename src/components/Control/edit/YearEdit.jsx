import React from 'react'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import { useSelector, useDispatch } from 'react-redux'

import { setYear } from '../../../store/actions'

const years = [1, 2, 3, 4 /*, 'Внеучебный курс'*/]

const YearEdit = () => {
  const year = useSelector(state => state.year)
  const dispatch = useDispatch()

  function onChange(e) {
    dispatch(setYear(parseInt(e.target.value)))
  }

  return (
    <RadioGroup value={year} onChange={onChange} row={true}>
      {years.map((y, i) => (
        <FormControlLabel value={i} control={<Radio />} label={y} key={i} />
      ))}
    </RadioGroup>
  )
}

export default React.memo(YearEdit)
