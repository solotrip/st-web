import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { localPreferencesSelector, updateLocalPreference } from 'reducers/localPreferencesSlice'
import SettingsSection from 'components/settings-section'
import Select from 'react-select'
import { SheetWrapper } from 'components'
import qs from 'qs'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'utils/hooks/use-query'
import countries from 'assets/data/countries.json'

const options = countries.map(c => ({
  label: `${c.flag} ${c.name}`,
  value: c.ISO
}))

const PassportCountriesContainer = () => {
  const dispatch = useDispatch()
  const query = useQuery()
  const { passports = [] } = useSelector(localPreferencesSelector)
  const history = useHistory()
  const [data, setData] = useState({
    ...query,
    passports: query.passports || passports
  })
  const onUpdate = useCallback(
    payload => {
      setData(prevData => ({ ...prevData, passports: payload.map(p => p.value) }))
    },
    [setData]
  )
  const onSubmit = () => {
    dispatch(updateLocalPreference({ key: 'passports', value: data.passports }))
    history.push({
      pathname: '/recommendations/filters',
      search: qs.stringify(data)
    })
  }
  const value = options.filter(o => data.passports.includes(o.value))

  return (
    <SheetWrapper snapPoints={[500]}>
      <SheetWrapper.Content>
        <SettingsSection
          title="Passports"
          description="We need your passport/passports to provide you with accurate visa information and to show visa free destinations for you. You can skip this step if you want."
        >
          <Select
            options={options}
            value={value}
            isMulti
            className="pulfy-select"
            classNamePrefix="rs"
            onChange={onUpdate}
            placeholder="Select countries..."
          />
        </SettingsSection>
      </SheetWrapper.Content>
      <SheetWrapper.Footer onClick={onSubmit} text="Next" disabled={data.passports.length === -1} />
    </SheetWrapper>
  )
}

export default PassportCountriesContainer
