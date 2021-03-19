import last from 'just-last'
import { getTextRects } from './textDim'
import settings from '../../../util/settings'
import { inscribe, complete, transformRect } from '../../../util/rect'
import { transform, compose } from '../../../util/transform'

const fontFace = settings.fontFace
const thumbnailWidth = settings.outputWidth
const thumbnailHeight = settings.outputHeight
const vSpacing = 50 // vertical spacing
const hSpacing = 60 // horizontal spacing

function getSubjectRects(subject, size) {
  const rects = getTextRects(subject, fontFace, size, 'left')
  return rects.map(rect => transformRect(rect, { translation: { x: hSpacing, y: vSpacing } }))
}

function getNumberRect(number) {
  const [{ width, height }] = getTextRects(number, fontFace, settings.numberSize)
  return complete({ width, height, right: thumbnailWidth - hSpacing, top: vSpacing })
}

function getTopicRects(topic, size) {
  const rects = getTextRects(topic, fontFace, size, 'right', 1.2)
  return rects.map(rect => transformRect(rect, { translation: { x: thumbnailWidth - hSpacing } }))
}

function oneAboveAnother(rect1, rect2) {
  return rect1.left <= rect2.right && rect2.left <= rect1.right
}

function getTopicCoords(topRects, topicRects) {
  const leftest = topicRects.reduce((acc, cur) => Math.min(acc, cur.left), Infinity)
  const fontSize = topicRects[0].height
  const adjustment = -fontSize * 0.2
  if (topRects.length > 0) {
    let d1 = 0
    topRects.forEach(topRect => {
      topicRects.forEach(topicRect => {
        if (oneAboveAnother(topRect, topicRect)) {
          d1 = Math.min(d1, topicRect.top - topRect.bottom)
        }
      })
    })
    const d2 = settings.logoMarginTop - last(topicRects).bottom
    return {
      x: leftest,
      y: (d1 + d2) / 2 - d1 + adjustment,
    }
  }
  return {
    x: leftest,
    y: vSpacing,
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

function getSilhouetteTransform(topBound, image, userScale, userHorizontalPosition) {
  const imageRect = { left: 0, top: 0, width: image.width, height: image.height }
  const boundingRect = {
    left: 0,
    top: topBound + vSpacing,
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
  topic,
  topicSize,
  silhouette,
  masks,
  transformation,
  additionalScale,
  additionalX
) {
  const subjectRects = getSubjectRects(subject, subjectSize)
  const subjectFirstLineRect = subjectRects[0]
  const subjectLastLineRect = last(subjectRects)
  const numberRect = getNumberRect(number)
  const topRects = []
  if (subject != '') {
    topRects.push(...subjectRects)
  }
  if (number != '') {
    topRects.push(numberRect)
  }
  const topicRects = getTopicRects(topic, topicSize)

  const lecturerY = thumbnailHeight - vSpacing - settings.seasonSize
  const seasonY = lecturerY - settings.seasonSize * settings.lineHeight

  const layout = {
    subjectCoords: { x: subjectFirstLineRect.left, y: subjectFirstLineRect.top },
    numberCoords: { x: numberRect.left, y: numberRect.top },
    topicCoords: getTopicCoords(topRects, topicRects),
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
      subjectLastLineRect.bottom,
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
