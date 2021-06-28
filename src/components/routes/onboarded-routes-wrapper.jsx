import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialize } from 'features/auth/slice'
import Loader from 'components/loader'
import { Redirect } from 'react-router-dom'

const OnboardedRoutesWrapper = ({ children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialize(false))
  }, [dispatch])
  const { loading: authLoading, isAuthenticated } = useSelector(
    state => state.auth
  )

  const { data, loading: profileLoading } = useSelector(
    state => state.profile
  )

  // If authenticating or fetching profile info, wait
  if (authLoading || (!authLoading && isAuthenticated && profileLoading)) {
    return <Loader/>
  }

  return (isAuthenticated && data && data.onboarded) ? (
    children
  ) : <Redirect to="/onboarding/1"/>
}

export default OnboardedRoutesWrapper
