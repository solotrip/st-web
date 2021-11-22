import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { passportSelector, updatePassports } from './slice'
import SettingsSection from 'components/settings-section'
import Select from 'react-select'
import styles from './passport-countries.module.scss'
import { SheetWrapper } from 'components'
import qs from 'qs'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'utils/hooks/use-query'

const PassportCountriesContainer = () => {
  const {
    passports,
    options,
    passportsModified
  } = useSelector(passportSelector)
  const dispatch = useDispatch()
  const query = useQuery()
  const history = useHistory()

  const handleChange = values => {
    dispatch(updatePassports(values))
  }
  const onSubmit = () => {
    // dispatch(updatePassportCountries())

    history.push({
      pathname: '/recommendations',
      search: qs.stringify({
        ...query,
        passports: passports
      })
    })
  }

  return (
    <SheetWrapper snapPoints={[500]}>
      <SheetWrapper.Content>
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
      </SheetWrapper.Content>
      <SheetWrapper.Footer onClick={onSubmit} text="Search"
                           disabled={!passportsModified}
      />
    </SheetWrapper>
  )
}

export default PassportCountriesContainer
