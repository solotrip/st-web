import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialize } from '../../auth/slice'
import Loader from '../../../components/loader'
import { Redirect } from 'react-router-dom'


const OnboardingContainer = ({ children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialize(true))
  }, [dispatch])
  const { loading: authLoading } = useSelector(
    state => state.auth
  )

  const { data, loading: profileLoading } = useSelector(
    state => state.profile
  )


  // If authenticating or fetching profile info, wait
  if (authLoading || profileLoading) {
    return <Loader/>
  }

  return data && data.onboarded ? (
    <Redirect to="/recommendations"/>
  ) : children
}

export default OnboardingContainer
