import { loadImage } from '../util/img'
import { stateKeys } from '../store/reducers'

// Нормализуем объект настроек в формат Redux-state (как loadFromLocalStorage)
export async function parseStateObject(obj) {
  // поддерживаем как {"schemaVersion":..., "settings": {...}}, так и просто {...}
  const settings = obj?.settings ?? obj
  if (!settings || typeof settings !== 'object') {
    throw new Error('Некорректный формат настроек')
  }

  const out = {}
  for (const key of stateKeys) {
    const v = settings[key]

    switch (key) {
      case 'year':
      case 'subject_size':
      case 'topic_size':
        out[key] = v != null ? parseInt(v) : undefined
        break

      case 'number':
        out[key] = v === '' || v == null ? '' : parseInt(v)
        break

      case 'additional_scale':
      case 'additional_x':
        out[key] = v != null ? parseFloat(v) : undefined
        break

      case 'photo':
      case 'silhouette':
        // В JSON лежит строковый src (или null)
        if (v && v !== 'undefined' && v !== 'null') {
          try {
            out[key] = await loadImage(v)
          } catch {
            out[key] = null
          }
        } else {
          out[key] = null
        }
        break

      case 'masks':
      case 'transformation':
      case 'filters':
        // поддерживаем и объект, и строку (как в localStorage)
        out[key] = typeof v === 'string' ? JSON.parse(v) : v ?? {}
        break

      case 'seminar':
        // поддерживаем boolean / "0|1" / 0|1
        out[key] = !!(typeof v === 'string' ? parseInt(v) : v)
        break

      default:
        out[key] = v
    }
  }

  return out
}

export async function importStateFromFile(file) {
  const text = await file.text()
  let obj
  try {
    obj = JSON.parse(text)
  } catch {
    throw new Error('Невалидный JSON')
  }
  return await parseStateObject(obj)
}
