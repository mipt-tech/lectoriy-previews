import settings from './settings'

// ой какой костыль, ну просто совсем
// но иных способов отследить момент, когда шрифт гарантированно загрузился, нет

const fontSize = 300
const emWidth = 0.9 // зависит от шрифта
const epsilon = 0.001

const sampleText = document.createElement('span')
sampleText.innerText = 'M'
sampleText.style.font = `${fontSize}px '${settings.fontFace}'`
sampleText.style.color = 'transparent'
document.body.appendChild(sampleText)

const desiredWidth = emWidth * fontSize

export default async function waitUntilFontLoaded() {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      console.log(sampleText.offsetWidth)
      if (Math.abs((sampleText.offsetWidth - desiredWidth) / desiredWidth) < epsilon) {
        resolve()
        clearInterval(interval)
        document.body.removeChild(sampleText)
      }
    }, 200)
  })
}
