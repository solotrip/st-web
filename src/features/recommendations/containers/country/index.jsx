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
import CustomMenuList from '../destination/MenuList'
import CustomOption from 'components/custom-option'

const options = countries.map(c => ({
  label: `${c.flag} ${c.name}`,
  value: c.ISO
}))

const CountryContainer = () => {
  const dispatch = useDispatch()
  const query = useQuery()
  const queryComplete = query && query.complete ? true : false
  const { passports = [] } = useSelector(localPreferencesSelector)
  const history = useHistory()
  const [data, setData] = useState({
    ...query,
    filters: query.filters
      ? _zipObject(query.filters.map(q => q.id), query.filters.map(q => q.variables || true))
      : {}
  })
  const onUpdate = useCallback(
    payload => {
      if (payload !== [] && payload.length && payload.length > 0) {
        setData(prevData => ({
          ...prevData,
          filters: {
            ...prevData.filters,
            c: { countryCodes: payload.map(p => p.value) }
          }
        }))
      } else if (payload && payload.length === 0) {
        setData(prevData => ({
          ...prevData,
          filters: {
            ...prevData.filters,
            c: undefined
          }
        }))
      }
    },
    [setData]
  )
  const onSubmit = () => {
    history.push({
      pathname: '/recommendations',
      search: qs.stringify({
        ...data,
        filters: Object.keys(data.filters)
          .filter(k => data.filters[k] !== undefined)
          .map(k => ({
            id: k,
            variables: data.filters[k] === true ? undefined : data.filters[k]
          }))
      })
    })
    if (Object.keys(data.filters) === [] || Object.keys(data.filters).length === 0) {
      //history.go(0)
    }
  }

  const value = options.filter(
    o =>
      data.filters && data.filters.c && data.filters.c.countryCodes
        ? data.filters.c.countryCodes.includes(o.value)
        : null
  )

  return (
    <SheetWrapper>
      <SheetWrapper.Content>
        <SettingsSection
          title="Country"
          // eslint-disable-next-line max-len
          description="Start a search within a specific country or countries. Get recommendations based on results."
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
            placeholder="Search a country or countries..."
          />
        </SettingsSection>
      </SheetWrapper.Content>
      <SheetWrapper.Footer onClick={onSubmit} text="Go" disabled={false} previousEnabled={false} />
    </SheetWrapper>
  )
}

export default CountryContainer
