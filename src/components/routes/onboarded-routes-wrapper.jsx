import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialize } from 'features/auth/slice'
import Loader from 'components/loader'
import { Redirect, useHistory } from 'react-router-dom'

const OnboardedRoutesWrapper = ({ children }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(initialize({ history, ensureAuth: false }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  const { loading: authLoading, isAuthenticated } = useSelector(
    state => state.auth
  )

  const { loading: profileLoading } = useSelector(
    state => state.profile
  )

  // If authenticating or fetching profile info, wait
  if (authLoading || (!authLoading && isAuthenticated && profileLoading)) {
    return <Loader/>
  }

  return (isAuthenticated) ? (
    children
  ) : <Redirect to="/onboarding/1"/>
}

export default OnboardedRoutesWrapper
