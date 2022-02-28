import React from 'react'
import { Link } from 'react-router-dom'
import styles from './recommendation.module.scss'
import { HorizontalList, Image } from 'components'
import { useDispatch } from 'react-redux'
import cn from 'classnames'

import {
  Accommodation,
  Attraction,
  Calendar,
  Cloud,
  EventsIcon,
  Flights,
  Food,
  Passport,
  Quarantine,
  Vaccine
} from 'assets/images/new-icons'


import { formatAsMonthDay } from 'utils/date'

import { processRecommendation } from 'utils/recommendation'

import { saveScrollPosition } from '../../../../components/navigation/slice'

const Recommendation = ({
  recommendation,
  query,
  queryString,
  activeHandler,
  wishlisted,
  toggleWishlist,
  refHolder,
  basePath,
  currencyCoefficient = 1,
  currency = 'USD',
  distanceUnit = 'km',
  temperatureUnit = '°C',
  distanceCoefficient = 1,
  temperaturize,
  index
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

  const dispatch = useDispatch()

  const passports = query && query.passports ? query.passports : []

  const {
    visaText,
    vaccinatedTestText,
    vaccinatedQuarantineText,
    unvaccinatedTestText,
    unvaccinatedQuarantineText,
    restaurantText,
    attractionsText,
    minTemp,
    maxTemp
  } = processRecommendation(recommendation, passports)

  const setScrollPosition = () => {
    dispatch(saveScrollPosition(index))
  }

  return (
    <div
      onMouseEnter={() => {
        //activeHandler(sid)
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
            <div className={styles.elementText}>
              min {temperaturize(minTemp)}
              {temperatureUnit}, max {temperaturize(maxTemp)}
              {temperatureUnit}
            </div>
          </div>

          {(hotelPriceMin || hotelPriceMax) &&
          hotelPriceMin !== hotelPriceMax ? (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Accommodation/>
              </div>
              <div className={styles.elementText}>
                Hotel prices range from{' '}
                {Math.floor(hotelPriceMin * currencyCoefficient)
                } {currency} to{' '}
                {Math.floor(hotelPriceMax * currencyCoefficient)} {currency}.
              </div>
            </div>
            ) : (
              Math.floor(hotelPriceMin) !== 0 && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Accommodation/>
                </div>
                <div className={styles.elementText}>
                  Average Hotel price is{' '}
                  {Math.floor(hotelPriceMin * currencyCoefficient)} {currency}.
                </div>
              </div>
              )
            )}
          {(hostelPriceMin || hostelPriceMax) &&
          hostelPriceMin !== hostelPriceMax ? (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Accommodation/>
              </div>
              <div className={styles.elementText}>
                Hostel prices range from ${Math.floor(hostelPriceMin)} to{' '}
                {Math.floor(hostelPriceMax * currencyCoefficient)} {currency}.
              </div>
            </div>
            ) : (
              Math.floor(hostelPriceMin) !== 0 && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Accommodation/>
                </div>
                <div className={styles.elementText}>
                  Average hostel price is{' '}
                  {Math.floor(hostelPriceMin * currencyCoefficient)} {currency}.
                </div>
              </div>
              )
            )}
          {(vacationRentalPriceMin || vacationRentalPriceMax) &&
          vacationRentalPriceMin !== vacationRentalPriceMax ? (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Accommodation/>
              </div>
              <div className={styles.elementText}>
                Airbnb prices range from{' '}
                {Math.floor(vacationRentalPriceMin * currencyCoefficient)}{' '}
                {currency} to{' '}
                {Math.floor(vacationRentalPriceMax * currencyCoefficient)}{' '}
                {currency}.
              </div>
            </div>
            ) : (
              Math.floor(vacationRentalPriceMin) !== 0 && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Accommodation/>
                </div>
                <div className={styles.elementText}>
                  Average Airbnb price is{' '}
                  {Math.floor(vacationRentalPriceMin
                    * currencyCoefficient)}{' '}
                  {currency}.
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
                `Fastest: ${Math.floor(
                  fastestFlightCost * currencyCoefficient
                )} ${currency}`}
                {cheapestFlightCost &&
                `,Cheapest: ${Math.floor(
                  cheapestFlightCost * currencyCoefficient
                )} ${currency}`}
                {bestFlightCost &&
                `,Best: ${Math.floor(
                  bestFlightCost * currencyCoefficient
                )} ${currency}`}
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
            <HorizontalList
              slidesPerView={2}
              itemClassName={styles.horizontalListItem}
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
                  <div className={cn(styles.slideText, styles.eventDate)}>
                    {formatAsMonthDay(event.start)}
                    {event.start !== event.end
                      ? ` - ${formatAsMonthDay(event.end)}`
                      : ''}
                  </div>
                  <div className={styles.slideText}>{event.title}</div>
                </div>
              ))}
            />
            <Link
              to={{
                pathname: `${basePath}/r/${id}`,
                search: queryString
              }}
              replace
              className={styles.showDetails}
              onClick={setScrollPosition}
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
