import React, { useEffect } from 'react'
import SettingsSection from '../../components/settings-section'
import { useDispatch } from 'react-redux'
import { fetchProfile } from '../../../profile/slice'


const OnboardingCompleteContainer = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  return (
    <>
      <SettingsSection
        title="Welcome"
        description="You can now start checking out our recommendations for you"
      />
    </>
  )
}

export default OnboardingCompleteContainer
