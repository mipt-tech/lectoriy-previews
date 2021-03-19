import { complete } from '../../../util/rect'

const helperCanvas = document.createElement('canvas')

export function getTextRects(text, fontFace, size, align, lineHeight = 1) {
  const ctx = helperCanvas.getContext('2d')
  ctx.font = size + 'px ' + fontFace
  const rects = text.split('\n').map((line, index) => ({
    width: ctx.measureText(line).width,
    height: size * 0.8,
    top: index * size * lineHeight,
  }))
  rects.forEach(rect => {
    if (align === 'right') {
      rect.right = 0
    } else {
      rect.left = 0
    }
  })
  return rects.map(complete)
}
