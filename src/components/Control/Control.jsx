import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import YearEdit from './edit/YearEdit'
import SubjectEdit from './edit/SubjectEdit'
import NumberEdit from './edit/NumberEdit'
import SubjectSizeEdit from './edit/SubjectSizeEdit'
import TopicEdit from './edit/TopicEdit'
import TopicSizeEdit from './edit/TopicSizeEdit'
import LecturerEdit from './edit/LecturerEdit'
import SeasonEdit from './edit/SeasonEdit'
import SilhouetteScaleEdit from './edit/SilhouetteScaleEdit'
import SilhouetePrimaryButton from './silhouette/PrimaryButton'
import SilhouettePositionEdit from './edit/SilhouettePositionEdit'

import styles from './Control.css'

const Block = props => {
  return <Grid style={{ marginBottom: 10 }} container spacing={2} {...props} />
}

const Control = () => {
  const displaySilhouetteControl = useSelector(state => !!state.silhouette)
  return (
    <div className={styles.control}>
      <Block>
        <Grid item xs={12}>
          <YearEdit />
        </Grid>
      </Block>
      <Block>
        <Grid item xs={9}>
          <SubjectEdit />
        </Grid>
        <Grid item xs={3}>
          <NumberEdit />
        </Grid>
        <Grid item xs={12}>
          <SubjectSizeEdit />
        </Grid>
      </Block>
      <Block>
        <Grid item xs={12}>
          <TopicEdit />
        </Grid>
        <Grid item xs={12}>
          <TopicSizeEdit />
        </Grid>
      </Block>
      <Block>
        <Grid item xs={6}>
          <LecturerEdit />
        </Grid>
        <Grid item xs={6}>
          <SeasonEdit />
        </Grid>
      </Block>
      <Block>
        <Grid item xs={12}>
          <SilhouetePrimaryButton />
        </Grid>
        {displaySilhouetteControl && (
          <>
            <Grid item xs={4}>
              <SilhouetteScaleEdit />
            </Grid>
            <Grid item xs={8}>
              <SilhouettePositionEdit />
            </Grid>
          </>
        )}
      </Block>
    </div>
  )
}

export default Control
