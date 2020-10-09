export function polylineToSvgPath(polyline) {
  return polyline.map((point, i) => `${i == 0 ? 'M' : 'L'} ${point[0]} ${point[1]} `).join('')
}

export function closePath(path) {
  return path + 'Z'
}

const bigRectangle = 'M-10,-10 V100500 H100500 V0 Z '

export function maskToSvgPath(mask) {
  let path = closePath(polylineToSvgPath(mask.polyline))
  if (!mask.inverse) {
    path = bigRectangle + path
  }
  return path
}

// oriented counterclockwize
export function orientedArea(polygon) {
  const n = polygon.length
  let area = 0
  for (let i = 0; i < n; i++) {
    const p1 = polygon[i]
    const p2 = polygon[(i + 1) % n]
    area += (p2[0] - p1[0]) * (p1[1] + p2[1])
  }
  return area / 2
}

export function invert(mask) {
  mask.polyline = mask.polyline.reverse()
  mask.inverse = !mask.inverse
}
