import React, { useState, useEffect } from 'react'
import styles from './recommendation-details.module.scss'
import useThemeState from 'utils/hooks/use-theme-state'
import { MAPBOX_TOKEN } from 'constants/index'
import ReactMapboxGl, { Feature, Layer, Marker } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Loader } from 'components'

import { locationSelector } from '../containers/location/slice'
import { useSelector } from 'react-redux'

import Details from '../components/recommendation-details/alter'
import { activeRecoSelector } from '../../active-reco/slice'

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN
})

const RecommendationDetailsContainer = ({ mapEnabled = true }) => {
  const { activeReco } = useSelector(activeRecoSelector)
  const [appTheme] = useThemeState()
  //default dark map.
  const [mapboxTheme, setMapboxTheme] = useState(
    'mapbox://styles/naberk/ckxq95gyv4zdz16ryxpcq8vyy'
  )
  const [active, setActive] = useState(null)

  const { activeLocation, locations } = useSelector(locationSelector)

  const activeHandler = param => {
    setActive(param)
  }

  useEffect(
    () => {
      appTheme === 'light'
        ? setMapboxTheme('mapbox://styles/naberk/ckxq95gyv4zdz16ryxpcq8vyy')
        : setMapboxTheme('mapbox://styles/naberk/ckxq8qz8a3n7614qrwp269vfm')
    },
    [appTheme]
  )
  const coordinates = [0, 0]
  return (
    <div className="flex-col">
      <div className={styles.page}>
        <div className={styles.recommendations}>
          <h1 className={styles.title}>{activeReco.name}</h1>
          <div className={styles.subtitle}>
            {activeReco.country.emoji_flag} {activeReco.country.name}
          </div>
          <Details activeReco={activeReco} />
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
                  : [activeReco.lon, activeReco.lat]
              }
              zoom={[13]}
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
    </div>
  )
}

export default RecommendationDetailsContainer
