import React from 'react'
import Typography from '@material-ui/core/Typography'

import styles from './Help.css'

const Help = () => {
  return (
    <div className={styles.help}>
      <div className={styles.question}>
        <Typography variant="caption" color="primary">
          &laquo; Хоткеи
        </Typography>
      </div>
      <div className={styles.helpText}>
        <Typography variant="caption">
          <b>Стрелки, W, A, S, D, -, +</b> &mdash; чтобы перемещаться.
          <br />
          Во время рисования:
          <br />
          <b>I</b> &mdash; сменить цвет контура.
          <br />
          <b>Z</b> &mdash; отменить последний узел.
          <br />
          <b>C</b> &mdash; замкнуть контур.
        </Typography>
      </div>
    </div>
  )
}

export default React.memo(Help)
