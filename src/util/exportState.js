import { stateKeys } from '../store/reducers'

/**
 * Собирает состояние в объект для экспорта.
 * Опционально можно включить режим совместимости с localStorage
 * (где masks/transformation/filters строкой, seminar как 0/1).
 */
export function buildExportState(state, { compatLocalStorage = false } = {}) {
  const out = {}
  for (const key of stateKeys) {
    const val = state[key]

    switch (key) {
      case 'photo':
      case 'silhouette':
        // В store это Image (HTMLImageElement); берём только src
        out[key] = val?.src ?? null
        break

      case 'masks':
      case 'transformation':
      case 'filters':
        out[key] = compatLocalStorage ? JSON.stringify(val ?? {}) : val ?? {}
        break

      case 'seminar':
        out[key] = compatLocalStorage ? (val ? 1 : 0) : !!val
        break

      default:
        out[key] = val
    }
  }
  return out
}

export function makeStateJSON(state, options) {
  const payload = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    settings: buildExportState(state, options),
  }
  return JSON.stringify(payload, null, 2)
}

export function downloadStateJSON(state, filename = 'cover-state.json', options) {
  const json = makeStateJSON(state, options)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
