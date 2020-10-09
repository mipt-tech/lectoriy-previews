import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNumber } from '../../../store/actions'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const NumberEdit = () => {
  const number = useSelector(state => state.number)
  const dispatch = useDispatch()

  function onChange(e) {
    dispatch(setNumber(e.target.value))
  }

  return (
    <TextField
      type="number"
      label="Лекция"
      fullWidth
      InputProps={{ startAdornment: <InputAdornment position="start">#</InputAdornment> }}
      value={number}
      onChange={onChange}
    />
  )
}

export default React.memo(NumberEdit)
