import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { saveToLocalStorage, loadFromLocalStorage } from './syncWithLocalStorage'

const store = createStore(reducer, applyMiddleware(saveToLocalStorage))

;(async () => {
  const persistedState = await loadFromLocalStorage()
  for (const key in persistedState) {
    store.dispatch({ type: 'SET_KEY_VALUE', key, value: persistedState[key] })
  }
})()

export default store
