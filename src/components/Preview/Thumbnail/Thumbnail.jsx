import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadPersistedState } from '../../../store/actions'
import { Stage, Layer, Rect, Image } from 'react-konva'
import { ReImg } from 'reimg'
import { loadImage } from '../../../util/img'
import { calculateLayout } from './layout'
import settings from '../../../util/settings'
import asideTransitionDark from '../../../../assets/shadow.png'
import asideTransitionBright from '../../../../assets/bright.png'
import { downloadStateJSON } from '../../../util/exportState'
import { importStateFromFile } from '../../../util/importState'
import { THUMB_ACTION } from '../../../constants'
import eventBus from '../../../util/eventBus'

import Subject from './Subject'
import Number from './Number'
import Topic from './Topic'
import Season from './Season'
import Lecturer from './Lecturer'
import Silhouette from './Silhouette'
import Seminar from './Seminar'

const width = settings.outputWidth
const height = settings.outputHeight

const Thumbnail = ({
  scale = 1,
  className,
  downloadWhenMounted,
  onDownloadReady,
  actionOnMount,
}) => {
  const number = useSelector(state => (state.number == '' ? '' : '#') + state.number)
  const subject = useSelector(state => state.subject_text)
  const subjectSize = useSelector(state => state.subject_size)
  const seminar = useSelector(state => state.seminar)
  const seminarText = useSelector(state => state.seminar_text)
  const year = useSelector(state => state.year)
  const silhouette = useSelector(state => state.silhouette)
  const masks = useSelector(state => state.masks)
  const additionalScale = useSelector(state => state.additional_scale)
  const transformation = useSelector(state => state.transformation)
  const topic = useSelector(state => state.topic_text)
  const topicSize = useSelector(state => state.topic_size)
  const lecturer = useSelector(state => state.lecturer)
  const season = useSelector(state => state.season)
  const additionalX = useSelector(state => state.additional_x)

  const fullState = useSelector(state => state)
  const dispatch = useDispatch()

  const [asideTransition, setAsideTransition] = useState(null)
  const thumbnailReady = asideTransition != null

  useEffect(() => {
    const asideTransitionSrc = year < 4 ? asideTransitionDark : asideTransitionBright
    loadImage(asideTransitionSrc).then(setAsideTransition)
  }, [year])

  const canvasRef = useRef()
  const ranRef = useRef(false) // одноразовый предохранитель

  useEffect(() => {
    if (!(downloadWhenMounted || actionOnMount) || !thumbnailReady) return
    if (ranRef.current) return
    ranRef.current = true
    const fileName = `${subject.replace(/\n/g, ' ')} ${number}`
    const stage = canvasRef.current

    if (actionOnMount === THUMB_ACTION.EXPORT_IMAGE) {
      ReImg.fromCanvas(stage).downloadPng(fileName + '.png')
      onDownloadReady?.()
      return
    }

    if (actionOnMount === THUMB_ACTION.EXPORT_STATE) {
      try {
        downloadStateJSON(fullState, fileName + '.json')
      } finally {
        onDownloadReady?.()
      }
      return
    }

    if (actionOnMount === THUMB_ACTION.IMPORT_STATE) {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'application/json,.json'
      input.style.display = 'none'

      let finished = false
      const finalize = () => {
        if (finished) return
        finished = true
        onDownloadReady?.()
        // убрать временный input и слушатель
        setTimeout(() => input.remove(), 0)
        window.removeEventListener('focus', onWindowFocus, true)
      }

      const onWindowFocus = () => {
        // Возвращаемся из диалога выбора файла.
        // Если change НЕ пришёл — пользователь отменил; отпускаем кнопку.
        setTimeout(() => {
          if (!finished) finalize()
        }, 0)
      }

      input.onchange = async e => {
        try {
          const file = e.target.files?.[0]
          if (file) {
            const imported = await importStateFromFile(file)
            dispatch(loadPersistedState(imported))
          }
        } catch (err) {
          if (err.name === 'QuotaExceededError') {
            eventBus.dispatch('show-notification', {
              message: 'Фото слишком большое и не будет сохранено для следующей сессии',
              severity: 'warning',
            })
          } else {
            alert(`Импорт не удался: ${err?.message || err}`)
          }
        } finally {
          finalize() // всегда разблокируем
        }
      }

      document.body.appendChild(input)
      window.addEventListener('focus', onWindowFocus, true) // ловим «Отмена»
      input.click() // открываем диалог

      return
    }
  }, [thumbnailReady, downloadWhenMounted, actionOnMount])

  const {
    subjectCoords,
    numberCoords,
    seminarCoords,
    seminarWidth,
    topicCoords,
    seasonCoords,
    lecturerCoords,
    silhouetteTransformation,
  } = calculateLayout(
    subject,
    subjectSize,
    number,
    seminar,
    seminarText,
    topic,
    topicSize,
    silhouette,
    masks,
    transformation,
    additionalScale,
    additionalX
  )

  return (
    <Stage
      width={Math.round(width * scale)}
      height={Math.round(height * scale)}
      scaleX={scale}
      scaleY={scale}
      className={className}
      ref={canvasRef}
    >
      <Layer>
        {silhouette && <Silhouette image={silhouette} year={year} {...silhouetteTransformation} />}
        <Rect
          fill={settings.backgroundColor[year]}
          width={width}
          height={height}
          globalCompositeOperation="destination-over"
        />
        {asideTransition && <Image image={asideTransition} />}
        <Subject text={subject} year={year} size={subjectSize} {...subjectCoords} />
        <Number text={number} year={year} {...numberCoords} />
        <Topic text={topic} year={year} size={topicSize} {...topicCoords} />
        <Season text={season} year={year} {...seasonCoords} />
        <Lecturer text={lecturer} year={year} {...lecturerCoords} />
        {seminar && (
          <Seminar year={year} text={seminarText} width={seminarWidth} {...seminarCoords} />
        )}
      </Layer>
    </Stage>
  )
}

export default Thumbnail
