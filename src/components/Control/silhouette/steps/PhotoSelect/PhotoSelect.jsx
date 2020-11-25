import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined'
import FilePicker from './FilePicker'
import { loadImage } from '../../../../../util/img'
import { setPhoto, clearPhoto } from '../../../../../store/actions'
import { FILE_ERROR, IMG_ERROR } from '../../../../../util/exceptions'

import styles from './PhotoSelect.css'

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = () => reject(FILE_ERROR)
    reader.readAsDataURL(file)
  })
}

const PhotoSelect = ({ confirmBeforeClear }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const photo = useSelector(state => state.photo)

  async function onFileSelect(file) {
    setError(null)
    setLoading(true)
    try {
      const src = await readFile(file)
      const newImage = await loadImage(src)
      dispatch(setPhoto(newImage))
      setLoading(false)
    } catch (e) {
      switch (e) {
        case FILE_ERROR:
          setError('Не удалось прочитать файл')
          break
        case IMG_ERROR:
          setError('Не удалось распарсить картинку. Поддерживаются только форматы jpg, png и gif')
          break
        default:
          setError(`${e}`)
      }
      setLoading(false)
    }
  }

  function onClear() {
    const text = 'Контуры вырезки и параметры фильтров тоже будут удалены. Продолжить?'
    if (!confirmBeforeClear || (confirmBeforeClear && confirm(text))) {
      dispatch(clearPhoto())
    }
  }

  return (
    <div className={styles.wrapper}>
      {photo ? (
        <>
          <img src={photo.src} className={styles.preview} />
          <div className={styles.another}>
            <Button onClick={onClear} variant="outlined" startIcon={<RefreshOutlinedIcon />}>
              Выбрать другую фотку
            </Button>
          </div>
        </>
      ) : (
        <FilePicker onFileSelect={onFileSelect} disabled={loading} />
      )}
      {loading && (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      )}
      {error && (
        <Typography color="error" className={styles.error}>
          {error}
        </Typography>
      )}
    </div>
  )
}

export default React.memo(PhotoSelect)
