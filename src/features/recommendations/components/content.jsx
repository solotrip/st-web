import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './content.module.scss'
import Recommendation from './recommendation/index'
import useThemeState from 'utils/hooks/use-theme-state'
import { MAPBOX_TOKEN } from 'constants/index'
import ReactMapboxGl, { Feature, Layer, Marker } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Loader } from 'components'

import { locationSelector } from '../containers/location/slice'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import qs from 'qs'

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
  wishlistedIds,
  loading,
  noItemsMessage,
  title,
  children
}) => {
  const [appTheme] = useThemeState()
  //default dark map.
  const [mapboxTheme, setMapboxTheme] = useState(
    'mapbox://styles/naberk/ckxnlqnws136z14qrjz7upcaj'
  )
  const [active, setActive] = useState(null)

  const { activeLocation, locations } = useSelector(locationSelector)

  const [focusLocation, setFocusLocation] = useState([-0.118092, 51.509865])

  const [queryHolder, setQueryHolder] = useState(qs.stringify(query))

  const activeHandler = param => {
    setActive(param)
  }

  const resetFilters = () => {
    console.log('query  before delete is : ', qs.stringify(query))
    delete query.filters
    console.log('query  after delete is : ', qs.stringify(query))
    setQueryHolder(qs.stringify(query))
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
      if (
        locations !== undefined &&
        locations[activeLocation] !== undefined &&
        locations[activeLocation].lon !== undefined &&
        locations[activeLocation].lat !== undefined
      ) {
        setFocusLocation([
          locations[activeLocation].lon,
          locations[activeLocation].lat
        ])
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locations]
  )
  const coordinates = loading ? [] : recommendations.map(r => [r.lon, r.lat])
  return (
    <div className={styles.page}>
      <div className={styles.recommendations}>
        {query &&
          query.filters && (
            <button className={styles.resetFilters} onClick={resetFilters}>
              <Link to={`recommendations?${queryHolder}`}>
                {' '}
                <div className={styles.whiteText}>Reset Filters </div>
              </Link>
            </button>
        )}

        {title && <h1 className={styles.title}>{title}</h1>}
        {children}
        {loading && <Loader />}
        {!loading &&
          recommendations.length === 0 && (
            <span className={styles.noItems}>{noItemsMessage}</span>
        )}

        {!loading &&
          recommendations.length > 0 &&
          recommendations.map(recommendation => {
            return (
              <Recommendation
                key={`rec-${recommendation.sid}`}
                recommendationId={recommendationId}
                query={query}
                recommendation={recommendation}
                user={user}
                activeHandler={() => activeHandler(recommendation)}
                toggleWishlist={toggleWishlist}
                wishlisted={!!wishlistedIds[recommendation.id]}
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
                  ? [focusLocation[0], focusLocation[1]]
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

Content.defaultProps = {
  noItemsMessage: 'No place matches your preferences'
}

Content.propTypes = {
  noItemsMessage: PropTypes.string
}

export default Content
