import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSeminar } from '../../../store/actions'
import Checkbox from '@material-ui/core/Checkbox'
import { FormControlLabel } from '@material-ui/core'

import styles from '../Control.css'

const SeminarEdit = () => {
  const seminar = useSelector(state => state.seminar)
  const dispatch = useDispatch()

  function onChange(e) {
    dispatch(setSeminar(e.target.checked))
  }

  return (
    <FormControlLabel
      label="Семинар"
      checked={seminar}
      onChange={onChange}
      control={<Checkbox color="primary" className={styles.yearRadio} />}
    />
  )
}

export default SeminarEdit
