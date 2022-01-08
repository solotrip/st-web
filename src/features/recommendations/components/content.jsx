import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './content.module.scss'
import Recommendation from './recommendation/index'
import useThemeState from 'utils/hooks/use-theme-state'
import { MAPBOX_TOKEN } from 'constants/index'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
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

  const itemsRef = useRef([])

  const activeHandler = param => {
    setActive(param)
  }

  const scrollToCard = (index, name) => {
    itemsRef.current[index].scrollIntoView({ block: 'end', behavior: 'smooth' })
  }

  const resetFilters = () => {
    delete query.filters
    setQueryHolder(qs.stringify(query))
  }

  useEffect(
    () => {
      itemsRef.current = itemsRef.current.slice(0, recommendations.length)
    },
    [recommendations]
  )

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
          recommendations.map((recommendation, i) => {
            return (
              <Recommendation
                key={`rec-${recommendation.sid}`}
                refHolder={el => (itemsRef.current[i] = el)}
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
            {!loading &&
              recommendations.length > 0 &&
              recommendations.map((recommendation, index) => (
                <div key={recommendation.lon}>
                  <Marker
                    coordinates={{
                      lng: recommendation.lon,
                      lat: recommendation.lat
                    }}
                    className={styles.mapMarker}
                  />

                  <Popup
                    offset={(0, 0)}
                    coordinates={{
                      lng: recommendation.lon,
                      lat: recommendation.lat
                    }}
                  >
                    <button
                      onClick={() => scrollToCard(index, recommendation.name)}
                      className={styles.popupContent}
                    >
                      <div className={styles.colorStrip} />
                      <div className={styles.popupContent2}>
                        <div className={styles.popupIndex}> {index + 1}</div>

                        <div className={styles.popupInner}>
                          {recommendation.name}
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

Content.defaultProps = {
  noItemsMessage: 'No place matches your preferences'
}

Content.propTypes = {
  noItemsMessage: PropTypes.string
}

export default Content
