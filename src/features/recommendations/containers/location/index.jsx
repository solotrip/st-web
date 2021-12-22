import React, { useEffect, useCallback } from 'react'
import { SheetWrapper, SearchInput } from 'components'
import styles from './location.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCurrentLocation,
  locationSelector,
  searchLocation,
  updateLocation
} from './slice'
import SettingsSection from 'components/settings-section'
import qs from 'qs'
import { useQuery } from 'utils/hooks/use-query'
import { useHistory } from 'react-router-dom'

const LocationContainer = () => {
  const {
    locations,
    recentLocations,
    fetchingCurrentLocation,
    results,
    query: searchQuery,
    currentLocation,
    errorCurrentLocation,
    activeLocation
  } = useSelector(locationSelector)
  const dispatch = useDispatch()
  const query = useQuery()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchCurrentLocation())
  }, [])

  const onSubmit = () => {
    const activeLoc = locations[activeLocation]
    history.replace({
      pathname: '/recommendations',
      search: qs.stringify({
        ...query,
        lat: activeLoc.lat,
        lon: activeLoc.lon
      })
    })
  }
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
    [dispatch]
  )

  const options =
    searchQuery === ''
      ? recentLocations
        .filter(l => l !== currentLocation)
        .map(l => locations[l])
      : results
  const currentLocOption = locations[currentLocation]

  return (
    <SheetWrapper snapPoints={[500]}>
      <SheetWrapper.Content>
        <SettingsSection title="Location" description=" ">
          <SearchInput
            onChange={handleSearch}
            onReset={() => {
              handleSearch('')
            }}
            filled
          />
          <div className={styles.list}>
            {!errorCurrentLocation &&
              searchQuery === '' && (
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
                    : currentLocOption.fullname_en}
                </button>
            )}
            {options.map(o => (
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
