export function transform(point, { translation: { x, y }, scale }) {
  return [point[0] * scale + x, point[1] * scale + y]
}

export function compose(transform1, transform2) {
  return {
    scale: transform1.scale * transform2.scale,
    translation: {
      x: transform1.translation.x * transform2.scale + transform2.translation.x,
      y: transform1.translation.y * transform2.scale + transform2.translation.y,
    },
  }
}

export function toKonvaTransform({ translation: { x, y }, scale }) {
  return { x, y, scaleX: scale, scaleY: scale }
}
