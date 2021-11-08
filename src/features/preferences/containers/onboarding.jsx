import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialize } from 'features/auth/slice'
import { Loader } from 'components'
import { Redirect, useHistory } from 'react-router-dom'

const OnboardingContainer = ({ children }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(
    () => {
      dispatch(initialize({ history, ensureAuth: true }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  )
  const { loading: authLoading } = useSelector(state => state.auth)

  const { data, loading: profileLoading } = useSelector(state => state.profile)

  // If authenticating or fetching profile info, wait
  if (authLoading || profileLoading) {
    return <Loader/>
  }

  return data && data.onboarded ? <Redirect to="/recommendations"/> : children
}

export default OnboardingContainer
