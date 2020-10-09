const helperCanvas = document.createElement('canvas')
helperCanvas.style.display = 'none'

export function getTextDim(text, fontFace, size, lineHeight = 1) {
  const ctx = helperCanvas.getContext('2d')
  ctx.font = size + 'px ' + fontFace
  const { width } = ctx.measureText(text)
  return { width, height: size * lineHeight * text.split('\n').length }
}
