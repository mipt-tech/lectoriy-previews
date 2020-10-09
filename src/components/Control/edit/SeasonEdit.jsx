import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSeason } from '../../../store/actions'
import TextField from '@material-ui/core/TextField'

const LecturerEdit = () => {
  const season = useSelector(state => state.season)
  const dispatch = useDispatch()

  function onChange(e) {
    dispatch(setSeason(e.target.value))
  }

  return <TextField label="Сезон" fullWidth value={season} onChange={onChange} />
}

export default React.memo(LecturerEdit)
