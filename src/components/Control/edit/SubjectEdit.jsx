import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSubject } from '../../../store/actions'
import TextField from '@material-ui/core/TextField'

const SubjectEdit = () => {
  const subject = useSelector(state => state.subject_text)
  const dispatch = useDispatch()

  function onChange(e) {
    dispatch(setSubject(e.target.value))
  }

  return (
    <TextField multiline label="Название курса" fullWidth value={subject} onChange={onChange} />
  )
}

export default React.memo(SubjectEdit)
