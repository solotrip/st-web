import React from 'react'
import _get from 'lodash/get'
import SvgMap from 'components/svg-map/svgMap'
import { useSelector } from 'react-redux'
import { locationSelector } from '../../containers/location/slice'
import useThemeState from 'utils/hooks/use-theme-state'
import styles from '../sidePanel.module.scss'
import MapSkeleton from 'components/svg-map/mapSkeleton'

const AnalyticsMap = ({
  recommendations = [],
  query,
  loading,
  halfHeight,
  id = 'map',
  ignoreBoundaries = false
}) => {
  const { activeLocation, locations } = useSelector(locationSelector)
  const locationDetails = locations[activeLocation]
  const [appTheme] = useThemeState()
  const qlat =
    locationDetails && locationDetails.lat
      ? _get(query, 'lat', locationDetails.lat)
      : 41.013
  const qlon =
    locationDetails && locationDetails.lon
      ? _get(query, 'lon', locationDetails.lat)
      : 28.94
  const qname = _get(locationDetails, 'name', '')

  const origin = [
    {
      id: qname,
      title: qname,
      destinations: recommendations.map(recommendation => recommendation.sid),
      geometry: { type: 'Point', coordinates: [qlon, qlat] },
      zoomLevel: 2.1,
      zoomPoint: { longitude: qlon, latitude: qlat }
    }
  ]

  const destinations = recommendations.map(recommendation => {
    const image = recommendation.area_has_image
      ? `https://ik.imagekit.io/stmedia/areas/${recommendation.sid}?tr=w-700,h-550`
      : _get(recommendation, 'events[0].images[0]')
      ? `https://ik.imagekit.io/stmedia/${recommendation.events[0].images[0]}`
      : appTheme === 'light'
      ? 'https://ik.imagekit.io/stmedia/map-pin2-light_LQDrupJW3.png'
      : 'https://ik.imagekit.io/stmedia/map-pin2-dark_r8Jt8Y_ZDV.png'
    return {
      qid: recommendation.id,
      id: recommendation.sid,
      link: recommendation.link,
      title: recommendation.name,
      geometry: {
        type: 'Point',
        coordinates: [recommendation.lon, recommendation.lat]
      },
      pictureSettings: {
        src: image
      }
    }
  })

  return (
    <div className={styles.upperContainer}>
      {loading && <MapSkeleton />}
      {!loading && (
        <SvgMap
          DOMroot={id}
          originCities={origin}
          destinationCities={destinations}
          halfHeight={halfHeight}
          ignoreBoundaries={ignoreBoundaries}
        />
      )}
    </div>
  )
}

export default AnalyticsMap
