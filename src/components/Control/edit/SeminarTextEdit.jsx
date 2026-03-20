import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSeminarText } from '../../../store/actions'
import TextField from '@material-ui/core/TextField'

const SeminarTextEdit = () => {
  const seminarText = useSelector(state => state.seminar_text)
  const dispatch = useDispatch()

  function onChange(e) {
    dispatch(setSeminarText(e.target.value))
  }

  return <TextField label="Текст плашки" fullWidth value={seminarText} onChange={onChange} />
}

export default React.memo(SeminarTextEdit)
