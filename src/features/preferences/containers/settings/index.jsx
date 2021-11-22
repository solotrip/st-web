import React from 'react'
import { Button, SettingsSection, ThemeSwitch } from 'components'
import { useDispatch } from 'react-redux'
import { logout } from 'features/auth/slice'
import { useHistory } from 'react-router-dom'
// import CustomizationContainer from "../customization";

const SettingsContainer = ({ showLogout }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout({ history }))
  }

  return (
    <>
      {/*<CustomizationContainer />*/}
      <SettingsSection title="Theme" description=" ">
        <ThemeSwitch/>
      </SettingsSection>
      {showLogout && (
        <SettingsSection title="Account" description=" ">
          <Button text="Logout" onClick={handleLogout} isSecondary/>
        </SettingsSection>
      )}
    </>
  )
}

export default SettingsContainer
