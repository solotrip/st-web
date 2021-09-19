import React, { useState, useEffect } from 'react'
import styles from './content.module.scss'
import Recommendation from './recommendation/index'
import useThemeState from 'utils/hooks/use-theme-state'
import Footer from '../../home/components/footer'
import { useSelector } from 'react-redux'
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoibmFiZXJrIiwiYSI6ImNrc25sdngyaTFxZHUydm94ZXpuYXp6Y2wifQ.tOkAADvCBh7-SvAYKbQCtA'
})

const Content = ({ recommendations, user, mapEnabled = true }) => {
  let wishlist = []
  wishlist = useSelector(state => state.wishlist.wishlist)
  const [appTheme] = useThemeState()
  //default dark map.
  const [mapboxTheme, setMapboxTheme] = useState(
    'mapbox://styles/naberk/cksnplg9i2mvi18pgkkuf1fol'
  )
  const [active, setActive] = useState('edirne')

  const [centerCoordinates, setCenterCoordinates] = useState([28.9784, 41.0082])

  function activeHandler(param) {
    setActive(param)
    if (param === 'alberobello') {
      setCenterCoordinates([17.2409, 40.7864])
    } else if (param === 'san-giovanni-rotondo') {
      setCenterCoordinates([15.7292, 41.7066])
    } else if (param === 'monza') {
      setCenterCoordinates([35.1685, 31.7944])
    }
  }

  useEffect(
    () => {
      appTheme == 'light'
        ? setMapboxTheme('mapbox://styles/naberk/cksnq0g1q12vb17nzkij49ou6')
        : setMapboxTheme('mapbox://styles/naberk/cksnplg9i2mvi18pgkkuf1fol')
    },
    [appTheme]
  )
  return (
    <div className={styles.mostOuted}>
      <div className={styles.outerWrapperCentered}>
        <div className={styles.wrapperCentered}>
          <div className={styles.rowin}>
            {recommendations.map(recommendation => {
              return (
                <Recommendation
                  key={`rec-${recommendation.sid}`}
                  recommendation={recommendation}
                  user={user}
                  activeHandler={activeHandler}
                  wishlisted={wishlist.includes(recommendation)}
                />
              )
            })}
          </div>
          <Footer />
        </div>
      </div>
      {mapEnabled && (
        <div className={styles.mapbox}>
          <Map
            style={mapboxTheme}
            containerStyle={{
              height: '100vh',
              width: '100%'
            }}
            center={centerCoordinates}
            zoom={[7]}
            pitch={[30]}
          >
            <Layer
              type="symbol"
              id="marker"
              layout={{ 'icon-image': 'marker-1' }}
            >
              <Feature coordinates={centerCoordinates} />
              <Marker coordinates={centerCoordinates} />
            </Layer>
          </Map>
        </div>
      )}
    </div>
  )
}

export default Content
