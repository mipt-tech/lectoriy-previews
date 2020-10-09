import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Help from './Help'
import MaskItem from './MaskItem'
import MaskedImage from './MaskedImage'
import Canvas from './Canvas'
import useWindowSize from './windowSize'
import { polylineToSvgPath, orientedArea, invert, closePath } from './paths'
import { setMasks } from '../../../../../store/actions'
import settings from '../../../../../util/settings'

import styles from './MasksEditor.css'

const MasksEditor = () => {
  const [viewerWidth, viewerHeight] = useWindowSize()
  const [highlightedMaskId, setHighlightedMaskId] = useState(-1)
  const background = useSelector(state => settings.backgroundColor[state.year])
  const photo = useSelector(state => state.photo)

  const canvasPadding = Math.max(photo.width, photo.height) / 2
  const canvasWidth = photo.width + canvasPadding * 2
  const canvasHeight = photo.height + canvasPadding * 2
  const initialScale = Math.min(viewerWidth / photo.width, viewerHeight / photo.height) * 0.9
  const initialTranslation = {
    x: (viewerWidth - canvasWidth * initialScale) / 2,
    y: (viewerHeight - canvasHeight * initialScale) / 2,
  }

  const nextMaskId = useRef(0)
  function addMask(masks, mask) {
    masks.set(nextMaskId.current++, mask)
  }

  function masksToInnerRepresentation(outer) {
    const masks = new Map()
    outer?.forEach(mask => addMask(masks, mask))
    return masks
  }

  function masksToOuterRepresentation(masks) {
    if (masks.size > 0) {
      return Array.from(masks.values())
    } else {
      return null
    }
  }

  const initialMasks = useSelector(state => state.masks)
  // a mask has an id locally and no id globally
  const [masks, setLocalMasks] = useState(() => masksToInnerRepresentation(initialMasks))

  const [tipVisible, setTipVisibility] = useState(!initialMasks)

  const dispatch = useDispatch()
  function onChange(newMasks) {
    setLocalMasks(newMasks)
    dispatch(setMasks(masksToOuterRepresentation(newMasks)))
  }

  function handleNewPolyline(polyline) {
    let polylineToAdd = polyline
    if (orientedArea(polyline) > 0) {
      polylineToAdd = polyline.reverse()
    }
    const newMasks = new Map(masks)
    addMask(newMasks, { polyline: polylineToAdd, inverse: false })
    onChange(newMasks)
  }

  return (
    <div
      className={styles.editor}
      style={{ width: viewerWidth, height: viewerHeight, background }}
      onMouseDown={() => setTipVisibility(false)}
    >
      <div className={styles.sidePanel}>
        {tipVisible && (
          <div className={styles.instructions}>
            <Typography variant="caption">Начните рисовать ломаную вокруг лектора</Typography>
          </div>
        )}
        {Array.from(masks).map(([id, mask]) => (
          <MaskItem
            key={id}
            onMouseEnter={() => setHighlightedMaskId(id)}
            onMouseLeave={() => setHighlightedMaskId(-1)}
            number={id + 1}
            inverse={mask.inverse}
            onInverse={() => {
              invert(mask)
              onChange(new Map(masks))
            }}
            onDelete={() => {
              masks.delete(id)
              onChange(new Map(masks))
              setHighlightedMaskId(-1)
            }}
          />
        ))}
      </div>
      <Help />
      <Canvas
        width={canvasWidth}
        height={canvasHeight}
        padding={canvasPadding}
        viewerWidth={viewerWidth}
        viewerHeight={viewerHeight}
        initialScale={initialScale}
        initialTranslation={initialTranslation}
        handleNewPolyline={handleNewPolyline}
        render={scale => (
          <>
            <MaskedImage
              masks={masks}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              img={photo}
            />
            {highlightedMaskId != -1 && (
              <path
                strokeWidth={2 / scale}
                stroke="red"
                d={closePath(polylineToSvgPath(masks.get(highlightedMaskId).polyline))}
                fill="transparent"
              />
            )}
          </>
        )}
      />
    </div>
  )
}

export default MasksEditor
