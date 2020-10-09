// SizedRect: { left, top, width, height }
// BoundingRect: { left, top, right, bottom }
// MixedRect: { left, top, right, bottom, width, height }, where right = left + width, bottom = top + height

function isSized(rect) {
  return rect.width !== undefined && rect.height !== undefined
}

function toSized(rect) {
  if (isSized(rect)) {
    return rect
  }
  const { left, right, top, bottom } = rect
  return { left, top, width: right - left, height: bottom - top }
}

function isBounding(rect) {
  return rect.right !== undefined && rect.bottom !== undefined
}

export function toBounding(rect) {
  if (isBounding(rect)) {
    return rect
  }
  const { left, top, width, height } = rect
  return { left, top, right: left + width, bottom: top + height }
}

function toMixedRect(rect) {
  return { ...toSized(rect), ...toBounding(rect) }
}

export function getRect(img, masks) {
  // Не совсем корректно: маски могут быть инвертированы
  const points = masks.map(mask => mask.polyline).flat()
  const xs = points.map(point => point[0])
  const ys = points.map(point => point[1])
  return toMixedRect({
    left: Math.max(Math.min(...xs), 0),
    right: Math.min(Math.max(...xs), img.width),
    top: Math.max(Math.min(...ys), 0),
    bottom: Math.min(Math.max(...ys), img.height),
  })
}

export function transformRect(rect, { translation: { x, y }, scale }) {
  const sizedRect = toSized(rect)
  const newSizedRect = {
    width: sizedRect.width * scale,
    height: sizedRect.height * scale,
    left: sizedRect.left * scale + x,
    top: sizedRect.top * scale + y,
  }
  return toMixedRect(newSizedRect)
}

export function inscribe(innerRect, outerRect) {
  const { width: outerWidth, height: outerHeight } = toSized(outerRect)
  const { width: innerWidth, height: innerHeight } = toSized(innerRect)
  const scale = Math.min(outerWidth / innerWidth, outerHeight / innerHeight)
  const x = outerRect.left - innerRect.left * scale
  const y = outerRect.top - innerRect.top * scale
  const transformation = { translation: { x, y }, scale }
  return { transformation, inscribedRect: transformRect(innerRect, transformation) }
}
