import React from 'react'
import { Button, SettingsSection, ThemeSwitch, DropDown } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'features/auth/slice'
import { useHistory } from 'react-router-dom'
import { localPreferencesSelector, updateLocalPreference } from 'reducers/localPreferencesSlice'

import { isGuestSelector, profileSelector } from 'features/profile/slice'
import {
  currencies,
  distanceUnits,
  temperatureStates,
  vaccineStates
} from 'constants/preferencesOptions.js'

const SettingsContainer = ({ showLogout }) => {
  const { currency, distance, temperature, vaccinated } = useSelector(localPreferencesSelector)

  const dispatch = useDispatch()
  const history = useHistory()
  const handleLogout = () => {
    dispatch(logout({ history }))
  }

  const handleSignup = () => {
    history.push('/recommendations/signup')
  }

  const isGuest = useSelector(isGuestSelector)
  const { data: user, loading: profileLoading } = useSelector(profileSelector)

  const onPreferenceChanged = key => ({ value }) => {
    dispatch(updateLocalPreference({ key, value }))
  }

  return (
    <>
      <SettingsSection title="Currency">
        <DropDown
          options={currencies}
          onSelect={onPreferenceChanged('currency')}
          value={currency}
        />
      </SettingsSection>
      <SettingsSection title="Temperature Unit">
        <DropDown
          options={temperatureStates}
          onSelect={onPreferenceChanged('temperature')}
          value={temperature}
        />
      </SettingsSection>
      <SettingsSection title="Distance Unit">
        <DropDown
          options={distanceUnits}
          onSelect={onPreferenceChanged('distance')}
          value={distance}
        />
      </SettingsSection>

      <SettingsSection title="Theme" description=" ">
        <ThemeSwitch />
      </SettingsSection>
      {showLogout && (
        <SettingsSection
          title="Account"
          description={
            isGuest
              ? 'You have a guest account. If you like to wishlist your recommendations or get notifications, sign up.'
              : `You just logged in as ${user.username}`
          }
        >
          {isGuest && (
            <div>
              <Button text="Sign up" onClick={handleSignup} />
            </div>
          )}
          <br />
          <Button text="Logout" onClick={handleLogout} isSecondary />
        </SettingsSection>
      )}
    </>
  )
}

export default SettingsContainer
