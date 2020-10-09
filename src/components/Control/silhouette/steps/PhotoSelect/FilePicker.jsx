import React from 'react'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined'
import { Gluejar } from '@charliewilco/gluejar'
import { useDropzone } from 'react-dropzone'
import classNames from 'classnames'

import styles from './FilePicker.css'

const FilePicker = ({ disabled, onFileSelect }) => {
  function handleFile(file) {
    if (!file) return
    console.log(file)
    onFileSelect(file)
  }
  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    onDrop: files => handleFile(files[0]),
  })

  return (
    <ButtonBase
      {...getRootProps()}
      className={classNames(styles.dropzone, {
        [styles.dragActive]: isDragActive,
        [styles.disabled]: disabled,
      })}
      disabled={disabled}
    >
      <input {...getInputProps()} />
      <CloudUploadOutlinedIcon fontSize="large" />
      <Typography>Перетащите файл с картинкой</Typography>
      <Typography variant="caption">или</Typography>
      <Typography>Выберите файл с устройства</Typography>
      <Typography variant="caption">или</Typography>
      <Typography>Вставьте картинку из буфера обмена</Typography>
      <Gluejar onPaste={files => handleFile(files.images[0])} onError={e => console.log(e)} />
    </ButtonBase>
  )
}

export default FilePicker
