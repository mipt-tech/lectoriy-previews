import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTopic } from '../../../store/actions'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import InputAdornment from '@material-ui/core/InputAdornment'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

import styles from '../Control.css'

const TopicEdit = () => {
  const topic = useSelector(state => state.topic_text)
  const dispatch = useDispatch()

  function onChange(e) {
    dispatch(setTopic(e.target.value))
  }

  return (
    <TextField
      multiline
      label="Тема занятия"
      fullWidth
      value={topic}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="Не оставляйте на конце строк пробелы, точки и запятые и не делайте переносов. Текст не должен залезать на фотку лектора. Подробнее в брендбуке">
              <InfoOutlinedIcon
                className={styles.infoIcon}
                style={{ marginTop: '6px', fontSize: '1.5rem' }}
              />
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default React.memo(TopicEdit)
