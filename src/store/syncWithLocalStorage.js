import { loadImage } from '../util/img'
import { stateKeys } from './reducers'

const PREFIX = 'previews__'

export const saveToLocalStorage = store => next => action => {
  const prevState = store.getState()
  next(action)
  const curState = store.getState()
  for (const key in curState) {
    const prevValue = prevState[key]
    const curValue = curState[key]
    if (prevValue != curValue) {
      let valueToSave
      switch (key) {
        case 'photo':
        case 'silhouette':
          valueToSave = curValue?.src
          break
        case 'masks':
        case 'transformation':
        case 'filters':
          valueToSave = JSON.stringify(curValue)
          break
        case 'seminar':
          valueToSave = ~~curValue // boolean -> int
          break
        default:
          valueToSave = curValue
      }
      localStorage[`${PREFIX}${key}`] = valueToSave
    }
  }
}

export const loadFromLocalStorage = async () => {
  const persistedState = {}
  for (let i = 0; i < stateKeys.length; i++) {
    const key = stateKeys[i]
    const persistedValue = localStorage[`${PREFIX}${key}`]
    if (persistedValue == null) continue
    switch (key) {
      case 'year':
      case 'subject_size':
      case 'topic_size':
        persistedState[key] = parseInt(persistedValue)
        break
      case 'number':
        persistedState[key] = persistedValue == '' ? '' : parseInt(persistedValue)
        break
      case 'additional_scale':
      case 'additional_x':
        persistedState[key] = parseFloat(persistedValue)
        break
      case 'photo':
      case 'silhouette':
        if (persistedValue != 'undefined' && persistedValue != 'null') {
          try {
            persistedState[key] = await loadImage(persistedValue)
          } catch (e) {
            persistedState[key] = null
          }
        }
        break
      case 'masks':
      case 'transformation':
      case 'filters':
        persistedState[key] = JSON.parse(persistedValue)
        break
      case 'seminar':
        persistedState[key] = !!parseInt(persistedValue) // string -> int -> boolean
        break
      default:
        persistedState[key] = persistedValue
    }
  }
  return persistedState
}
