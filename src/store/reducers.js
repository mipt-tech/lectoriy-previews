const defaultState = {
  year: 1,
  subject_text: 'Кратные интегралы',
  subject_size: 120,
  number: 1,
  seminar: false,
  topic_text: 'Дивергенция\nРотор',
  topic_size: 90,
  lecturer: 'Иванов Г. Е.',
  season: 'Осень 2020',
  photo: null,
  masks: null,
  filters: {
    posterization: 0.05,
    brightness: 0,
    contrast: 0,
  },
  transformation: { translation: { x: 0, y: 0 }, scale: 1 },
  silhouette: null,
  additional_scale: 1.1,
  additional_x: 0,
}

export const stateKeys = Object.keys(defaultState)

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_KEY_VALUE':
      return {
        ...state,
        [action.key]: action.value,
      }
    case 'CLEAR_PHOTO':
      return {
        ...state,
        photo: null,
        masks: null,
        silhouette: null,
      }
    case 'SET_MASKS':
      return {
        ...state,
        masks: action.masks,
        silhouette: null,
      }
    case 'SET_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.filter]: action.value,
        },
      }
    default:
      return state
  }
}
