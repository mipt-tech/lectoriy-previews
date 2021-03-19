import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Stage, Layer, Rect, Image } from 'react-konva'
import { ReImg } from 'reimg'
import { loadImage } from '../../../util/img'
import { calculateLayout } from './layout'
import settings from '../../../util/settings'
import asideTransitionDark from '../../../../assets/shadow.png'
import asideTransitionBright from '../../../../assets/bright.png'

import Subject from './Subject'
import Number from './Number'
import Topic from './Topic'
import Season from './Season'
import Lecturer from './Lecturer'
import Silhouette from './Silhouette'
import Seminar from './Seminar'

const width = settings.outputWidth
const height = settings.outputHeight

const Thumbnail = ({ scale = 1, className, downloadWhenMounted, onDownloadReady }) => {
  const number = useSelector(state => (state.number == '' ? '' : '#') + state.number)
  const subject = useSelector(state => state.subject_text)
  const subjectSize = useSelector(state => state.subject_size)
  const seminar = useSelector(state => state.seminar)
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

  const [asideTransition, setAsideTransition] = useState(null)
  const thumbnailReady = asideTransition != null

  useEffect(() => {
    const asideTransitionSrc = year < 4 ? asideTransitionDark : asideTransitionBright
    loadImage(asideTransitionSrc).then(setAsideTransition)
  }, [year])

  const canvasRef = useRef()
  useEffect(() => {
    if (downloadWhenMounted && thumbnailReady) {
      const fileName = `${subject.replace(/\n/g, ' ')} ${number}.png`
      ReImg.fromCanvas(canvasRef.current).downloadPng(fileName)
      onDownloadReady?.()
    }
  }, [thumbnailReady])

  const {
    subjectCoords,
    numberCoords,
    seminarCoords,
    topicCoords,
    seasonCoords,
    lecturerCoords,
    silhouetteTransformation,
  } = calculateLayout(
    subject,
    subjectSize,
    number,
    seminar,
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
      width={width * scale}
      height={height * scale}
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
        {seminar && <Seminar year={year} {...seminarCoords} />}
      </Layer>
    </Stage>
  )
}

export default Thumbnail
