import React from 'react'
import { Button, SheetWrapper } from 'components'
import styles from './location.module.scss'
import { MdLocationSearching } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBrowserGeolocation, locationSelector } from './slice'
import SettingsSection from 'components/settings-section'
import qs from 'qs'
import { useQuery } from 'utils/hooks/use-query'
import { useHistory } from 'react-router-dom'

const LocationContainer = () => {
  const {
    coordinates,
    modified: locationModified,
    loadingBrowserGeolocation
  } = useSelector(locationSelector)
  const dispatch = useDispatch()
  const query = useQuery()
  const history = useHistory()

  const handleBrowserLocButton = () => {
    dispatch(fetchBrowserGeolocation())
  }

  const onSubmit = () => {
    history.replace({
      pathname: '/recommendations',
      search: qs.stringify({
        ...query,
        lat: coordinates.latitude,
        lon: coordinates.longitude
      })
    })
  }

  return (
    <SheetWrapper snapPoints={[500]}>
      <SheetWrapper.Content>

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
      </SheetWrapper.Content>
      <SheetWrapper.Footer onClick={onSubmit} text="Search"
                           disabled={!coordinates || !locationModified}
      />
    </SheetWrapper>
  )
}

export default LocationContainer
