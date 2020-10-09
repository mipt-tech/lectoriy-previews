import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLecturer } from '../../../store/actions'
import TextField from '@material-ui/core/TextField'

const LecturerEdit = () => {
  const lecturer = useSelector(state => state.lecturer)
  const dispatch = useDispatch()

  function onChange(e) {
    dispatch(setLecturer(e.target.value))
  }

  return <TextField label="Имя лектора" fullWidth value={lecturer} onChange={onChange} />
}

export default React.memo(LecturerEdit)
