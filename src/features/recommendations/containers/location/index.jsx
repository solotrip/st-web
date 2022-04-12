import React, { useEffect, useCallback } from 'react'
import { SheetWrapper, SearchInput } from 'components'
import styles from './location.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import _uniqBy from 'lodash/uniqBy'
import { fetchCurrentLocation, locationSelector, searchLocation, updateLocation } from './slice'
import SettingsSection from 'components/settings-section'
import qs from 'qs'
import { useQuery } from 'utils/hooks/use-query'
import { useHistory } from 'react-router-dom'

const LocationContainer = () => {
  const {
    locations,
    recentLocations,
    results,
    query: searchQuery,
    currentLocation,
    errorCurrentLocation
  } = useSelector(locationSelector)
  const dispatch = useDispatch()
  const query = useQuery()
  const history = useHistory()

  useEffect(
    () => {
      dispatch(fetchCurrentLocation())
    },
    [dispatch]
  )

  const handleSearch = q => {
    dispatch(searchLocation({ query: q }))
  }

  const handleChange = useCallback(
    option => {
      dispatch(updateLocation(option))
      history.replace({
        pathname: '/recommendations',
        search: qs.stringify({
          ...query,
          lat: option.lat,
          lon: option.lon
        })
      })
    },
    //eslint-disable-next-line
    [dispatch]
  )

  const options =
    searchQuery === ''
      ? recentLocations.filter(l => l !== currentLocation).map(l => locations[l])
      : results
  const currentLocOption = locations[currentLocation]

  return (
    <SheetWrapper snapPoints={[500]}>
      <SheetWrapper.Content>
        <SettingsSection title="From" description="Where are you travelling from?">
          <SearchInput
            onChange={handleSearch}
            onReset={() => {
              handleSearch('')
            }}
            filled
          />
          <div className={styles.list}>
            {!errorCurrentLocation &&
              searchQuery === '' &&
              options &&
              !options.some(
                // eslint-disable-next-line max-len
                option =>
                  option && currentLocOption && option.fullname_en === currentLocOption.fullname_en
              ) && (
                <button
                  className={styles.item}
                  key={'loc-current'}
                  onClick={() => {
                    handleChange(currentLocOption)
                  }}
                  disabled={!currentLocOption}
                >
                  {!currentLocOption
                    ? 'Fetching current location...'
                    : currentLocOption.fullname_en}{' '}
                </button>
            )}
            {_uniqBy(options, 'fullname_en').map(o => (
              <button
                className={styles.item}
                key={`loc-${o.lat}-${o.lon}`}
                onClick={() => handleChange(o)}
              >
                {o.fullname_en}
              </button>
            ))}
          </div>
        </SettingsSection>
      </SheetWrapper.Content>
    </SheetWrapper>
  )
}

export default LocationContainer
