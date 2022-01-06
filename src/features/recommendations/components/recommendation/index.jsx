/* eslint-disable camelcase */
/* eslint-disable max-len */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './recommendation.module.scss'
import { HorizontalScroll, Image } from 'components'

import { ReactComponent as Passport } from 'assets/images/new-icons/passport.svg'
import { ReactComponent as Acommodation } from 'assets/images/new-icons/acommodation.svg'
import { ReactComponent as Calendar } from 'assets/images/new-icons/calendar.svg'
import { ReactComponent as Flights } from 'assets/images/new-icons/flights.svg'
import { ReactComponent as Vaccine } from 'assets/images/new-icons/vaccine.svg'
import { ReactComponent as Quarantine } from 'assets/images/new-icons/quarantine.svg'
import { ReactComponent as Attraction } from 'assets/images/new-icons/attraction.svg'
import { ReactComponent as Cloud } from 'assets/images/new-icons/cloud.svg'

import { ReactComponent as EventsIcon } from 'assets/images/new-icons/events.svg'
import { ReactComponent as Food } from 'assets/images/new-icons/food.svg'

// eslint-disable-next-line no-unused-vars
import { ReactComponent as Plane } from 'assets/images/icons/plane.svg'
import { formatAsMonthDay } from 'utils/date'

import { passportSelector } from '../../containers/passport-countries/slice'

import { save } from '../../../active-reco/slice'

