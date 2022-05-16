import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, initialize } from 'features/auth/slice'
import Loader from 'components/loader'
import { Redirect, useHistory, useLocation } from 'react-router-dom'

const OnboardedRoutesWrapper = ({ children, registeredOnly = false }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  useEffect(
    () => {
      dispatch(initialize({ history, ensureAuth: false }))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  )
  const { loading: authLoading, isAuthenticated, isGuest } = useSelector(authSelector)

  const { loading: profileLoading } = useSelector(state => state.profile)

  // If authenticating or fetching profile info, wait
  if (authLoading || (!authLoading && isAuthenticated && profileLoading)) {
    return <Loader />
  }

  return isAuthenticated ? (
    isGuest && registeredOnly && !location.pathname.endsWith('/signup') ? (
      <Redirect to={`${location.pathname}/signup`} />
    ) : (
      children
    )
  ) : (
    <Redirect to="/onboarding/1" />
  )
}

export default OnboardedRoutesWrapper
