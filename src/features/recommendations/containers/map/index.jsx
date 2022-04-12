import React, { useCallback, useMemo, useState } from 'react'
import { SheetWrapper } from 'components'
import { useSelector } from 'react-redux'

import { recommendationsSelector } from '../../slice'
import qs from 'qs'
import { useQuery } from 'utils/hooks/use-query'
import { useHistory } from 'react-router-dom'

import SvgMap from '../../../../components/svg-map/svgMap'
import styles from './map.module.scss'
let qlat = 0
let qlon = 0
let qname = ''
let destinations = []
let origin = []
let recommendations = []

const MapContainer = () => {
  const {
    loadingRecommendations,
    recommendations: recommendationsObject,
    activeRecommendationId
  } = useSelector(recommendationsSelector)

  const query = useQuery()
  const history = useHistory()

  if (activeRecommendationId !== null) {
    recommendations = recommendationsObject[activeRecommendationId].recommendations
  }

  const onSubmit = () => {
    history.push({
      pathname: '/recommendations',
      search: qs.stringify(query)
    })
  }

  function redirect() {
    history.push({
      pathname: '/browse'
    })
  }

  if (query && query.query && query.query.lat && query.query.lon) {
    qlat = query.query.lat
    qlon = query.query.lon
  }

  if (!loadingRecommendations && recommendations.length > 0) {
    let destinationsMinified = recommendations.map(recommendation => {
      return recommendation.sid
    })

    origin = [
      {
        id: qname,
        title: qname,
        destinations: destinationsMinified,
        geometry: { type: 'Point', coordinates: [qlon, qlat] },
        zoomLevel: 2.1,
        zoomPoint: { longitude: qlon, latitude: qlat }
      }
    ]

    destinations = recommendations.map(recommendation => {
      const recoImage = recommendation.area_has_image
        ? `https://ik.imagekit.io/stmedia/areas/${recommendation.sid}?tr=w-700,h-550`
        : recommendation.events &&
          recommendation.events[0] &&
          recommendation.events[0].images &&
          recommendation.events[0].images[0]
          ? `https://ik.imagekit.io/stmedia/${recommendation.events[0].images[0]}`
          : null
      return {
        qid: recommendation.id,
        id: recommendation.sid,
        title: recommendation.name,
        geometry: { type: 'Point', coordinates: [recommendation.lon, recommendation.lat] },
        pictureSettings: {
          src: recoImage
        }
      }
    })
  }

  return (
    <div className={styles.what}>
      <SheetWrapper disableDrag={true} closable={false}>
        <SheetWrapper.Content>
          {!loadingRecommendations &&
          recommendations.length > 0 &&
          activeRecommendationId !== null ? (
            <div className={styles.container}>
              <SvgMap
                title="svg"
                originCities={origin}
                destinationCities={destinations}
                queryString={query.queryString}
                basePath="recommendations"
                contentType="wishlist"
                DOMroot="chartdiv9"
                detailsOpenable={false}
              />
            </div>
            ) : (
              redirect()
            )}
        </SheetWrapper.Content>
        <SheetWrapper.Footer onClick={onSubmit} text="Close" disabled={false} />
      </SheetWrapper>
    </div>
  )
}

export default MapContainer
