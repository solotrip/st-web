import React, { useState, useEffect } from 'react'
import styles from './recommendation-details.module.scss'
import useThemeState from 'utils/hooks/use-theme-state'
import { MAPBOX_TOKEN } from 'constants/index'
import ReactMapboxGl, { Feature, Layer, Marker } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { Icon } from '@iconify/react'
import { useHistory } from 'react-router-dom'

import { useSelector } from 'react-redux'

import Details from '../components/recommendation-details/alter'
import { activeRecoSelector } from '../../active-reco/slice'
import { querySelector } from '../../query/slice'

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN
})

const RecommendationDetailsContainer = ({ mapEnabled = true }) => {
  const { activeReco } = useSelector(activeRecoSelector)
  const { query } = useSelector(querySelector)
  const [appTheme] = useThemeState()
  const history = useHistory()
  //default dark map.
  const [mapboxTheme, setMapboxTheme] = useState(
    'mapbox://styles/naberk/ckxq95gyv4zdz16ryxpcq8vyy'
  )
  // eslint-disable-next-line no-unused-vars
  const [active, setActive] = useState(null)

  const goBack = () => {
    console.log('query to go back is: ', query)
    history.replace({
      pathname: '/recommendations',
      search: query
    })
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
          <div className={styles.oneRow}>
            <button
              className={styles.trackButton}
              onClick={goBack}
              //disabled={loading}
            >
              <Icon
                icon="fluent:ios-arrow-ltr-24-regular"
                color="#3cafeb"
                height="30"
                className={styles.bell}
              />
            </button>
            <h1 className={styles.title}>
              {activeReco ? activeReco.name : 'Go back to your recommendations'}
            </h1>
          </div>
          {!activeReco &&
            // eslint-disable-next-line max-len
            'This recommendation is not available right now. Go back to your recommendations or start a new search.'}

          {activeReco && (
            <div className={styles.subtitle}>
              {activeReco.country.emoji_flag} {activeReco.country.name}
            </div>
          )}
          {activeReco && <Details activeReco={activeReco} />}
        </div>

        {activeReco &&
          mapEnabled && (
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
