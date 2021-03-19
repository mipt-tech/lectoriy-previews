export const setYear = year => ({
  type: 'SET_KEY_VALUE',
  key: 'year',
  value: year,
})

export const setSubject = subject_text => ({
  type: 'SET_KEY_VALUE',
  key: 'subject_text',
  value: subject_text,
})

export const setSubjectSize = subject_size => ({
  type: 'SET_KEY_VALUE',
  key: 'subject_size',
  value: subject_size,
})

export const setNumber = number => ({
  type: 'SET_KEY_VALUE',
  key: 'number',
  value: number,
})

export const setSeminar = seminar => ({
  type: 'SET_KEY_VALUE',
  key: 'seminar',
  value: seminar,
})

export const setTopic = topic_text => ({
  type: 'SET_KEY_VALUE',
  key: 'topic_text',
  value: topic_text,
})

export const setTopicSize = topic_size => ({
  type: 'SET_KEY_VALUE',
  key: 'topic_size',
  value: topic_size,
})

export const setLecturer = lecturer => ({
  type: 'SET_KEY_VALUE',
  key: 'lecturer',
  value: lecturer,
})

export const setSeason = season => ({
  type: 'SET_KEY_VALUE',
  key: 'season',
  value: season,
})

export const setAdditionalScale = scale => ({
  type: 'SET_KEY_VALUE',
  key: 'additional_scale',
  value: scale,
})

export const setPhoto = img => ({
  type: 'SET_KEY_VALUE',
  key: 'photo',
  value: img,
})

export const clearPhoto = () => ({
  type: 'CLEAR_PHOTO',
})

export const setMasks = masks => ({
  type: 'SET_MASKS',
  masks,
})

export const setSilhouette = img => ({
  type: 'SET_KEY_VALUE',
  key: 'silhouette',
  value: img,
})

export const setTransformation = transformation => ({
  type: 'SET_KEY_VALUE',
  key: 'transformation',
  value: transformation,
})

export const setPosterization = value => ({
  type: 'SET_FILTER',
  filter: 'posterization',
  value,
})

export const setBrightness = value => ({
  type: 'SET_FILTER',
  filter: 'brightness',
  value,
})

export const setContrast = value => ({
  type: 'SET_FILTER',
  filter: 'contrast',
  value,
})

export const setAdditionalX = value => ({
  type: 'SET_KEY_VALUE',
  key: 'additional_x',
  value,
})
