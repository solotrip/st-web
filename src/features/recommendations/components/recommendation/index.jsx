import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './recommendation.module.scss'
import { HorizontalScroll, Image } from 'components'

import {
  ReactComponent as
  Passport
} from 'assets/images/new-icons/passport.svg'
import {
  ReactComponent as
  Acommodation
} from 'assets/images/new-icons/acommodation.svg'
import {
  ReactComponent as
  Calendar
} from 'assets/images/new-icons/calendar.svg'
import {
  ReactComponent as
  Flights
} from 'assets/images/new-icons/flights.svg'
import {
  ReactComponent as
  Vaccine
} from 'assets/images/new-icons/vaccine.svg'
import {
  ReactComponent as
  Quarantine
} from 'assets/images/new-icons/quarantine.svg'
import {
  ReactComponent as
  Attraction
} from 'assets/images/new-icons/attraction.svg'
import { ReactComponent as Cloud } from 'assets/images/new-icons/cloud.svg'

import {
  ReactComponent as
  EventsIcon
} from 'assets/images/new-icons/events.svg'
import { ReactComponent as Food } from 'assets/images/new-icons/food.svg'

import { formatAsMonthDay } from 'utils/date'

import { processRecommendation } from 'utils/recommendation'
import { passportSelector } from '../../containers/passport-countries/slice'


const Recommendation = ({
  recommendation,
  query,
  queryString,
  activeHandler,
  wishlisted,
  toggleWishlist,
  refHolder,
  basePath
}) => {
  const {
    sid,
    country,
    name,
    startDate,
    endDate,
    events,
    id,
    hotel_price_min: hotelPriceMin,
    hotel_price_max: hotelPriceMax,
    hostel_price_min: hostelPriceMin,
    hostel_price_max: hostelPriceMax,
    vacation_rental_price_min: vacationRentalPriceMin,
    vacation_rental_price_max: vacationRentalPriceMax,

    fastestFlightCost,
    cheapestFlightCost,
    bestFlightCost
  } = recommendation

  const { passports } = useSelector(passportSelector)


  const {
    visaText,
    vaccinatedTestText,
    vaccinatedQuarantineText,
    unvaccinatedTestText,
    unvaccinatedQuarantineText,
    restaurantText,
    attractionsText,
    temperatureText
  } = processRecommendation(recommendation, passports)

  return (
    <div
      onMouseEnter={() => {
        activeHandler(sid)
      }}
      className={styles.recommendationCard2}
      ref={refHolder}
    >
      {' '}
      <div className={styles.colorStrip}/>
      <div className={styles.cardContent}>
        <div className={styles.header}>
          <div className={styles.headerLine}>
            {' '}
            <div className={styles.headerUpLine}> Recommendation</div>
            {' '}
            <button
              className={wishlisted ? styles.heartFilled : styles.heart}
              onClick={() =>
                toggleWishlist({
                  query,
                  recommendation
                })
              }
            />
          </div>
          <div className={styles.headerLine}>
            {' '}
            <div className={styles.headerTitle}>{name}</div>
            {' '}
            <div className={styles.country}>
              <div>{country.emoji_flag}</div>
              &nbsp;
              <div>{country.name}</div>
            </div>
          </div>
          <hr className={styles.hr}/>
        </div>

        <div className={styles.content}>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Calendar/>
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
              <Passport/>
            </div>
            <div className={styles.elementText}>{visaText}</div>
          </div>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Cloud/>
            </div>
            <div className={styles.elementText}>{temperatureText}</div>
          </div>

          {(hotelPriceMin || hotelPriceMax) &&
          hotelPriceMin !== hotelPriceMax ? (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Acommodation/>
              </div>
              <div className={styles.elementText}>
                Hotel prices range from ${Math.floor(hotelPriceMin)} to
                ${Math.floor(
                hotelPriceMax
              )}.
              </div>
            </div>
            ) : (
              Math.floor(hotelPriceMin) !== 0 && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Acommodation/>
                </div>
                <div className={styles.elementText}>
                  Average Hotel price is ${Math.floor(hotelPriceMin)}.
                </div>
              </div>
              )
            )}
          {(hostelPriceMin || hostelPriceMax) &&
          hostelPriceMin !== hostelPriceMax ? (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Acommodation/>
              </div>
              <div className={styles.elementText}>
                Hostel prices range from ${Math.floor(hostelPriceMin)} to
                ${Math.floor(
                hostelPriceMax
              )}.
              </div>
            </div>
            ) : (
              Math.floor(hostelPriceMin) !== 0 && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Acommodation/>
                </div>
                <div className={styles.elementText}>
                  Average hostel price is ${Math.floor(hostelPriceMin)}.
                </div>
              </div>
              )
            )}
          {(vacationRentalPriceMin || vacationRentalPriceMax) &&
          vacationRentalPriceMin !== vacationRentalPriceMax ? (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Acommodation/>
              </div>
              <div className={styles.elementText}>
                Airbnb prices range from ${Math.floor(
                vacationRentalPriceMin
              )}{' '}
                to ${Math.floor(vacationRentalPriceMax)}.
              </div>
            </div>
            ) : (
              Math.floor(vacationRentalPriceMin) !== 0 && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Acommodation/>
                </div>
                <div className={styles.elementText}>
                  Average Airbnb price is ${Math.floor(
                  vacationRentalPriceMin
                )}.
                </div>
              </div>
              )
            )}

          {(fastestFlightCost || cheapestFlightCost || bestFlightCost) && (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Flights/>
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
              <Vaccine/>
            </div>
            <div className={styles.elementText}>{vaccinatedTestText}</div>
          </div>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Vaccine/>
            </div>
            <div className={styles.elementText}>{unvaccinatedTestText}</div>
          </div>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Quarantine/>
            </div>
            <div className={styles.elementText}>{vaccinatedQuarantineText}</div>
          </div>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Quarantine/>
            </div>
            <div className={styles.elementText}>
              {unvaccinatedQuarantineText}
            </div>
          </div>

          <div className={styles.contentElement}>
            <div className={styles.elementIconAttraction}>
              {' '}
              <Attraction/>
            </div>
            <div className={styles.elementText}>{attractionsText}</div>
          </div>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Food/>
            </div>
            <div className={styles.elementText}>{restaurantText}</div>
          </div>
          {events &&
          events.length > 0 && (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <EventsIcon/>
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
            <Link to={{
              pathname: `${basePath}/r/${id}`,
              search: queryString
            }}
                  replace
                  className={styles.showDetails}
            >
              Show Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommendation
