import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import DialogWindow from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import LeftIcon from '@material-ui/icons/ChevronLeft'
import RightIcon from '@material-ui/icons/ChevronRight'
import PhotoSelect from './steps/PhotoSelect/PhotoSelect'
import MasksEditor from './steps/MasksEditor/MasksEditor'
import Filter from './steps/Filter/Filter'

import styles from './Dialog.css'

const KEY_PHOTO_SELECT = 0
const KEY_MASK = 1
const KEY_FILTER = 2

const steps = [
  [KEY_PHOTO_SELECT, 'Выбор фото'],
  [KEY_MASK, 'Вырезка'],
  [KEY_FILTER, 'Фильтр'],
]

const Dialog = ({ isOpen, close }) => {
  const photoDone = useSelector(state => !!state.photo)
  const masksDone = useSelector(state => !!state.masks)
  const filteredImageExists = useSelector(state => !!state.silhouette)
  const [filterDialogReadyState, setFilterDialogReadyState] = useState(false)
  const filterDone = filteredImageExists && filterDialogReadyState

  const completed = {
    [KEY_PHOTO_SELECT]: photoDone,
    [KEY_MASK]: masksDone,
    [KEY_FILTER]: filterDone,
  }
  const allowed = {
    [KEY_PHOTO_SELECT]: true,
    [KEY_MASK]: photoDone,
    [KEY_FILTER]: photoDone && masksDone,
  }
  const allDone = photoDone && masksDone && filterDone

  let lastAllowedIndex = steps.findIndex(([key]) => !allowed[key]) - 1
  if (lastAllowedIndex == -2) lastAllowedIndex = steps.length - 1
  const [stepKey, setStepKey] = useState(steps[lastAllowedIndex][0])

  const prevButtonRef = useRef()
  function onPrevClick() {
    prevButtonRef.current?.blur() // firefox workaround
    setStepKey(stepKey - 1)
  }

  const nextButtonRef = useRef()
  function onNextClick() {
    nextButtonRef.current?.blur()
    setStepKey(stepKey + 1)
  }

  return (
    <DialogWindow open={isOpen} maxWidth={false} onClose={close}>
      <DialogContent>
        <Stepper nonLinear className={styles.stepper}>
          {steps.map(([key, label]) => (
            <Step key={key} disabled={!allowed[key]} active={key == stepKey}>
              <StepButton onClick={() => setStepKey(key)} completed={completed[key]}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div className={styles.stepContent}>
          {(() => {
            switch (stepKey) {
              case KEY_PHOTO_SELECT:
                return <PhotoSelect confirmBeforeClear={masksDone} />
              case KEY_MASK:
                return <MasksEditor />
              case KEY_FILTER:
                return <Filter onReadyStateChange={setFilterDialogReadyState} />
            }
          })()}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          ref={prevButtonRef}
          color="primary"
          disabled={!allowed[stepKey - 1]}
          onClick={onPrevClick}
          startIcon={<LeftIcon />}
        >
          Назад
        </Button>
        {stepKey == KEY_FILTER ? (
          <Button variant="contained" color="primary" onClick={close} disabled={!allDone}>
            Готово
          </Button>
        ) : (
          <Button
            ref={nextButtonRef}
            variant="contained"
            color="primary"
            disabled={!allowed[stepKey + 1]}
            onClick={onNextClick}
            endIcon={<RightIcon />}
          >
            Далее
          </Button>
        )}
      </DialogActions>
    </DialogWindow>
  )
}

export default React.memo(Dialog)
