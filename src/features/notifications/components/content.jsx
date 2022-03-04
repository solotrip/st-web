/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import styles from './content.module.scss'
import Notification from './notification'

import useThemeState from 'utils/hooks/use-theme-state'
import { MAPBOX_TOKEN } from 'constants/index'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { Loader } from 'components'
import { useHistory, useLocation } from 'react-router-dom'

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN
})

const Content = ({ notifications, mapEnabled = true, loading }) => {
  const [appTheme] = useThemeState()
  const history = useHistory()
  const location = useLocation()
  //default dark map.
  const [mapboxTheme, setMapboxTheme] = useState(
    'mapbox://styles/naberk/ckxnlqnws136z14qrjz7upcaj'
  )
  const [southWest, setSouthWest] = useState([-0.118092, 51.509865])
  const [northEast, setNorthEast] = useState([-0.118092, 51.509865])

  const openDetails = recommendation => {
    history.replace({
      pathname: `recommendations/r/${recommendation.content.new.id}`,
      search: location.search
    })
  }

  useEffect(
    () => {
      appTheme === 'light'
        ? setMapboxTheme('mapbox://styles/naberk/ckxnlqnws136z14qrjz7upcaj')
        : setMapboxTheme('mapbox://styles/naberk/ckxnlqnws136z14qrjz7upcaj')
    },
    [appTheme]
  )
  useEffect(
    () => {
      if (notifications.length > 0) {
        let lats = []
        let lons = []
        notifications.forEach(notification => {
          lats.push(notification.content.new.lat)
          lons.push(notification.content.new.lon)
        })
        setSouthWest([Math.min(...lons), Math.min(...lats)])
        setNorthEast([Math.max(...lons), Math.max(...lats)])
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [notifications]
  )

  return (
    <div className={styles.page}>
      <div className={styles.notifications}>
        <h1 className={styles.title}>Notifications</h1>
        {loading && <Loader />}
        {!loading &&
          notifications.length === 0 && (
            <span className={styles.noItem}>All clear. Come back later</span>
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
            fitBounds={[southWest, northEast]}
            fitBoundsOptions={{ padding: 100 }}
            pitch={[30]}
          >
            {!loading &&
              notifications.length > 0 &&
              notifications.map((notification, index) => (
                <div key={notification.content.new.lon}>
                  <Marker
                    coordinates={{
                      lng: notification.content.new.lon,
                      lat: notification.content.new.lat
                    }}
                    className={styles.mapMarker}
                  />

                  <Popup
                    offset={[0, 0]}
                    coordinates={{
                      lng: notification.content.new.lon,
                      lat: notification.content.new.lat
                    }}
                  >
                    <button
                      onClick={() => openDetails(notification)}
                      className={styles.popupContent}
                    >
                      <div className={styles.colorStrip} />
                      <div className={styles.popupContent2}>
                        <div className={styles.popupIndex}> {index + 1}</div>

                        <div className={styles.popupInner}>
                          {notification.content.new.name}
                        </div>
                      </div>
                    </button>
                  </Popup>
                </div>
              ))}
          </Map>
        </div>
      )}
    </div>
  )
}

export default Content
