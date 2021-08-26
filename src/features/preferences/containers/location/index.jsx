import React from 'react'
import { Button } from 'components'
import styles from './location.module.scss'
import { MdLocationSearching } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBrowserGeolocation, locationSelector } from './slice'
import SettingsSection from '../../components/settings-section'

const LocationContainer = () => {
  const {
    coordinates,
    loadingBrowserGeolocation
  } = useSelector(locationSelector)
  const dispatch = useDispatch()

  const handleBrowserLocButton = () => {
    dispatch(fetchBrowserGeolocation())
  }

  return (
    <SettingsSection
      title="Location"
      description="We need this to find
      best destinations from your location"
    >
      <Button onClick={handleBrowserLocButton}
              loading={loadingBrowserGeolocation}
              icon={MdLocationSearching}
              className={styles.button}
      >
        Update Location
      </Button>
      {coordinates ? (
        <>
          <span
            className={styles.coordinate}
          >
            Longitude:<strong>{coordinates.longitude.toFixed(4)}</strong>
          </span>
          <span
            className={styles.coordinate}
          >
            Latitude:<strong>{coordinates.latitude.toFixed(4)}</strong>
          </span>
        </>
      ) : (
        <span className={styles.noLocationData}>No location data</span>
      )}
    </SettingsSection>
  )
}

export default LocationContainer
