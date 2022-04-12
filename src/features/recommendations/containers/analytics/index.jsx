import React, { useCallback, useMemo, useState, useEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import { SheetWrapper } from 'components'
import { useSelector } from 'react-redux'
import { OPTIONS as options, TABLE_CATEGORIES as valuesY } from 'constants/binder'
import { recommendationsSelector } from '../../slice'
import qs from 'qs'
import { useQuery } from 'utils/hooks/use-query'
import { useHistory } from 'react-router-dom'

import Dropdown from 'components/dropdown'
import Table from 'components/table/table'
import Chart from 'components/chart/chart'

import SvgMap from '../../../../components/svg-map/svgMap'
import styles from './analytics.module.scss'
let qlat = 0
let qlon = 0
let qname = ''
let destinations = []
let origin = []
let recommendations = []
let recommendationProc = []
let min = null
let max = null
let tableData = []
let valuesX = []

const AnalyticsContainer = () => {
  const {
    loadingRecommendations,
    recommendations: recommendationsObject,
    activeRecommendationId
  } = useSelector(recommendationsSelector)

  const [selectedOption, setSelectedOption] = useState({
    value: 'hotel-prices',
    label: 'Hotel Prices'
  })

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

  const optionChange = event => {
    setSelectedOption(event)
  }

  function redirect() {
    history.push({
      pathname: '/browse'
    })
  }

  function prepare() {
    recommendationProc = recommendations.map(recommendation => {
      if (selectedOption.value === 'hotel-prices') {
        min = recommendation.hotel_price_min
        max = recommendation.hotel_price_max
      } else if (selectedOption.value === 'hostel-prices') {
        min = recommendation.hostel_price_min
        max = recommendation.hostel_price_max
      } else if (selectedOption.value === 'airbnb-prices') {
        min = recommendation.vacation_rental_price_min
        max = recommendation.vacation_rental_price_max
      } else if (selectedOption.value === 'temperature' && recommendation.climate) {
        min = recommendation.climate.t_min
        max = recommendation.climate.t_max
      } else if (selectedOption.value === 'trip-days' && recommendation.tripdays) {
        min = recommendation.tripdays.min_days
        max = recommendation.tripdays.min_days
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
        category: selectedOption.label,
        min: min,
        max: max,
        bulletSettings: {
          src: recoImage
        }
      }
    })

    //Process Cost of living with colors.
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

    valuesX = recommendations.map(recommendation => {
      return {
        category: recommendation.name
      }
    })

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

  var colors = {
    critical: am5.color(0xee77a2),
    bad: am5.color(0xfcbb86),
    medium: am5.color(0xdae085),
    good: am5.color(0x9ae4a7),
    verygood: am5.color(0x69f084)
  }

  useEffect(() => {
    recommendationProc = recommendations.map(recommendation => {
      if (selectedOption.value === 'hotel-prices') {
        min = recommendation.hotel_price_min
        max = recommendation.hotel_price_max
      } else if (selectedOption.value === 'hostel-prices') {
        min = recommendation.hostel_price_min
        max = recommendation.hostel_price_max
      } else if (selectedOption.value === 'airbnb-prices') {
        min = recommendation.vacation_rental_price_min
        max = recommendation.vacation_rental_price_max
      } else if (selectedOption.value === 'temperature' && recommendation.climate) {
        min = recommendation.climate.t_min
        max = recommendation.climate.t_max
      } else if (selectedOption.value === 'trip-days' && recommendation.tripdays) {
        min = recommendation.tripdays.min_days
        max = recommendation.tripdays.min_days
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
        category: selectedOption.label,
        min: min,
        max: max,
        bulletSettings: {
          src: recoImage
        }
      }
    })

    const td = recommendations.map(recommendation => {
      if (recommendation['cost_of_living_labels']) {
        Object.keys(recommendation['cost_of_living_labels']).forEach((key, i) => {
          let x = recommendation.name
          let y = null
          let columnSettings = {}
          let value = null

          let cost = Object.values(recommendation['cost_of_living_labels'])[i]
          value = cost
          if (key === 'meal_cheap_restaurant_cost_label') {
            y = 'Meal at Cheap Restaurant'
            if (cost === '$0 - $5') {
              columnSettings = {
                fill: colors.verygood
              }
            } else if (cost === '$5 - $10') {
              columnSettings = {
                fill: colors.good
              }
            } else if (cost === '$10 - $15') {
              columnSettings = {
                fill: colors.medium
              }
            } else if (cost === '$15 - $20') {
              columnSettings = {
                fill: colors.bad
              }
            } else if (cost === '$25 +') {
              columnSettings = {
                fill: colors.critical
              }
            }
          } else if (key === 'meal_mid_range_restaurant_cost_label') {
            y = 'Meal at Luxury Restaurant'
            if (cost === '$10 - $20' || cost === '$20 - $30') {
              columnSettings = {
                fill: colors.verygood
              }
            } else if (cost === '$30 - $40' || cost === '$40 - $50') {
              columnSettings = {
                fill: colors.good
              }
            } else if (cost === '$50 - $60') {
              columnSettings = {
                fill: colors.medium
              }
            } else if (cost === '$60 - $70') {
              columnSettings = {
                fill: colors.bad
              }
            } else if (cost === '$80 +' || cost === '$70 - $80') {
              columnSettings = {
                fill: colors.critical
              }
            }
          } else if (key === 'mcmeal_at_mcdonalds_cost_label') {
            y = 'McDonalds Menu'
            if (cost === '$0 - $5') {
              columnSettings = {
                fill: colors.verygood
              }
            } else if (cost === '$5 - $10') {
              columnSettings = {
                fill: colors.medium
              }
            } else if (cost === '$10 - $15') {
              columnSettings = {
                fill: colors.bad
              }
            } else if (cost === '$15 +') {
              columnSettings = {
                fill: colors.critical
              }
            }
          } else if (key === 'public_transport_cost_label') {
            y = 'Public Transport'
            if (cost === '$0 - $0.5') {
              columnSettings = {
                fill: colors.verygood
              }
            } else if (cost === '$$0.5 - $1' || cost === '$1 - $1.5') {
              columnSettings = {
                fill: colors.good
              }
            } else if (cost === '$1.5 - $2.5') {
              columnSettings = {
                fill: colors.medium
              }
            } else if (cost === '$$2.5 - $3.0') {
              columnSettings = {
                fill: colors.bad
              }
            } else if (cost === '$3.0 - $3.5') {
              columnSettings = {
                fill: colors.critical
              }
            }
          } else if (key === 'beer_at_restaurant_cost_label') {
            y = 'Beer at Restaurant'
            if (cost === '$0 - $2.5') {
              columnSettings = {
                fill: colors.verygood
              }
            } else if (cost === '$2.5 - $4') {
              columnSettings = {
                fill: colors.good
              }
            } else if (cost === '$4 - $5') {
              columnSettings = {
                fill: colors.medium
              }
            } else if (cost === '$5 - $6') {
              columnSettings = {
                fill: colors.bad
              }
            } else if (cost === '$6 - $7' || cost === '$7 +') {
              columnSettings = {
                fill: colors.critical
              }
            }
          } else if (key === 'prepaid_card_cost_label') {
            y = 'Prepaid Card'
            if (cost === '$0 - $0.2') {
              columnSettings = {
                fill: colors.verygood
              }
            } else if (cost === '$0.3 - $0.4') {
              columnSettings = {
                fill: colors.critical
              }
            } else if (cost === '$0.2 - $0.3') {
              columnSettings = {
                fill: colors.medium
              }
            }
          } else if (key === 'cinema_ticket_cost_label') {
            y = 'Cinema Ticket'
            if (cost === '$0 - $5') {
              columnSettings = {
                fill: colors.verygood
              }
            } else if (cost === '$5 - $7') {
              columnSettings = {
                fill: colors.good
              }
            } else if (cost === '$7 - $10') {
              columnSettings = {
                fill: colors.medium
              }
            } else if (cost === '$10 - $15') {
              columnSettings = {
                fill: colors.bad
              }
            } else if (cost === '$6 - $7' || cost === '$15 +') {
              columnSettings = {
                fill: colors.critical
              }
            }
          } else if (key === 'taxi_1km_cost_label') {
            y = 'Taxi 1km'
            if (cost === '$0 - $0.5') {
              columnSettings = {
                fill: colors.verygood
              }
            } else if (cost === '$0.5 - $1') {
              columnSettings = {
                fill: colors.good
              }
            } else if (cost === '$1 - $1.5') {
              columnSettings = {
                fill: colors.medium
              }
            } else if (cost === '$1.5 - $2') {
              columnSettings = {
                fill: colors.bad
              }
            } else if (cost === '$2.5 +' || cost === '$2 - $2.5') {
              columnSettings = {
                fill: colors.critical
              }
            }
          }
          tableData.push({ x: x, y: y, columnSettings: columnSettings, value: value })
        })
      }
    })
  }, [])

  return (
    <div className={styles.what}>
      <SheetWrapper disableDrag={true} closable={false}>
        {prepare()}
        <SheetWrapper.Content>
          {!loadingRecommendations &&
          recommendations.length > 0 &&
          activeRecommendationId !== null ? (
            <div className={styles.container}>
              <div className={styles.select}>
                <div className={styles.selectItem}>
                  <Dropdown options={options} onSelect={optionChange} placeholder="Hotel Prices" />
                </div>
              </div>
              <div className={styles.lowerContainer}>
                {!loadingRecommendations &&
                  recommendations &&
                  recommendations.length > 0 &&
                  activeRecommendationId !== null &&
                  selectedOption.value !== 'cost-of-living' && (
                    <Chart
                      data={recommendationProc}
                      type={selectedOption.value}
                      DOMroot="chartdiv12"
                    />
                )}
                {!loadingRecommendations &&
                  recommendations &&
                  recommendations.length > 0 &&
                  selectedOption.value === 'cost-of-living' && (
                    <Table
                      data={tableData}
                      valuesY={valuesY}
                      valuesX={valuesX}
                      colors={colors}
                      type={selectedOption.value}
                      DOMroot="chartdiv11"
                    />
                )}
              </div>
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

export default AnalyticsContainer