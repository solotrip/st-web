import React, { useState, useEffect } from 'react'
import { Button, SettingsSection, ThemeSwitch, DropDown } from 'components'
import DropDownTemperature from 'components/drop-down/index2'
import DropDownDistance from 'components/drop-down/index3'
import DropDownVaccinated from 'components/drop-down/index4'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'features/auth/slice'
import { useHistory } from 'react-router-dom'
import { profileSelector } from '../../../profile/slice'

import {
  currencies,
  distanceUnits,
  temperatureStates,
  vaccineStates,
  defaults
} from '../../../../constants/preferencesOptions.js'

const SettingsContainer = ({ showLogout }) => {
  const { data } = useSelector(profileSelector)
  const dispatch = useDispatch()

  let preferredCurrency
  let preferredDistanceUnit
  let preferredTemperatureUnit
  let isVaccinated

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    preferredCurrency = data.currency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    preferredDistanceUnit = data.distance
    // eslint-disable-next-line react-hooks/exhaustive-deps
    preferredTemperatureUnit = data.temperature
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isVaccinated = data.vaccinated
  }, [])

  const [preferredCurrencyState, setPreferredCurrencyState] = useState(
    defaults[0]
  )

  const [preferredDistanceUnitState, setPreferredDistanceUnitState] = useState(
    defaults[1]
  )

  const [
    preferredTemperatureUnitState,
    setPreferredTemperatureUnitState
  ] = useState(defaults[2])

  const [vaccineState, setVaccineState] = useState(defaults[3])

  const handleStates = () => {
    if (preferredCurrency !== undefined) {
      const foundCurrency = currencies.find(
        currency => currency.value === preferredCurrency
      )
      setPreferredCurrencyState(foundCurrency)
    }
    if (preferredDistanceUnit !== undefined) {
      const foundDistanceUnit = distanceUnits.find(
        unit => unit.value === preferredDistanceUnit
      )
      setPreferredDistanceUnitState(foundDistanceUnit)
    }
    if (preferredTemperatureUnit !== undefined) {
      const foundTemperatureUnit = temperatureStates.find(
        unit => unit.value === preferredTemperatureUnit
      )
      setPreferredTemperatureUnitState(foundTemperatureUnit)
    }
    if (isVaccinated !== undefined) {
      const foundVaccineStatus = vaccineStates.find(
        unit => unit.value === isVaccinated
      )
      setVaccineState(foundVaccineStatus)
    }
  }

  const history = useHistory()
  const handleLogout = () => {
    dispatch(logout({ history }))
  }

  handleStates()

  return (
    <>
      <SettingsSection title="Currency">
        <DropDown
          data={currencies}
          defaultVal={preferredCurrencyState}
          type="Currency"
        />
      </SettingsSection>
      <SettingsSection title="Temperature Unit">
        <DropDownTemperature
          data={temperatureStates}
          defaultVal={preferredTemperatureUnitState}
          type="preferredTemperatureUnit"
        />
      </SettingsSection>
      <SettingsSection title="Distance Unit">
        <DropDownDistance
          data={distanceUnits}
          defaultVal={preferredDistanceUnitState}
          type="preferredDistanceUnit"
        />
      </SettingsSection>
      <SettingsSection title="Vaccination">
        <DropDownVaccinated
          data={vaccineStates}
          defaultVal={vaccineState}
          type="isVaccinated"
        />
      </SettingsSection>

      <SettingsSection title="Theme" description=" ">
        <ThemeSwitch />
      </SettingsSection>
      {showLogout && (
        <SettingsSection title="Account" description=" ">
          <Button text="Logout" onClick={handleLogout} isSecondary />
        </SettingsSection>
      )}
    </>
  )
}

export default SettingsContainer