let visaText = ''
// eslint-disable-next-line no-unused-vars
let visaSubText = ''
let vaccinatedTestText = ''
let vaccinatedQuarantineText = ''
let unvaccinatedTestText = ''
let unvaccinatedQuarantineText = ''
let restaurantText = ''
let attractionsText = ''
let temperatureText = ''

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
    hotel_price_min,
    hotel_price_max,
    hostel_price_min,
    hostel_price_max,
    vacation_rental_price_min,
    vacation_rental_price_max,

    fastestFlightCost,
    cheapestFlightCost,
    bestFlightCost,
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-unused-vars
    climate = {}
  } = recommendation

  const { passports } = useSelector(passportSelector)
  const dispatch = useDispatch()

  const handleActiveReco = () => {
    dispatch(save(recommendation))
  }

  function recommendationProcessor() {
    if (recommendation !== undefined) {
      let approvedPassports = []

      //check visa status.
      const checkVisaFreeFor = passport => {
        if (
          recommendation.country &&
          recommendation.country['visa_free_for'] &&
          recommendation.country['visa_free_for'].includes(passport.value)
        ) {
          approvedPassports.push(passport)
        }
        return recommendation.country['visa_free_for'].includes(passport.value)
      }

      const checkVisaOnArrivalFor = passport => {
        if (
          recommendation.country &&
          recommendation.country['visa_on_arrival_for'] &&
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
      if (restrictions && restrictions['vaccinated_arrival_test_required']) {
        vaccinatedTestText = 'Test Required for vaccinated.'
      } else if (
        !restrictions ||
        (restrictions['vaccinated_arrival_test_required'] &&
          restrictions['vaccinated_arrival_test_required'] === null)
      ) {
        vaccinatedTestText =
          'No information about test procedure for vaccinated people.'
      } else {
        vaccinatedTestText = 'Test not required for vaccinated.'
      }
      //Unvaccinated Test Required
      if (restrictions && restrictions['arrival_test_required']) {
        unvaccinatedTestText = 'Test Required for unvaccinated.'
      } else if (
        !restrictions ||
        (restrictions['arrival_test_required'] &&
          restrictions['arrival_test_required'] === null)
      ) {
        unvaccinatedTestText =
          'No information about test procedure for unvaccinated people.'
      } else {
        unvaccinatedTestText = 'Test not required for unvaccinated.'
      }
      //Vaccinated Quarantine Required
      if (
        restrictions &&
        restrictions['vaccinated_arrival_quarantine_required']
      ) {
        vaccinatedQuarantineText = 'Quarantine Required for vaccinated.'
      } else if (
        !restrictions ||
        (restrictions['vaccinated_arrival_quarantine_required'] &&
          restrictions['vaccinated_arrival_quarantine_required'] === null)
      ) {
        vaccinatedQuarantineText =
          'No information about quarantine procedure for vaccinated people.'
      } else {
        vaccinatedQuarantineText = 'Quarantine not required for vaccinated.'
      }
      //Unvaccinated Quarantine Required
      if (restrictions && restrictions['arrival_quarantine_required']) {
        unvaccinatedQuarantineText = 'Quarantine Required for unvaccinated.'
      } else if (
        !restrictions ||
        (restrictions['arrival_quarantine_required'] &&
          restrictions['arrival_quarantine_required'] === null)
      ) {
        unvaccinatedQuarantineText =
          'No information about quarantine procedure for unvaccinated people.'
      } else {
        unvaccinatedQuarantineText = 'Quarantine not required for unvaccinated.'
      }

      //restaurant status
      if (restrictions && restrictions['restaurant_status'] === 'OPEN') {
        restaurantText = 'Restaurants are open.'
      } else if (
        !restrictions ||
        (restrictions['restaurant_status'] &&
          restrictions['restaurant_status'] === null)
      ) {
        restaurantText = 'No information about restaurant status.'
      } else if (
        restrictions &&
        restrictions['restaurant_status'] === 'CLOSED'
      ) {
        restaurantText = 'Restaurants are closed.'
      } else if (
        restrictions &&
        restrictions['restaurant_status'] === 'RESTRICTIONS'
      ) {
        restaurantText = 'Restaurants are restricted.'
      }

      if (restrictions && restrictions['Tourist Attractions'] === 'Open') {
        attractionsText = 'Attractions are open.'
      } else if (
        !restrictions ||
        (restrictions['Tourist Attractions'] &&
          restrictions['Tourist Attractions'] === null)
      ) {
        attractionsText = 'No information about attraction status.'
      } else if (
        restrictions &&
        restrictions['Tourist Attractions'] === 'Closed'
      ) {
        attractionsText = 'Attractions are closed.'
      } else if (
        restrictions &&
        restrictions['Tourist Attractions'] === 'Partially Open'
      ) {
        attractionsText = 'Attractions are restricted.'
      }

      //Adding the temperature.
      if (recommendation.climate.t_min && recommendation.climate.t_max) {
        temperatureText = `min ${recommendation.climate.t_min}°C, max ${
          recommendation.climate.t_max
        }°C`
      }
    }
  }

  recommendationProcessor()

  return (
    <div
      onMouseEnter={() => {
        activeHandler(sid)
      }}
      className={styles.recommendationCard2}
    >
      {' '}
      <div className={styles.colorStrip} />
      <div className={styles.cardContent}>
        <div className={styles.header}>
          <div className={styles.headerLine}>
            {' '}
            <div className={styles.headerUpLine}> Recommendation</div>{' '}
            <button
              className={wishlisted ? styles.heartFilled : styles.heart}
              onClick={() =>
                toggleWishlist({
                  query,
                  recommendation,
                  recommendationId
                })
              }
            />
          </div>
          <div className={styles.headerLine}>
            {' '}
            <div className={styles.headerTitle}>{name}</div>{' '}
            <div className={styles.country}>
              <div>{country.emoji_flag}</div> &nbsp; <div>{country.name}</div>
            </div>
          </div>
          <hr className={styles.hr} />
        </div>

        <div className={styles.content}>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Calendar />
            </div>
            <div className={styles.elementText}>
              {formatAsMonthDay(startDate)}
              {startDate !== endDate
                ? ` - ${formatAsMonthDay(endDate)}`
                : ''}{' '}
            </div>
          </div>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Passport />
            </div>
            <div className={styles.elementText}>{visaText}</div>
          </div>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Cloud />
            </div>
            <div className={styles.elementText}>{temperatureText}</div>
          </div>

          {(hotel_price_min || hotel_price_max) &&
          hotel_price_min !== hotel_price_max ? (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Acommodation />
              </div>
              <div className={styles.elementText}>
                Hotel prices range from ${Math.floor(hotel_price_min)} to ${Math.floor(
                hotel_price_max
              )}.
              </div>
            </div>
            ) : (
              Math.floor(hotel_price_min) !== 0 && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Acommodation />
                </div>
                <div className={styles.elementText}>
                  Average Hotel price is ${Math.floor(hotel_price_min)}.
                </div>
              </div>
              )
            )}
          {(hostel_price_min || hostel_price_max) &&
          hostel_price_min !== hostel_price_max ? (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Acommodation />
              </div>
              <div className={styles.elementText}>
                Hostel prices range from ${Math.floor(hostel_price_min)} to ${Math.floor(
                hostel_price_max
              )}.
              </div>
            </div>
            ) : (
              Math.floor(hostel_price_min) !== 0 && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Acommodation />
                </div>
                <div className={styles.elementText}>
                  Average hostel price is ${Math.floor(hostel_price_min)}.
                </div>
              </div>
              )
            )}
          {(vacation_rental_price_min || vacation_rental_price_max) &&
          vacation_rental_price_min !== vacation_rental_price_max ? (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Acommodation />
              </div>
              <div className={styles.elementText}>
                Airbnb prices range from ${Math.floor(
                vacation_rental_price_min
              )}{' '}
                to ${Math.floor(vacation_rental_price_max)}.
              </div>
            </div>
            ) : (
              Math.floor(vacation_rental_price_min) !== 0 && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Acommodation />
                </div>
                <div className={styles.elementText}>
                  Average Airbnb price is ${Math.floor(
                  vacation_rental_price_min
                )}.
                </div>
              </div>
              )
            )}

          {(fastestFlightCost || cheapestFlightCost || bestFlightCost) && (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Flights />
              </div>
              <div className={styles.elementText}>
                {fastestFlightCost &&
                  `Fastest: $${Math.floor(fastestFlightCost)}`}
                {cheapestFlightCost &&
                  `,Cheapest: $${Math.floor(cheapestFlightCost)}`}
                {bestFlightCost && `,Best: $${Math.floor(bestFlightCost)}`}
              </div>
            </div>
          )}
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Vaccine />
            </div>
            <div className={styles.elementText}>{vaccinatedTestText}</div>
          </div>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Vaccine />
            </div>
            <div className={styles.elementText}>{unvaccinatedTestText}</div>
          </div>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Quarantine />
            </div>
            <div className={styles.elementText}>{vaccinatedQuarantineText}</div>
          </div>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Quarantine />
            </div>
            <div className={styles.elementText}>
              {unvaccinatedQuarantineText}
            </div>
          </div>

          <div className={styles.contentElement}>
            <div className={styles.elementIconAttraction}>
              {' '}
              <Attraction />
            </div>
            <div className={styles.elementText}>{attractionsText}</div>
          </div>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Food />
            </div>
            <div className={styles.elementText}>{restaurantText}</div>
          </div>
          {events &&
            events.length > 0 && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <EventsIcon />
                </div>
                {<div className={styles.elementText}>Events & Festivals</div>}
              </div>
          )}
          <div className={styles.events}>
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
                      event.images && event.images.length > 0 && event.images[0]
                    }
                    className={styles.slideImage}
                    width={200}
                    height={120}
                    alt={event.title}
                    key={event.eid}
                  />
                  <div className="flex center">
                    <div className={styles.slideText}>{event.title}</div>
                  </div>
                  <div className={styles.slideText2}>
                    {formatAsMonthDay(event.start)}
                    {event.start !== event.end
                      ? ` - ${formatAsMonthDay(event.end)}`
                      : ''}{' '}
                  </div>
                </div>
              ))}
            />
            <Link to={`recommendations/recommendation/${id}`}>
              <button onClick={handleActiveReco} className={styles.showDetails}>
                Show Details{' '}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommendation
