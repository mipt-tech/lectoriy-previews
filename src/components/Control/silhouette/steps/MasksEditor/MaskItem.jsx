import React from 'react'
import {
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox,
  IconButton,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
// import EditIcon from '@material-ui/icons/EditOutlined'

import styles from './MaskItem.css'

const MaskItem = ({ onMouseEnter, onMouseLeave, number, inverse, onInverse, onDelete }) => (
  <div className={styles.mask} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <FormControl component="fieldset">
      <FormLabel component="legend">Контур #{number}</FormLabel>
      <FormGroup row className={styles.maskRow}>
        <FormControlLabel
          control={<Checkbox checked={inverse} onChange={onInverse} />}
          label="Инвертировать"
        />
        {/* <IconButton size="small">
          <EditIcon />
        </IconButton> */}
        <IconButton
          size="small"
          onClick={() => {
            if (confirm('Точно удалить этот контур?')) {
              onDelete()
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
      </FormGroup>
    </FormControl>
  </div>
)

export default React.memo(MaskItem)
