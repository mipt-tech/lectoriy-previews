import { IMG_ERROR } from './exceptions'

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(IMG_ERROR)
    img.src = src
  })
}
