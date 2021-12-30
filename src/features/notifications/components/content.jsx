/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import styles from './content.module.scss'
import Notification from './notification'

import useThemeState from 'utils/hooks/use-theme-state'
import { MAPBOX_TOKEN } from 'constants/index'
import ReactMapboxGl, { Feature, Layer, Marker } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { locationSelector } from '../../recommendations/containers/location/slice'
import { useSelector } from 'react-redux'
import { Loader } from 'components'

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN
})

const Content = ({ notifications, mapEnabled = true, loading }) => {
  const [appTheme] = useThemeState()
  //default dark map.
  const [mapboxTheme, setMapboxTheme] = useState(
    'mapbox://styles/naberk/ckxnlqnws136z14qrjz7upcaj'
  )
  let active = false

  const { activeLocation, locations } = useSelector(locationSelector)

  useEffect(
    () => {
      appTheme === 'light'
        ? setMapboxTheme('mapbox://styles/naberk/ckxnlqnws136z14qrjz7upcaj')
        : setMapboxTheme('mapbox://styles/naberk/ckxnlqnws136z14qrjz7upcaj')
    },
    [appTheme]
  )
  const coordinates = loading ? [] : notifications.map(r => [r.lon, r.lat])
  return (
    <div className={styles.page}>
      <div className={styles.notifications}>
        <h1 className={styles.title}>Notifications</h1>
        {loading && <Loader />}
        {!loading &&
          notifications.length === 0 && (
            <span className={styles.noItems}>All clear. Come back later</span>
        )}
        {notifications.map(notification => {
          return (
            <Notification
              key={`not-${notification.sid}`}
              notification={notification}
            />
          )
        })}
      </div>
      {mapEnabled && (
        <div className={styles.mapbox}>
          <Map
            style={mapboxTheme}
            containerStyle={{
              height: '100vh',
              width: '100%'
            }}
            center={
              active
                ? [active.lon, active.lat]
                : locations && activeLocation && locations[activeLocation]
                  ? [
                    locations[activeLocation].lon,
                    locations[activeLocation].lat
                  ]
                  : [-0.118092, 51.509865]
            }
            zoom={[10]}
            pitch={[30]}
          >
            <Layer
              type="symbol"
              id="marker"
              layout={{ 'icon-image': 'marker-1' }}
            >
              <Feature coordinates={coordinates} />
              <Marker coordinates={coordinates} />
            </Layer>
          </Map>
        </div>
      )}
    </div>
  )
}

export default Content
