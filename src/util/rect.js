// SizedRect: { left, top, width, height }
// BoundingRect: { left, top, right, bottom }
// CompleteRect: { left, top, right, bottom, width, height }, where right = left + width, bottom = top + height

export function complete(initial) {
  const rect = { ...initial }
  if (rect.left == null) {
    rect.left = rect.right - rect.width
  }
  if (rect.width == null) {
    rect.width = rect.right - rect.left
  }
  if (rect.right == null) {
    rect.right = rect.left + rect.width
  }
  if (rect.top == null) {
    rect.top = rect.bottom - rect.height
  }
  if (rect.height == null) {
    rect.height = rect.bottom - rect.top
  }
  if (rect.bottom == null) {
    rect.bottom = rect.top + rect.height
  }
  return rect
}

export function getRect(img, masks) {
  // Не совсем корректно: маски могут быть инвертированы
  const points = masks.map(mask => mask.polyline).flat()
  const xs = points.map(point => point[0])
  const ys = points.map(point => point[1])
  return complete({
    left: Math.max(Math.min(...xs), 0),
    right: Math.min(Math.max(...xs), img.width),
    top: Math.max(Math.min(...ys), 0),
    bottom: Math.min(Math.max(...ys), img.height),
  })
}

export function transformRect(rect, { translation: { x = 0, y = 0 }, scale = 1 }) {
  const sizedRect = complete(rect)
  const newSizedRect = {
    width: sizedRect.width * scale,
    height: sizedRect.height * scale,
    left: sizedRect.left * scale + x,
    top: sizedRect.top * scale + y,
  }
  return complete(newSizedRect)
}

export function inscribe(innerRect, outerRect) {
  const { width: outerWidth, height: outerHeight } = complete(outerRect)
  const { width: innerWidth, height: innerHeight } = complete(innerRect)
  const scale = Math.min(outerWidth / innerWidth, outerHeight / innerHeight)
  const x = outerRect.left - innerRect.left * scale
  const y = outerRect.top - innerRect.top * scale
  const transformation = { translation: { x, y }, scale }
  return { transformation, inscribedRect: transformRect(innerRect, transformation) }
}
