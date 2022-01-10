import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './content.module.scss'
import Recommendation from './recommendation/index'
import useThemeState from 'utils/hooks/use-theme-state'
import { MAPBOX_TOKEN } from 'constants/index'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Loader } from 'components'
import RecommendationDetails from './recommendation-details'
import { locationSelector } from '../containers/location/slice'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Map = ReactMapboxGl({
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
  const [appTheme] = useThemeState()
  const history = useHistory()
  //default dark map.
  const [mapboxTheme, setMapboxTheme] = useState(
    'mapbox://styles/naberk/ckxnlqnws136z14qrjz7upcaj'
  )
  const [active, setActive] = useState(null)

  const { activeLocation, locations } = useSelector(locationSelector)

  const [focusLocation, setFocusLocation] = useState([-0.118092, 51.509865])


  const itemsRef = useRef([])

  const activeHandler = param => {
    setActive(param)
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

  if (loading) return <Loader/>

  const list = (<div className={styles.recommendations}>

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

      {detailIndex === -1 ? list : (
        <div className={styles.recommendationDetails}>
          <RecommendationDetails
            recommendation={recommendations[detailIndex]}
            passports={queryFunction(
              recommendations[detailIndex]
            ).query.passports}
          /></div>)
      }

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
                    onClick={() => openDetails(recommendation)}
                    className={styles.popupContent}
                  >
                    <div className={styles.colorStrip}/>
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
