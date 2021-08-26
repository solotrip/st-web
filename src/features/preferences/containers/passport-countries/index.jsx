import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { passportsSelector, updatePassports } from './slice'
import SettingsSection from '../../components/settings-section'
import Select from 'react-select'
import styles from './passport-countries.module.scss'

const PassportCountriesContainer = () => {
  const {
    passports,
    options
  } = useSelector(passportsSelector)
  const dispatch = useDispatch()

  const handleChange = values => {
    dispatch(updatePassports(values))
  }

  return (
    <SettingsSection
      title="Passports"
      description="We need this to provide you accurate visa information"
    >
      <Select options={options}
              value={passports}
              isMulti
              className={styles.select}
              classNamePrefix="rs"
              onChange={handleChange}
              placeholder="Select countries..."
      />
    </SettingsSection>
  )
}

export default PassportCountriesContainer
