import React, { useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined'
import Gluejar_ from 'react-gluejar'
import { useDropzone } from 'react-dropzone'
import classNames from 'classnames'

import styles from './FilePicker.css'

const Gluejar = React.memo(Gluejar_)
const empty = () => null

function isBlobUrl(str) {
  return typeof str === 'string' && str.startsWith('blob:')
}

async function blobUrlToBlob(blobUrl) {
  return await fetch(blobUrl).then(r => r.blob())
}

const FilePicker = ({ disabled, onFileSelect }) => {
  async function handleFile(fileOrBlobUrl) {
    if (!fileOrBlobUrl) return
    const file = isBlobUrl(fileOrBlobUrl) ? await blobUrlToBlob(fileOrBlobUrl) : fileOrBlobUrl
    onFileSelect(file)
  }

  const handleFirstFile = useCallback(files => handleFile(files[0]), [])

  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    onDrop: handleFirstFile,
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
      <Gluejar onPaste={handleFirstFile}>{empty}</Gluejar>
    </ButtonBase>
  )
}

export default FilePicker
