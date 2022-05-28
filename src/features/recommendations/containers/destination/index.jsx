import React, { useCallback, useState } from 'react'
import _zipObject from 'lodash/zipObject'
import { useDispatch, useSelector } from 'react-redux'
import { localPreferencesSelector, updateLocalPreference } from 'reducers/localPreferencesSlice'
import SettingsSection from 'components/settings-section'
import Select, { createFilter } from 'react-select'
import { SheetWrapper } from 'components'
import qs from 'qs'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'utils/hooks/use-query'
import countries from 'assets/data/countries.json'
import areas from 'assets/data/areas.json'
import CustomMenuList from './MenuList'
import CustomOption from 'components/custom-option'

const options = areas.map(c => ({
  label: `${c.name}, ${c.flag} ${c.country}`,
  value: c.sid
}))

const DestinationContainer = () => {
  const dispatch = useDispatch()
  const query = useQuery()
  const queryComplete = query && query.complete ? true : false
  const { passports = [] } = useSelector(localPreferencesSelector)
  const history = useHistory()
  const [data, setData] = useState({
    ...query,
    filters: query.filters
  })
  const onUpdate = useCallback(
    payload => {
      if (payload !== [] && payload.length && payload.length > 0) {
        setData(prevData => ({
          ...prevData,
          filters: {
            ...prevData.filters,
            0: { id: 'a', variables: { areaSids: payload.map(p => p.value) } }
          }
        }))
      } else if (
        payload &&
        payload.length === 0 &&
        data &&
        data.filters &&
        data.filters[0] &&
        !data.filters[0].variables.areaSids
      ) {
        setData(prevData => ({
          ...prevData,
          filters: {
            ...prevData.filters,
            0: { id: undefined }
          }
        }))
      } else if (payload && payload.length === 0) {
        setData(prevData => ({
          ...prevData,
          filters: {
            ...prevData.filters,
            0: { id: undefined }
          }
        }))
      }
    },
    [setData]
  )
  const onSubmit = () => {
    dispatch(updateLocalPreference({ key: 'passports', value: data.passports }))

    history.push({
      pathname: '/recommendations',
      search: qs.stringify(data)
    })
  }

  const value = options.filter(
    o =>
      data.filters &&
      data.filters[0] &&
      data.filters[0].variables &&
      data.filters[0].variables.areaSids
        ? data.filters[0].variables.areaSids.includes(o.value)
        : //: query.filters && query.filters[0]
      //  ? query.filters[0].variables.areaSids.includes(o.value)
        null
  )

  return (
    <SheetWrapper snapPoints={[500]}>
      <SheetWrapper.Content>
        <SettingsSection
          title="Destination"
          // eslint-disable-next-line max-len
          description="If you like to inspect a specific destination, just search the destination below and click search. If you would like to compare destinations and get multiple recommendations, you can select multiple destinations."
        >
          <Select
            filterOption={createFilter({ ignoreAccents: false })}
            components={{ Option: CustomOption, MenuList: CustomMenuList }}
            options={options}
            value={value}
            isMulti
            className="pulfy-select"
            classNamePrefix="rs"
            onChange={onUpdate}
            placeholder="Search a destination or destinations..."
          />
        </SettingsSection>
      </SheetWrapper.Content>
      <SheetWrapper.Footer
        onClick={onSubmit}
        text="Go"
        disabled={data.passports.length === -1}
        previousEnabled={false}
      />
    </SheetWrapper>
  )
}

export default DestinationContainer
