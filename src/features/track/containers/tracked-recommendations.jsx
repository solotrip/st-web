import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader  } from 'components'

import { fetchTracked, trackSelector } from '../slice'
import Content from '../components/content'
import { profileSelector } from 'features/profile/slice'

const SavedContainer = () => {

  const { tracked, loading } = useSelector(trackSelector)

  const { data: user, loading: profileLoading } = useSelector(profileSelector)
  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(fetchTracked())
    },
    [dispatch]
  )

  return (
    <Loader loading={loading || profileLoading}>
      <Content saved={tracked} user={user} />
    </Loader>
  )
}

export default SavedContainer
