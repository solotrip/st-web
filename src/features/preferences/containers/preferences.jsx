import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { isGuestSelector } from 'features/profile/slice'
import {
  bucketlistHasSelectedSelector,
  updateBucketlist
} from './area-cluster/slice'

const PreferencesContainer = ({
  children,
  page: Page,
  isSettings
}) => {
  const dispatch = useDispatch()
  const { index } = useParams()

  const bucketlistHasSelected = useSelector(
    bucketlistHasSelectedSelector
  )

  const isGuest = useSelector(isGuestSelector)

  const onNext = useCallback(
    i => {
      if (isSettings) {
        return
      }
      switch (i) {
      case '1':
        dispatch(updateBucketlist())
        break
      case '2':
        break
      case '4':

        break
      default:
        return
      }
    },
    [dispatch, isSettings]
  )

  const getNextEnabled = () => {
    switch (index) {
    case '1':
      return bucketlistHasSelected
    case '2':
      return true
    default:
      return true
    }
  }

  const nextEnabled = getNextEnabled()

  return (
    <Page
      onNext={onNext}
      nextEnabled={nextEnabled}
      isGuest={isGuest}
      isSettings={isSettings}
    >
      {children}
    </Page>
  )
}

export default PreferencesContainer
