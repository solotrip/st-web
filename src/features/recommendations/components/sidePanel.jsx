import React, { useState, useEffect } from 'react'

import styles from './sidePanel.module.scss'
import SvgMap from '../../../components/svg-map/svgMap'
import Chart from '../../../components/chart/chart'
import Dropdown from 'components/dropdown'
import { OPTIONS as options, MAIN_OPTIONS as mainOptions } from 'constants/binder'

let value = null
let recommendationProc = []
let qlat = -74
let qlon = 40.43

const SidePanel = ({ recommendations, loading, query, queryFunction, basePath }) => {
  const [selectedOption, setSelectedOption] = useState({
    value: 'acommodation',
    label: 'Acommodation'
  })

  if (query.query && query.query.lat && query.query.lon) {
    qlat = query.query.lat
    qlon = query.query.lon
  }
  const active = options.find(o => o.option === selectedOption.value)

  const activeOptions = active.suboptions

  const [selectedSuboption, setSelectedSuboption] = useState(activeOptions[0])

  const optionChange = event => {
    setSelectedOption(event)
  }
  const suboptionChange = event => {
    setSelectedSuboption(event)
  }

  let destinationsMinified = recommendations.map(recommendation => {
    return recommendation.sid
  })

  let origin = [
    {
      id: 'istanbul',
      title: 'Istanbul',
      destinations: destinationsMinified,
      geometry: { type: 'Point', coordinates: [qlon, qlat] },
      zoomLevel: 4.74,
      zoomPoint: { longitude: 28.949659999999998, latitude: 41.01384 }
    }
  ]

  let destinations = recommendations.map(recommendation => {
    return {
      qid: recommendation.id,
      id: recommendation.sid,
      title: recommendation.name,
      geometry: { type: 'Point', coordinates: [recommendation.lon, recommendation.lat] }
    }
  })

  useEffect(
    () => {
      recommendationProc = recommendations.map(recommendation => {
        if (selectedSuboption.value === 'min-hotel-prices') {
          value = recommendation.hotel_price_min
        } else if (selectedSuboption.value === 'max-hotel-prices') {
          value = recommendation.hotel_price_max
        } else if (selectedSuboption.value === 'min-hostel-prices') {
          value = recommendation.hostel_price_min
        } else if (selectedSuboption.value === 'max-hostel-prices') {
          value = recommendation.hostel_price_max
        } else if (selectedSuboption.value === 'min-airbnb-prices') {
          value = recommendation.vacation_rental_price_min
        } else if (selectedSuboption.value === 'max-airbnb-prices') {
          value = recommendation.vacation_rental_price_max
        } else if (selectedSuboption.value === 'min-temperature') {
          if (recommendation.climate) {
            value = recommendation.climate.t_min
          } else {
            value = 0
          }
        } else if (selectedSuboption.value === 'max-temperature') {
          if (recommendation.climate) {
            value = recommendation.climate.t_max
          } else {
            value = 0
          }
        } else if (selectedSuboption.value === 'avg-temperature') {
          if (recommendation.climate) {
            value = recommendation.climate.t_avg
          } else {
            value = 0
          }
        } else if (selectedSuboption.value === 'humidity') {
          if (recommendation.climate) {
            value = recommendation.climate.humidity
          } else {
            value = 0
          }
        } else if (selectedSuboption.value === 'w-speed') {
          if (recommendation.climate) {
            value = recommendation.climate.w_speed
          } else {
            value = 0
          }
        } else if (selectedSuboption.value === 'rainy-days') {
          if (recommendation.climate) {
            value = recommendation.climate.rainy_days
          } else {
            value = 0
          }
        } else if (selectedSuboption.value === 'distance') {
          value = recommendation.distance
        } else if (selectedSuboption.value === 'duration') {
          value = recommendation.duration
        } else if (selectedSuboption.value === 'quick_trip') {
          if (recommendation.tripdays) {
            value = recommendation.tripdays.min_days
          } else {
            value = 0
          }
        } else if (selectedSuboption.value === 'ideal_trip') {
          if (recommendation.tripdays) {
            value = recommendation.tripdays.ideal_days
          } else {
            value = 0
          }
        } else if (selectedSuboption.value === 'long_trip') {
          if (recommendation.tripdays) {
            value = recommendation.tripdays.max_days
          } else {
            value = 0
          }
        }

        const recoImage = recommendation.area_has_image
          ? `https://ik.imagekit.io/stmedia/areas/${recommendation.sid}?tr=w-700,h-550`
          : recommendation.events &&
            recommendation.events[0] &&
            recommendation.events[0].images &&
            recommendation.events[0].images[0]
            ? `https://ik.imagekit.io/stmedia/${recommendation.events[0].images[0]}`
            : null
        return {
          name: recommendation.name,
          value: value,
          bulletSettings: {
            src: recoImage
          }
        }
      })
    },
    [selectedSuboption, value]
  )

  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <SvgMap
          title="svg"
          originCities={origin}
          destinationCities={destinations}
          queryString={query.queryString}
          basePath={basePath}
        />
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.select}>
          <div className={styles.selectItem}>
            <Dropdown options={mainOptions} onSelect={optionChange} />
          </div>
          <div className={styles.selectItem}>
            <Dropdown options={activeOptions} onSelect={suboptionChange} />
          </div>
        </div>
        <div className={styles.lowerContainer}>
          {!loading &&
            recommendations &&
            recommendations.length > 0 && <Chart data={recommendationProc} />}
        </div>
      </div>
    </div>
  )
}

export default SidePanel
