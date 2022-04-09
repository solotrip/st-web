import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './content.module.scss'
import Recommendation from './recommendation/index'
import SidePanel from './sidePanel'
import RecommendationDetails from './recommendation-details'
import { Link, useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import _get from 'lodash/get'


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
  error,
  handleScroll,
  initialScrollPos = 0
}) => {
  const history = useHistory()
  const [map, setMap] = useState(null)

  const scrollRef = useRef()

  const openDetails = recommendation => {
    const { queryString } = queryFunction(recommendation)
    history.replace({
      pathname: `${basePath}/r/${recommendation.id}`,
      search: queryString
    })
  }

  const onMapLoad = instance => {
    setMap(instance)
  }

  useEffect(
    () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: detailIndex !== -1 ? 0 : initialScrollPos,
          behavior: 'auto'
        })
      }
    },
    //eslint-disable-next-line
    [detailIndex]
  )

  useEffect(
    () => {
      var lats = []
      var lons = []
      if (detailIndex === -1 && recommendations.length > 0) {
        recommendations.forEach(recommendation => {
          lats.push(recommendation.lat)
          lons.push(recommendation.lon)
        })
        if (map) {
          map.fitBounds([
            [Math.min(...lons), Math.min(...lats)],
            [Math.max(...lons), Math.max(...lats)]
          ])
        }
        return
      }
      if (
        detailIndex !== -1 &&
        recommendations.length > 0 &&
        recommendations[detailIndex] &&
        recommendations[detailIndex]['top_pois'] &&
        recommendations[detailIndex]['top_pois'].filter(poi => poi.poi_has_image === true) &&
        recommendations[detailIndex]['top_pois'].filter(poi => poi.poi_has_image === true).length >
          0
      ) {
        recommendations[detailIndex]['top_pois']
          .filter(poi => poi.poi_has_image === true)
          .forEach(poi => {
            if (poi.location.lat && poi.location.lat <= 90 && poi.location.lat >= -90)
              lats.push(poi.location.lat)

            if (poi.location.lng && poi.location.lng <= 180 && poi.location.lng >= -180)
              lons.push(poi.location.lng)
          })
        if (map) {
          map.fitBounds([
            [Math.min(...lons), Math.min(...lats)],
            [Math.max(...lons), Math.max(...lats)]
          ])
        }
        return
      }
      if (
        detailIndex !== -1 &&
        recommendations.length > 0 &&
        recommendations[detailIndex] &&
        recommendations[detailIndex]['bbox'] &&
        recommendations[detailIndex]['bbox'].length === 4
      ) {
        if (map) {
          map.fitBounds([
            [recommendations[detailIndex]['bbox'][0], recommendations[detailIndex]['bbox'][1]],
            [recommendations[detailIndex]['bbox'][2], recommendations[detailIndex]['bbox'][3]]
          ])
        }
        return
      }
      if (map) {
        map.easeTo({ center: [0, 0], zoom: 2, duration: 1000 })
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recommendations, detailIndex, map]
  )

  if (error)
    return (
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

  const list = !loading && (
    <div ref={scrollRef} className={styles.recommendations} onScroll={handleScroll}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {children}
      {!loading &&
        recommendations.length === 0 && <span className={styles.noItems}>{noItemsMessage}</span>}
      {!loading &&
        recommendations.length > 0 &&
        recommendations.map((recommendation, i) => {
          const { query, queryString } = queryFunction(recommendation)
          return (
            <Recommendation
              key={`rec-${recommendation.sid}`}
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
      {loading && (
        <div className={styles.recommendations}>
          <Recommendation.Skeleton />
        </div>
      )}
      {!loading &&
        (detailIndex === -1 ? (
          list
        ) : (
          <div ref={scrollRef} onScroll={handleScroll} className={styles.recommendationDetails}>
            <RecommendationDetails
              recommendation={recommendations[detailIndex]}
              toggleWishlist={toggleWishlist}
              wishlisted={!!wishlistedIds[recommendations[detailIndex].id]}
              query={queryFunction(recommendations[detailIndex].query)}
              passports={_get(queryFunction(recommendations[detailIndex]), 'query.passports', [])}
            />
          </div>
        ))}
      {mapEnabled &&
        isBrowser &&
        !loading &&
        recommendations.length > 0 && (
          <SidePanel
            className={styles.sidePanel}
            loading={loading}
            recommendations={recommendations}
            query={queryFunction(recommendations)}
            queryFunction={queryFunction}
            basePath={basePath}
          />
      )}

      {/*(mapEnabled &&
      isBrowser) && (
        <Map
          className={styles.mapbox}
          style={MAPBOX_THEME}
          onStyleLoad={onMapLoad}
          fitBoundsOptions={{ padding: 100, linear: false, maxZoom: 20 }}
          pitch={[30]}
          zoom={[2]}
          maxBounds={[[-180, -80], [180, 80]]}
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
                  <div className={styles.colorStrip}/>
                  <div className={styles.popupContent2}>
                    <div className={styles.popupIndex}> {index + 1}</div>

                    <div
                      className={styles.popupInner}
                    >{recommendation.name}</div>
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
          recommendations[detailIndex]['top_pois'].filter(
            poi => poi.poi_has_image === true
          ) &&
          recommendations[detailIndex]['top_pois']
            .filter(poi => poi.poi_has_image === true)
            .map((poi, poiIndex) => (
            <div key={poi.id}>
              <Popup
                offset={[0, 0]}
                coordinates={{
                  lng: poi.location.lng,
                  lat: poi.location.lat
                }}
              >
                <div className={styles.popupContentNoEvent}>
                  <div className={styles.colorStrip}/>

                  <div className={styles.popupContent2}>
                    <div className={styles.popupIndex}> {poiIndex + 1}</div>

                    <div className={styles.popupInner}>{poi.name}</div>
                  </div>
                </div>
              </Popup>
            </div>
            ))}
        </Map>
      )*/}
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
