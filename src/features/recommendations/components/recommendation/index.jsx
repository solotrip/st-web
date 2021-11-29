import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './recommendation.module.scss'
import { HorizontalScroll, Image } from 'components'
import { ReactComponent as Cloud } from 'assets/images/icons/cloud.svg'
import { ReactComponent as Home } from 'assets/images/icons/home.svg'
import { ReactComponent as Passport } from 'assets/images/icons/passport.svg'
import { ReactComponent as CovidTest } from 'assets/images/icons/test.svg'
// eslint-disable-next-line max-len
import { ReactComponent as Attraction } from 'assets/images/icons/attraction.svg'
// eslint-disable-next-line max-len
import { ReactComponent as Quarantine } from 'assets/images/icons/quarantine.svg'

import { ReactComponent as Plane } from 'assets/images/icons/plane.svg'
import { formatAsMonthDay } from 'utils/date'

import { passportSelector } from '../../containers/passport-countries/slice'

let visaText = ''
let visaSubText = ''
let vaccinatedTestText = ''
let vaccinatedQuarantineText = ''
let unvaccinatedTestText = ''
let unvaccinatedQuarantineText = ''
let restaurantText = ''
let attractionsText = ''

const Recommendation = ({
  recommendation,
  recommendationId,
  query,
  activeHandler,
  wishlisted,
  toggleWishlist
}) => {
  const {
    sid,
    country,
    name,
    startDate,
    endDate,
    events,
    id,
    hotel_price: hotelPrice,
    hostelPrice,
    rentalPrice,

    fastestFlightCost,
    cheapestFlightCost,
    bestFlightCost,
    top_pois: topPois,
    climate = {}
  } = recommendation

  const { t_min: minTemperature, t_max: maxTemperature } = climate

  const { passports } = useSelector(passportSelector)

  function recommendationProcessor() {
    if (recommendation !== undefined) {
      let approvedPassports = []

      //check visa status.
      const checkVisaFreeFor = passport => {
        if (recommendation.country['visa_free_for'].includes(passport.value)) {
          approvedPassports.push(passport)
        }
        return recommendation.country['visa_free_for'].includes(passport.value)
      }

      const checkVisaOnArrivalFor = passport => {
        if (
          recommendation.country['visa_on_arrival_for'].includes(passport.value)
        ) {
          approvedPassports.push(passport)
        }
        return recommendation.country['visa_on_arrival_for'].includes(
          passport.value
        )
      }

      let isVisaFree = passports.some(checkVisaFreeFor)
      if (isVisaFree) {
        visaText = 'Visa free for you.'
        visaSubText = `Passport of ${approvedPassports[0].label}`
      } else {
        let isVisaOnArrival = passports.some(checkVisaOnArrivalFor)
        if (isVisaOnArrival) {
          visaText = 'Visa on Arrival'
          visaSubText = `Passport of ${approvedPassports[0].label}`
        } else {
          visaText = 'Visa required.'
          visaSubText = `Visa requirements of ${recommendation.country.name}`
        }
      }
      //Restrictions
      let restrictions = recommendation.country.restrictions

      //Vaccinated Test Required
      if (restrictions['vaccinated_arrival_test_required']) {
        vaccinatedTestText = 'Test Required for vaccinated.'
      } else if (restrictions['vaccinated_arrival_test_required'] === null) {
        vaccinatedTestText = ''
      } else {
        vaccinatedTestText = 'Test not required for vaccinated.'
      }
      //Unvaccinated Test Required
      if (restrictions['arrival_test_required']) {
        unvaccinatedTestText = 'Test Required for unvaccinated.'
      } else if (restrictions['arrival_test_required'] === null) {
        unvaccinatedTestText = ''
      } else {
        unvaccinatedTestText = 'Test not required for unvaccinated.'
      }
      //Vaccinated Quarantine Required
      if (restrictions['vaccinated_arrival_quarantine_required']) {
        vaccinatedQuarantineText = 'Quarantine Required for vaccinated.'
      } else if (
        restrictions['vaccinated_arrival_quarantine_required'] === null
      ) {
        vaccinatedQuarantineText = ''
      } else {
        vaccinatedQuarantineText = 'Quarantine not required for vaccinated.'
      }
      //Unvaccinated Quarantine Required
      if (restrictions['arrival_quarantine_required']) {
        unvaccinatedQuarantineText = 'Quarantine Required for unvaccinated.'
      } else if (restrictions['arrival_quarantine_required'] === null) {
        unvaccinatedQuarantineText = ''
      } else {
        unvaccinatedQuarantineText = 'Quarantine not required for unvaccinated.'
      }

      //restaurant status
      if (restrictions['restaurant_status'] === 'OPEN') {
        restaurantText = 'Restaurants are open.'
      } else if (restrictions['restaurant_status'] === null) {
        restaurantText = ''
      } else if (restrictions['restaurant_status'] === 'CLOSED') {
        restaurantText = 'Restaurants are closed.'
      } else if (restrictions['restaurant_status'] === 'RESTRICTIONS') {
        restaurantText = 'Restaurants are restricted.'
      }

      if (restrictions['Tourist Attractions'] === 'Open') {
        attractionsText = 'Attractions are open.'
      } else if (restrictions['Tourist Attractions'] === null) {
        attractionsText = ''
      } else if (restrictions['Tourist Attractions'] === 'Closed') {
        attractionsText = 'Attractions are closed.'
      } else if (restrictions['Tourist Attractions'] === 'Partially Open') {
        attractionsText = 'Attractions are restricted.'
      }
    }
  }

  recommendationProcessor()

  return (
    <div
      onMouseEnter={() => {
        activeHandler(sid)
      }}
      className={styles.recommendationCard}
    >
      <div className={styles.header}>
        <Link
          to={`recommendations/recommendation/${id}`}
          className={styles.titleContainer}
        >
          <h2 className={styles.title}>
            {name}
            <i>{country.name}</i> {country.emoji_flag}
          </h2>
          <span className={styles.date}>
            {formatAsMonthDay(startDate)}
            {startDate !== endDate ? ` - ${formatAsMonthDay(endDate)}` : ''}
          </span>
        </Link>
        <button
          className={wishlisted ? styles.heartFilled : styles.heart}
          onClick={() =>
            toggleWishlist({
              query,
              recommendation,
              recommendationId
            })
          }
        >
          {
            <img
              className={wishlisted ? styles.heartFilled : styles.heart}
              alt=""
            />
          }
        </button>
      </div>
      <Link
        to={`recommendations/recommendation/${sid}/${startDate}/${endDate}`}
        style={{ color: 'inherit', textDecoration: 'inherit' }}
        className={styles.content}
      >
        {events &&
          events.length > 0 && (
          <>
              <div className={styles.sectionTitle}>Events & Festivals</div>
              <HorizontalScroll
                className={styles.slide}
                settings={{
                  responsive: undefined,
                  slidesToShow: Math.min(events.length, 3),
                  slidesToScroll: 2
                }}
                items={events.map(event => (
                  <div key={`${sid}-poi-${event.id}`} className={styles.slide}>
                    <Image
                      src={
                        event.images &&
                        event.images.length > 0 &&
                        event.images[0]
                      }
                      className={styles.slideImage}
                      containerClassName={styles.slideImageContainer}
                      width={100}
                      height={100}
                      shadowBlur={30}
                      alt={event.title}
                      key={event.eid}
                    />
                    <div className="flex center">
                      <div className={styles.slideText}>{event.title}</div>
                    </div>
                  </div>
                ))}
              />
          </>
        )}
        <div className={styles.stats}>
          {(fastestFlightCost || cheapestFlightCost || bestFlightCost) && (
            <div className={styles.statRow}>
              <div className={styles.statImage}>
                <Plane />
              </div>
              <div className={styles.statContent}>
                {fastestFlightCost && (
                  <div className={styles.statContentCell}>
                    <div className={styles.statName}>Fastest</div>
                    <div className={styles.statValue}>{fastestFlightCost}</div>
                  </div>
                )}
                {cheapestFlightCost && (
                  <div className={styles.statContentCell}>
                    <div className={styles.statName}>Cheapest</div>
                    <div className={styles.statValue}>{cheapestFlightCost}</div>
                  </div>
                )}
                {bestFlightCost && (
                  <div className={styles.statContentCell}>
                    <div className={styles.statName}>Best</div>
                    <div className={styles.statValue}>{bestFlightCost}</div>
                  </div>
                )}
              </div>
            </div>
          )}
          {(hotelPrice || hostelPrice || rentalPrice) && (
            <div className={styles.statRow}>
              <div className={styles.statImage}>
                <Home />
              </div>
              <div className={styles.statContent}>
                {hotelPrice && (
                  <div className={styles.statContentCell}>
                    <div className={styles.statName}>Hotel</div>
                    <div className={styles.statValue}>${hotelPrice}</div>
                  </div>
                )}
                {hostelPrice && (
                  <div className={styles.statContentCell}>
                    <div className={styles.statName}>Hostel</div>
                    <div className={styles.statValue}>{hostelPrice}</div>
                  </div>
                )}
                {rentalPrice && (
                  <div className={styles.statContentCell}>
                    <div className={styles.statName}>Airbnb</div>
                    <div className={styles.statValue}>{rentalPrice}</div>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className={styles.statRow}>
            <div className={styles.statImage}>
              <Passport />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statContentCell}>
                <div className={styles.statName}>{visaText}</div>
                <div className={styles.statValue}>{visaSubText}</div>
              </div>
            </div>
          </div>
          {minTemperature != null &&
            maxTemperature != null && (
              <div className={styles.statRow}>
                <div className={styles.statImage}>
                  <Cloud />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statContentCell}>
                    <div className={styles.statName}>
                      min {minTemperature}°C, max {maxTemperature}°C
                    </div>
                  </div>
                </div>
              </div>
          )}
          <div className={styles.statRow}>
            <div className={styles.statImage}>
              <CovidTest />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statContentCell}>
                <div className={styles.statName}>{vaccinatedTestText}</div>
                <div className={styles.statValue}>{unvaccinatedTestText}</div>
              </div>
            </div>
          </div>
          <div className={styles.statRow}>
            <div className={styles.statImage}>
              <Quarantine />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statContentCell}>
                <div className={styles.statName}>
                  {vaccinatedQuarantineText}
                </div>
                <div className={styles.statValue}>
                  {unvaccinatedQuarantineText}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.statRow}>
            <div className={styles.statImage}>
              <Attraction />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statContentCell}>
                <div className={styles.statName}>{restaurantText}</div>
                <div className={styles.statValue}>{attractionsText}</div>
              </div>
            </div>
          </div>
        </div>
        {topPois &&
          topPois.length > 0 && (
          <>
              <div className={styles.sectionTitle}>What to See</div>
              <HorizontalScroll
                className={styles.slidePois}
                settings={{
                  responsive: undefined,
                  slidesToShow: 3,
                  slidesToScroll: 2
                }}
                items={topPois.map(poi => (
                  <div key={`${sid}-poi-${poi.id}`} className={styles.slide}>
                    <Image
                      src={poi.imageLink}
                      className={styles.slideImage}
                      width={100}
                      height={100}
                      shadowBlur={30}
                      alt={poi.name}
                      key={poi.id}
                    />
                    <div className={styles.slideText}>{poi.name}</div>
                  </div>
                ))}
              />
          </>
        )}
      </Link>
    </div>
  )
}

export default Recommendation
