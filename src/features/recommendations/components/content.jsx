import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './content.module.scss'
import Recommendation from './recommendation/index'
import { MAPBOX_TOKEN } from 'constants/index'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Loader } from 'components'
import RecommendationDetails from './recommendation-details'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
const Map =  isBrowser &&
  ReactMapboxGl({
    accessToken: MAPBOX_TOKEN
  })
const Content = ({
  recommendations,
  queryFunction,
  user,
  mapEnabled = true,
  toggleWishlist,
  wishlistedIds,
  loading,
  noItemsMessage,
  title,
  children,
  detailIndex,
  basePath,
  resetFilters
}) => {
  const history = useHistory()
  const [focusLocation, setFocusLocation] = useState([-0.118092, 51.509865])
  const [mapboxTheme] = useState(
    'mapbox://styles/naberk/ckxnlqnws136z14qrjz7upcaj'
  )

  const itemsRef = useRef([])

  const activeHandler = recommendation => {
    setFocusLocation([recommendation.lon, recommendation.lat])
  }

  const openDetails = recommendation => {
    const { queryString } = queryFunction(recommendation)
    history.replace({
      pathname: `${basePath}/r/${recommendation.id}`,
      search: queryString
    })
    setFocusLocation([recommendation.lon, recommendation.lat])
  }

  useEffect(
    () => {
      itemsRef.current = itemsRef.current.slice(0, recommendations.length)
      if (recommendations.length > 0) {
        activeHandler(recommendations[0])
      }
    },
    [recommendations]
  )

  useEffect(
    () => {
      const { query } = queryFunction()
      if (query && query.lon && query.lat) {
        setFocusLocation([parseFloat(query.lon), parseFloat(query.lat)])
      }
    },
    [queryFunction]
  )

  if (loading) return <Loader />

  const list = (
    <div className={styles.recommendations}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {children}
      {!loading &&
        recommendations.length === 0 && (
          <span className={styles.noItems}>{noItemsMessage}</span>
      )}

      {!loading &&
        recommendations.length > 0 &&
        recommendations.map((recommendation, i) => {
          const { query, queryString } = queryFunction(recommendation)
          return (
            <Recommendation
              key={`rec-${recommendation.sid}`}
              refHolder={el => (itemsRef.current[i] = el)}
              query={query}
              queryString={queryString}
              recommendation={recommendation}
              user={user}
              activeHandler={() => activeHandler(recommendation)}
              toggleWishlist={toggleWishlist}
              wishlisted={!!wishlistedIds[recommendation.id]}
              basePath={basePath}
            />
          )
        })}
    </div>
  )

  return (
    <div className={styles.page}>
      {detailIndex === -1 ? (
        list
      ) : (
        <div className={styles.recommendationDetails}>
          <RecommendationDetails
            recommendation={recommendations[detailIndex]}
            passports={
              queryFunction(recommendations[detailIndex]).query.passports
            }
          />
        </div>
      )}

      {mapEnabled &&
        isBrowser && (
          <div className={styles.mapbox}>
            <Map
              style={mapboxTheme}
              containerStyle={{
                height: '100vh',
                width: '100%'
              }}
              center={
                detailIndex === -1
                  ? [focusLocation[0], focusLocation[1]]
                  : [
                    recommendations[detailIndex].lon,
                    recommendations[detailIndex].lat
                  ]
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
                      offset={[0, 0]}
                      coordinates={{
                        lng: recommendation.lon,
                        lat: recommendation.lat
                      }}
                    >
                      <button
                        onClick={() => openDetails(recommendation)}
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
