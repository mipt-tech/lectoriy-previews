import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
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
