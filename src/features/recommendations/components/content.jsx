import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './content.module.scss'
import Recommendation from './recommendation/index'
import useThemeState from 'utils/hooks/use-theme-state'
import { MAPBOX_TOKEN } from 'constants/index'
import ReactMapboxGl, { Feature, Layer, Marker } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Loader } from 'components'

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN
})

const Content = ({
  recommendations,
  recommendationId,
  query,
  user,
  mapEnabled = true,
  toggleWishlist,
  wishlisted,
  loading,
  noItemsMessage,
  title
}) => {
  const [appTheme] = useThemeState()
  //default dark map.
  const [mapboxTheme, setMapboxTheme] = useState(
    'mapbox://styles/naberk/cksnplg9i2mvi18pgkkuf1fol'
  )
  const [active, setActive] = useState(null)

  const activeHandler = param => {
    setActive(param)
  }

  useEffect(
    () => {
      appTheme === 'light'
        ? setMapboxTheme('mapbox://styles/naberk/cksnq0g1q12vb17nzkij49ou6')
        : setMapboxTheme('mapbox://styles/naberk/cksnplg9i2mvi18pgkkuf1fol')
    },
    [appTheme]
  )
  const coordinates = loading ? [] : recommendations.map(r => [r.lon, r.lat])
  return (
    <div className={styles.page}>

      <div className={styles.recommendations}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {loading && <Loader/>}
        {(!loading && recommendations.length === 0) &&
        <span className={styles.noItems}>{noItemsMessage}</span>}
        {(!loading && recommendations.length > 0) && recommendations.map(recommendation => {
          return (
            <Recommendation
              key={`rec-${recommendation.sid}`}
              recommendationId={recommendationId}
              query={query}
              recommendation={recommendation}
              user={user}
              activeHandler={() => activeHandler(recommendation)}
              toggleWishlist={toggleWishlist}
              // TODO: handle wishlisted
              wishlisted={recommendation.wishlisted}
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
            center={active ? [active.lon, active.lat] : [0, 0]}
            zoom={[7]}
            pitch={[30]}
          >
            <Layer
              type="symbol"
              id="marker"
              layout={{ 'icon-image': 'marker-1' }}
            >
              <Feature coordinates={coordinates}/>
              <Marker coordinates={coordinates}/>
            </Layer>
          </Map>
        </div>
      )}
    </div>
  )
}

Content.defaultProps = {
  noItemsMessage: 'No place matches your preferences'
}

Content.propTypes = {
  noItemsMessage: PropTypes.string
}

export default Content
