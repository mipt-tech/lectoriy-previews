import { getTextDim } from './textDim'
import settings from '../../../util/settings'
import { inscribe, toBounding, transformRect } from '../../../util/rect'
import { transform, compose } from '../../../util/transform'

const fontFace = settings.fontFace
const thumbnailWidth = settings.outputWidth
const thumbnailHeight = settings.outputHeight
const vSpacing = 50 // vertical spacing
const hSpacing = 70 // horizontal spacing

function getSubjectRect(subject, size) {
  const { width, height } = getTextDim(subject, fontFace, size)
  return { width, height, left: hSpacing, top: vSpacing }
}

function getNumberRect(number) {
  const { width, height } = getTextDim(number, fontFace, settings.numberSize)
  return { width, height, left: thumbnailWidth - hSpacing - width, top: vSpacing }
}

function getTopicLayoutProps(subjectRect, numberRect) {
  const topBound = Math.max(toBounding(subjectRect).bottom, toBounding(numberRect).bottom)
  const bottomBound = settings.logoMarginTop
  const leftBound = hSpacing * 2
  const rightBound = settings.outputWidth - hSpacing

  return {
    width: rightBound - leftBound,
    x: leftBound,
    y: topBound,
    height: bottomBound - topBound,
    align: 'right',
    verticalAlign: 'middle',
  }
}

function projection(p, q, y) {
  /*       x <- returned
   *    p  |
   *     \ |
   *      \|
   * y-----\----
   *        \
   *         q
   */
  if (p[1] == q[1]) {
    return y == p[1] ? Math.max(p[0], q[0]) : undefined
  }
  const upper = p[1] < q[1] ? p : q
  const lower = p[1] < q[1] ? q : p
  if (upper[1] > y || lower[1] < y) {
    return undefined
  }
  return ((y - upper[1]) * lower[0] + (lower[1] - y) * upper[0]) / (lower[1] - upper[1])
}

function getSilhouetteRightBound(ys, img, masks, imgTransform, masksTransform) {
  let result = 0
  const imgRect = { left: 0, top: 0, width: img.width, height: img.width }
  const imgRight = transformRect(imgRect, imgTransform).right
  masksTransform = compose(masksTransform, imgTransform)
  for (let i in masks) {
    const polyline = masks[i].polyline
    let prevPoint = transform(polyline[polyline.length - 1], masksTransform)
    for (let j in polyline) {
      const curPoint = transform(polyline[j], masksTransform)
      result = Math.max(
        result,
        ...ys.map(y => Math.min(projection(curPoint, prevPoint, y) ?? -Infinity, imgRight))
      )
      prevPoint = curPoint
    }
  }
  return result
}

function getSilhouetteTransform(subjectRect, image, userScale, userHorizontalPosition) {
  const subjectBounds = toBounding(subjectRect)
  const imageRect = { left: 0, top: 0, width: image.width, height: image.height }
  const boundingRect = {
    left: 0,
    top: subjectBounds.bottom + vSpacing,
    right: thumbnailWidth,
    bottom: thumbnailHeight,
  }

  const { transformation } = inscribe(imageRect, boundingRect)
  const transformedImageRect = transformRect(imageRect, transformation)
  transformation.scale *= userScale
  const maxDeltaX = transformedImageRect.width * userScale + hSpacing
  transformation.translation.x += maxDeltaX * userHorizontalPosition + hSpacing
  return transformation
}

export function calculateLayout(
  subject,
  subjectSize,
  number,
  silhouette,
  masks,
  transformation,
  additionalScale,
  additionalX
) {
  const subjectRect = getSubjectRect(subject, subjectSize)
  const numberRect = getNumberRect(number)

  const lecturerY = thumbnailHeight - vSpacing - settings.seasonSize
  const seasonY = lecturerY - settings.seasonSize * settings.lineHeight

  const layout = {
    subjectCoords: { x: subjectRect.left, y: subjectRect.top },
    numberCoords: { x: numberRect.left, y: numberRect.top },
    topicProps: getTopicLayoutProps(subjectRect, numberRect),
    seasonCoords: {
      x: hSpacing,
      y: seasonY,
    },
    lecturerCoords: {
      x: hSpacing,
      y: lecturerY,
    },
  }
  if (silhouette) {
    const imgTransform = getSilhouetteTransform(
      subjectRect,
      silhouette,
      additionalScale,
      additionalX
    )
    layout.silhouetteTransformation = {
      x: imgTransform.translation.x,
      y: imgTransform.translation.y,
      scaleX: imgTransform.scale,
      scaleY: imgTransform.scale,
    }
    let seasonLeft = getSilhouetteRightBound(
      [seasonY, lecturerY, lecturerY + settings.seasonSize],
      silhouette,
      masks,
      imgTransform,
      transformation
    )
    layout.seasonCoords.x = layout.lecturerCoords.x = seasonLeft + hSpacing
  }
  return layout
}
