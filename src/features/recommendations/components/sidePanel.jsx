import React, { useState, useEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'

import styles from './sidePanel.module.scss'
import SvgMap from '../../../components/svg-map/svgMap'
import Chart from '../../../components/chart/chart'
import Dropdown from 'components/dropdown'
import Table from 'components/table/table'
import {
  OPTIONS as options,
  TABLE_CATEGORIES as valuesY,
  RESTRICTION_CATEGORIES
} from 'constants/binder'
import { useSelector } from 'react-redux'
import { locationSelector } from '../containers/location/slice'

let value = null
let min = null
let max = null
let category = null
let recommendationProc = []
let tableData = []
let restrictionData = []
let qlat = -74
let qlon = 40.43
let qname = ''

let destinationsMinified = []
let valuesX = []
let origin = []
let destinations = []
const SidePanel = ({
  recommendations,
  loading,
  query,
  queryFunction,
  basePath,
  contentType = 'recommendations'
}) => {
  const { activeLocation, locations } = useSelector(locationSelector)

  const locationDetails = locations[activeLocation]

  if (locationDetails && locationDetails.name) {
    qname = locationDetails.name
  }

  const [selectedOption, setSelectedOption] = useState({
    value: 'hotel-prices',
    label: 'Hotel Prices'
  })

  if (
    contentType === 'recommendations' &&
    query &&
    query.query &&
    query.query.lat &&
    query.query.lon
  ) {
    qlat = query.query.lat
    qlon = query.query.lon
  } else if (contentType === 'notifications') {
    qlat = locationDetails.lat
    qlon = locationDetails.lon
  }

  const optionChange = event => {
    setSelectedOption(event)
  }

  destinationsMinified = recommendations.map(recommendation => {
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
  if (contentType === 'notifications') {
    let notifications = recommendations

    destinationsMinified = notifications.map(notification => {
      return notification.content.new.sid
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

    valuesX = notifications.map(notification => {
      return {
        category: notification.content.new.name
      }
    })

    destinations = notifications.map(notification => {
      const inner = notification.content.new
      const notificationImage = inner.area_has_image
        ? `https://ik.imagekit.io/stmedia/areas/${inner.sid}?tr=w-700,h-550`
        : inner.events && inner.events[0] && inner.events[0].images && inner.events[0].images[0]
          ? `https://ik.imagekit.io/stmedia/${inner.events[0].images[0]}`
          : null

      return {
        qid: inner.id,
        id: inner.sid,
        title: inner.name,
        geometry: { type: 'Point', coordinates: [inner.lon, inner.lat] },
        pictureSettings: {
          src: notificationImage
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

  var restrictionColors = {
    closed: am5.color(0xee77a2),
    restricted: am5.color(0xdae085),
    open: am5.color(0x69f084)
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

  useEffect(() => {
    if (contentType === 'recommendations') {
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

      const rd = recommendations.map(recommendation => {
        if (recommendation['country'] && recommendation['country']['restrictions']) {
          Object.keys(recommendation['country']['restrictions']).forEach((key, i) => {
            let x = recommendation.name
            let y = null
            let columnSettings = {}
            let value = null

            let restriction = Object.values(recommendation['country']['restrictions'])[i]

            value = restriction

            if (key === 'restaurant_status') {
              y = 'Restaurant Status'
              if (restriction === 'RESTRICTIONS') {
                columnSettings = {
                  fill: restrictionColors.restricted
                }
              } else if (restriction === 'OPEN') {
                columnSettings = {
                  fill: restrictionColors.open
                }
              } else if (restriction === 'CLOSED') {
                columnSettings = {
                  fill: restrictionColors.closed
                }
              }
            } else if (key === 'bar_status') {
              y = 'Bar Status'
              if (restriction === 'RESTRICTIONS') {
                columnSettings = {
                  fill: restrictionColors.restricted
                }
              } else if (restriction === 'OPEN') {
                columnSettings = {
                  fill: restrictionColors.open
                }
              } else if (restriction === 'CLOSED') {
                columnSettings = {
                  fill: restrictionColors.closed
                }
              }
            } else if (key === 'mask_status') {
              y = 'Mask Status'
              if (restriction === 'RECOMMENDED') {
                columnSettings = {
                  fill: restrictionColors.restricted
                }
              } else if (restriction === 'NOT REQUIRED') {
                columnSettings = {
                  fill: restrictionColors.open
                }
              } else if (restriction === 'REQUIRED') {
                columnSettings = {
                  fill: restrictionColors.closed
                }
              }
            } else if (key === 'arrival_quarantine_status') {
              y = 'Arrival Quarantine'
              if (restriction === false) {
                columnSettings = {
                  fill: restrictionColors.open
                }
              } else if (restriction === true) {
                columnSettings = {
                  fill: restrictionColors.closed
                }
              }
            } else if (key === 'open_for_vaccinated') {
              y = 'Open for Vaccinated'
              if (restriction === false) {
                columnSettings = {
                  fill: restrictionColors.closed
                }
              } else if (restriction === true) {
                columnSettings = {
                  fill: restrictionColors.open
                }
              }
            } else if (key === 'vaccinated_arrival_test_required') {
              y = 'Test for Vaccinated'
              if (restriction === false) {
                columnSettings = {
                  fill: restrictionColors.open
                }
              } else if (restriction === true) {
                columnSettings = {
                  fill: restrictionColors.closed
                }
              }
            } else if (key === 'vaccinated_arrival_quarantine_required') {
              y = 'Quarantine for Vaccinated'
              if (restriction === false) {
                columnSettings = {
                  fill: restrictionColors.open
                }
              } else if (restriction === true) {
                columnSettings = {
                  fill: restrictionColors.closed
                }
              }
            } else if (key === 'arrival_test_required') {
              y = 'Required Test'
              if (restriction === false) {
                columnSettings = {
                  fill: restrictionColors.open
                }
              } else if (restriction === true) {
                columnSettings = {
                  fill: restrictionColors.closed
                }
              }
            } else if (key === 'arrival_quarantine_required') {
              y = 'Required Quarantine'
              if (restriction === false) {
                columnSettings = {
                  fill: restrictionColors.open
                }
              } else if (restriction === true) {
                columnSettings = {
                  fill: restrictionColors.closed
                }
              }
            } else if (key === 'Public Transport') {
              y = 'Public Transport'
              if (restriction === 'Partial Restrictions') {
                columnSettings = {
                  fill: restrictionColors.restricted
                }
              } else if (restriction === 'Operating') {
                columnSettings = {
                  fill: restrictionColors.open
                }
              } else if (restriction === 'Closed') {
                columnSettings = {
                  fill: restrictionColors.closed
                }
              }
            } else if (key === 'Dining and Bars') {
              y = 'Dining and Bars'
              if (restriction === 'Partially Open') {
                columnSettings = {
                  fill: restrictionColors.restricted
                }
              } else if (restriction === 'Open') {
                columnSettings = {
                  fill: restrictionColors.open
                }
              } else if (restriction === 'Closed') {
                columnSettings = {
                  fill: restrictionColors.closed
                }
              }
            } else if (key === 'Tourist Attractions') {
              y = 'Tourist Attractions'
              if (restriction === 'Partially Open') {
                columnSettings = {
                  fill: restrictionColors.restricted
                }
              } else if (restriction === 'Open') {
                columnSettings = {
                  fill: restrictionColors.open
                }
              } else if (restriction === 'Closed') {
                columnSettings = {
                  fill: restrictionColors.closed
                }
              }
            }
            restrictionData.push({ x: x, y: y, columnSettings: columnSettings, value: value })
          })
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
    }
  }, [])

  return (
    <div className={styles.container}>
      {contentType === 'recommendations' && prepare()}

      <div className={styles.upperContainer}>
        {!loading &&
          recommendations &&
          recommendations.length > 0 && (
            <SvgMap
              title="svg"
              originCities={origin}
              destinationCities={destinations}
              queryString={query.queryString}
              basePath={basePath}
              contentType={contentType}
            />
        )}
      </div>
      {contentType === 'recommendations' && (
        <div className={styles.middleContainer}>
          <div className={styles.select}>
            <div className={styles.selectItem}>
              <Dropdown options={options} onSelect={optionChange} placeholder="Hotel Prices" />
            </div>
          </div>
          <div className={styles.lowerContainer}>
            {!loading &&
              recommendations &&
              recommendations.length > 0 &&
              selectedOption.value !== 'cost-of-living' &&
              selectedOption.value !== 'restrictions' && (
                <Chart data={recommendationProc} type={selectedOption.value} />
            )}
            {!loading &&
              recommendations &&
              recommendations.length > 0 &&
              selectedOption.value === 'cost-of-living' && (
                <Table
                  data={tableData}
                  valuesY={valuesY}
                  valuesX={valuesX}
                  colors={colors}
                  type={selectedOption.value}
                  showContent={true}
                />
            )}
            {!loading &&
              recommendations &&
              recommendations.length > 0 &&
              selectedOption.value === 'restrictions' && (
                <Table
                  data={restrictionData}
                  valuesY={RESTRICTION_CATEGORIES}
                  valuesX={valuesX}
                  colors={restrictionColors}
                  type={selectedOption.value}
                  showContent={false}
                />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SidePanel
