import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  localPreferencesSelector,
  updateLocalPreference
} from 'reducers/localPreferencesSlice'
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
  const onUpdate = useCallback(payload => {
    setData(prevData => ({ ...prevData, passports: payload.map(p => p.value) }))
  }, [setData])
  const onSubmit = () => {
    dispatch(updateLocalPreference({ key: 'passports', value: data.passports }))
    history.push({
      pathname: '/recommendations',
      search: qs.stringify(data)
    })
  }
  const value = options.filter(o => data.passports.includes(o.value))

  return (
    <SheetWrapper snapPoints={[500]}>
      <SheetWrapper.Content>
        <SettingsSection
          title="Passports"
          description="We need this to provide you accurate visa information"
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
      <SheetWrapper.Footer onClick={onSubmit} text="Search"
                           disabled={data.passports.length === 0}
      />
    </SheetWrapper>
  )
}

export default PassportCountriesContainer
