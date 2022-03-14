import React, { useEffect, useRef, useState } from 'react'

import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './content.module.scss'
import Recommendation from './recommendation/index'
import { MAPBOX_TOKEN } from 'constants/index'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import RecommendationDetails from './recommendation-details'
import { Link, useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'

import { navigationSelector } from '../../../components/navigation/slice'

const Map =
  isBrowser &&
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
  error
}) => {
  const { recentItemScrollId } = useSelector(navigationSelector)

  const history = useHistory()
  const [southWest, setSouthWest] = useState([-0.118092, 51.509865])
  const [northEast, setNorthEast] = useState([-0.118092, 51.509865])

  const [mapboxTheme] = useState(
    'mapbox://styles/naberk/ckxnlqnws136z14qrjz7upcaj'
  )

  const itemsRef = useRef([])
  const scrollRef = useRef()
  const listScrollRef = useRef()

  const openDetails = recommendation => {
    const { queryString } = queryFunction(recommendation)
    history.replace({
      pathname: `${basePath}/r/${recommendation.id}`,
      search: queryString
    })
  }

  const scrollToTop = () => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'auto'
      })
    } else {
      if (
        recentItemScrollId &&
        itemsRef &&
        itemsRef.current &&
        itemsRef.current.length > 0 &&
        itemsRef.current.length > recentItemScrollId
      ) {
        if (
          recommendations.length > 0 &&
          itemsRef.current[recentItemScrollId] !== null &&
          itemsRef.current[recentItemScrollId] !== undefined
        ) {
          itemsRef.current[recentItemScrollId].scrollIntoView()
        }
      }
    }
  }

  useEffect(
    () => {
      if (recommendations.length > 0) {
        scrollToTop()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recommendations]
  )


  useEffect(
    () => {
      if (detailIndex === -1 && recommendations.length > 0) {
        let lats = []
        let lons = []
        recommendations.forEach(recommendation => {
          lats.push(recommendation.lat)
          lons.push(recommendation.lon)
        })
        setSouthWest([Math.min(...lons), Math.min(...lats)])
        setNorthEast([Math.max(...lons), Math.max(...lats)])
      }
      if (
        detailIndex !== -1 &&
        recommendations.length > 0 &&
        recommendations[detailIndex] &&
        recommendations[detailIndex]['top_pois'] &&
        recommendations[detailIndex]['top_pois'].length > 0
      ) {
        let lats = []
        let lons = []

        recommendations[detailIndex]['top_pois'].forEach(poi => {
          if (
            poi.location.lat && poi.location.lat <= 90 &&
            poi.location.lat >= -90
          )
            lats.push(poi.location.lat)

          if (
            poi.location.lng && poi.location.lng <= 180 &&
            poi.location.lng >= -180
          )
            lons.push(poi.location.lng)
        })
        setSouthWest([Math.min(...lons), Math.min(...lats)])
        setNorthEast([Math.max(...lons), Math.max(...lats)])
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recommendations]
  )

  if (error) return (
    <div className={styles.error}>
      Ooops! Something went wrong!
      <Link
        to={{
          pathname: '/recommendations'
        }}
        replace
        className="primaryButton"
      >
        Try Again
      </Link>
    </div>
  )

  if (loading) return (
    <div className={styles.recommendations}>
      <Recommendation.Skeleton />
    </div>
  )

  const list = (
    <div ref={listScrollRef} className={styles.recommendations}>
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
              toggleWishlist={toggleWishlist}
              wishlisted={!!wishlistedIds[recommendation.id]}
              basePath={basePath}
              index={i}
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
        <div ref={scrollRef} className={styles.recommendationDetails}>
          <RecommendationDetails
            recommendation={recommendations[detailIndex]}
            toggleWishlist={toggleWishlist}
            wishlisted={!!wishlistedIds[recommendations[detailIndex].id]}
            query={queryFunction(recommendations[detailIndex].query)}
            passports={
              queryFunction(recommendations[detailIndex]).query.passports
            }
          />
        </div>
      )}

      {mapEnabled &&
        isBrowser &&
        recommendations.length > 0 && (
          <div className={styles.mapbox}>
            <Map
              style={mapboxTheme}
              containerStyle={{
                height: '100%',
                width: '100%'
              }}
              fitBounds={[southWest, northEast]}
              fitBoundsOptions={{ padding: 100 }}
              pitch={[30]}
            >
              {!loading &&
                recommendations.length > 0 &&
                detailIndex === -1 &&
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
              {!loading &&
                recommendations.length > 0 &&
                detailIndex !== -1 &&
                recommendations[detailIndex] &&
                recommendations[detailIndex]['top_pois'] &&
                recommendations[detailIndex]['top_pois'].map(
                  (poi, poiIndex) => (
                    <div key={poi.id}>
                      <Popup
                        offset={[0, 0]}
                        coordinates={{
                          lng: poi.location.lng,
                          lat: poi.location.lat
                        }}
                      >
                        <div className={styles.popupContentNoEvent}>
                          <div className={styles.colorStrip} />

                          <div className={styles.popupContent2}>
                            <div className={styles.popupIndex}>
                              {' '}
                              {poiIndex + 1}
                            </div>

                            <div className={styles.popupInner}>{poi.name}</div>
                          </div>
                        </div>
                      </Popup>
                    </div>
                  )
                )}
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
