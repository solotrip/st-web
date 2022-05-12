import React from 'react'
import _get from 'lodash/get'
import SvgMap from 'components/svg-map/svgMap'
import { useSelector } from 'react-redux'
import { locationSelector } from '../../containers/location/slice'
import useThemeState from 'utils/hooks/use-theme-state'
import styles from '../sidePanel.module.scss'
import MapSkeleton from 'components/svg-map/mapSkeleton'
import { getImagePath, SUPPORTED_SIZES } from '../../../../utils/image'

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
      ? getImagePath(recommendation.sid, SUPPORTED_SIZES['720'], 'areas/')
      : _get(recommendation, 'events[0].images[0]')
        ? getImagePath(recommendation.events[0].images[0], SUPPORTED_SIZES['720'])
        : appTheme === 'light'
          ? getImagePath('map-pin-light')
          : getImagePath('map-pin-dark')
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
      {loading && <MapSkeleton/>}
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
