import { loadImage } from '../util/img'
import { stateKeys } from './reducers'

export const saveToLocalStorage = store => (next, initialState) => action => {
  console.log(initialState)
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
          valueToSave = curValue.src
          break
        case 'masks':
        case 'transformation':
        case 'filters':
          valueToSave = JSON.stringify(curValue)
          break
        default:
          valueToSave = curValue
      }
      localStorage[key] = valueToSave
    }
  }
}

export const loadFromLocalStorage = async () => {
  const persistedState = {}
  for (let i = 0; i < stateKeys.length; i++) {
    const key = stateKeys[i]
    const persistedValue = localStorage[key]
    if (persistedValue == null) continue
    switch (key) {
      case 'year':
      case 'subject_size':
      case 'topic_size':
      case 'number':
        persistedState[key] = parseInt(persistedValue)
        break
      case 'additional_scale':
      case 'additional_x':
        persistedState[key] = parseFloat(persistedValue)
        break
      case 'photo':
      case 'silhouette':
        persistedState[key] = await loadImage(persistedValue)
        break
      case 'masks':
      case 'transformation':
      case 'filters':
        persistedState[key] = JSON.parse(persistedValue)
        break
      default:
        persistedState[key] = persistedValue
    }
  }
  return persistedState
}
