import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTopic } from '../../../store/actions'
import TextField from '@material-ui/core/TextField'

const TopicEdit = () => {
  const topic = useSelector(state => state.topic_text)
  const dispatch = useDispatch()

  function onChange(e) {
    dispatch(setTopic(e.target.value))
  }

  return <TextField multiline label="Тема занятия" fullWidth value={topic} onChange={onChange} />
}

export default React.memo(TopicEdit)
