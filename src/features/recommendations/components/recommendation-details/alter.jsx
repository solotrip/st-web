/* eslint-disable max-len */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { HorizontalScroll, Image } from 'components'

import styles from './alter.module.scss'

import { ReactComponent as Passport } from 'assets/images/new-icons/passport.svg'
import { ReactComponent as Acommodation } from 'assets/images/new-icons/acommodation.svg'
import { ReactComponent as Calendar } from 'assets/images/new-icons/calendar.svg'
// eslint-disable-next-line no-unused-vars
import { ReactComponent as Flights } from 'assets/images/new-icons/flights.svg'
import { ReactComponent as Vaccine } from 'assets/images/new-icons/vaccine.svg'
import { ReactComponent as Quarantine } from 'assets/images/new-icons/quarantine.svg'
import { ReactComponent as Attraction } from 'assets/images/new-icons/attraction.svg'
import { ReactComponent as Cloud } from 'assets/images/new-icons/cloud.svg'
import { ReactComponent as Mask } from 'assets/images/new-icons/mask.svg'
import { ReactComponent as Transport } from 'assets/images/new-icons/transport.svg'

import { formatAsMonthDay } from 'utils/date'

import { passportSelector } from '../../containers/passport-countries/slice'
import { recommendationsSelector } from '../../slice'
import { wishlistSelector } from '../../../wishlist/slice'

let visaText = ''
let vaccinatedTestText = ''
let vaccinatedQuarantineText = ''
let unvaccinatedTestText = ''
let unvaccinatedQuarantineText = ''
let restaurantText = ''
let attractionsText = ''
let temperatureText = ''
let weatherText = ''
let maskText = ''
let barText = ''
let publicTransportText = ''

const Details = ({ activeReco }) => {
  let recommendation = activeReco
  const { rid, start, end } = useParams()
  const id = rid + '/' + start + '/' + end
  const { recommendations: recommendationsObject } = useSelector(
    recommendationsSelector
  )
  //search recommendation among different recommendations.
  Object.keys(recommendationsObject).forEach(recommendationObject => {
    let recommendations =
      recommendationsObject[recommendationObject].recommendations
    //find recommendation by its sid from recommendations in the redux state.
    var recommendationReturned = findRecommendation(recommendations, 'id', id)
    if (recommendationReturned !== undefined) {
      //recommendation = recommendationReturned
    }
  })

  //search recommendation among different wishlisted areas.
  const { wishlist } = useSelector(wishlistSelector)
  Object.keys(wishlist).forEach(wishlistedObject => {
    console.log('wishlisted object: ', wishlist[wishlistedObject].data)

    if (wishlist[wishlistedObject].data.id === id) {
      //recommendation = wishlist[wishlistedObject].data
    }
  })

  // eslint-disable-next-line no-unused-vars
  const [isRecommendationProcessed, setIsRecommendationProcessed] = useState(
    false
  )

  const { passports: passportsObject } = useSelector(passportSelector)
  let passports = passportsObject

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
        visaText = `Visa free for citizen of  ${approvedPassports[0].label}.`
      } else {
        let isVisaOnArrival = passports.some(checkVisaOnArrivalFor)
        if (isVisaOnArrival) {
          visaText = `Visa on Arrival for citizen of ${
            approvedPassports[0].label
          }.`
        } else {
          visaText = 'Visa required.'
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
        restaurantText = 'No information about Restaurants.'
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

      //Adding the temperature.
      if (recommendation.climate.t_min && recommendation.climate.t_max) {
        temperatureText = `min ${recommendation.climate.t_min}°C, max ${
          recommendation.climate.t_max
        }°C`
      }

      //Adding the general weather.
      if (
        recommendation.climate.humidity &&
        recommendation.climate.rainy_days
      ) {
        weatherText = `Rainy days: ${
          recommendation.climate.rainy_days
        }, humidity ${recommendation.climate.humidity}`
      }

      //Adding the mask status.
      if (restrictions['mask_status'] === 'REQUIRED') {
        maskText = 'Mask required.'
      } else if (restrictions['mask_status'] === null) {
        maskText = 'No information about face mask requirement.'
      } else if (restrictions['mask_status'] === 'NOT_REQUIRED') {
        maskText = 'Face mask not required.'
      } else if (restrictions['mask_status'] === 'RECOMMENDED') {
        maskText = 'Face mask  advised.'
      }

      //Adding the bar status.
      if (restrictions['bar_status'] === 'OPEN') {
        barText = 'Bars are open.'
      } else if (restrictions['bar_status'] === null) {
        barText = 'No information about Bars.'
      } else if (restrictions['bar_status'] === 'CLOSED') {
        barText = 'Bars are closed.'
      } else if (restrictions['bar_status'] === 'RESTRICTIONS') {
        barText = 'Bars are restricted.'
      }

      //Adding the public transport.
      if (restrictions['Public Transport'] === 'Operating') {
        publicTransportText = 'Public transportation is operational.'
      } else if (restrictions['Public Transport'] === null) {
        publicTransportText = 'No information about Public transportation.'
      } else if (restrictions['Public Transport'] === 'Partial Restrictions') {
        publicTransportText = 'Public transport is restricted.'
      }
    }
  }

  function findRecommendation(arr, propName, propValue) {
    for (var i = 0; i < arr.length; i++)
      if (arr[i][propName] === propValue) return arr[i]
  }

  if (!isRecommendationProcessed) {
    recommendationProcessor()
  }

  return (
    <>
      <div
        onMouseEnter={() => {
          //activeHandler(sid)
        }}
        className={styles.recommendationCard2}
      >
        {' '}
        <div className={styles.colorStrip} />
        <div className={styles.cardContent}>
          <div className={styles.header}>
            <div className={styles.headerLine}>
              {' '}
              <div className={styles.headerUpLine}> Overview</div>{' '}
            </div>
            <div className={styles.headerLine}>
              {' '}
              <div className={styles.headerTitle}>Highlights</div>{' '}
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
                {formatAsMonthDay(start)}
                {start !== end ? ` - ${formatAsMonthDay(end)}` : ''}{' '}
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
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Cloud />
              </div>
              <div className={styles.elementText}>{weatherText}</div>
            </div>
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Mask />
              </div>
              <div className={styles.elementText}>{maskText}</div>
            </div>
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
              <div className={styles.elementText}>
                {vaccinatedQuarantineText}
              </div>
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
          </div>
        </div>
      </div>
      <div
        onMouseEnter={() => {
          //activeHandler(sid)
        }}
        className={styles.recommendationCard2}
      >
        {' '}
        <div className={styles.colorStrip} />
        <div className={styles.cardContent}>
          <div className={styles.header}>
            <div className={styles.headerLine}>
              {' '}
              <div className={styles.headerUpLine}> Overview</div>{' '}
            </div>
            <div className={styles.headerLine}>
              {' '}
              <div className={styles.headerTitle}>Status</div>{' '}
            </div>
            <hr className={styles.hr} />
          </div>

          <div className={styles.content}>
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Attraction />
              </div>
              <div className={styles.elementText}>{barText}</div>
            </div>
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Attraction />
              </div>
              <div className={styles.elementText}>{restaurantText}</div>
            </div>
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Attraction />
              </div>
              <div className={styles.elementText}>{attractionsText}</div>
            </div>
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Transport />
              </div>
              <div className={styles.elementText}>{publicTransportText}</div>
            </div>
          </div>
        </div>
      </div>
      {recommendation.events.length > 0 ? (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard2}
        >
          {' '}
          <div className={styles.colorStrip} />
          <div className={styles.cardContent}>
            <div className={styles.header}>
              <div className={styles.headerLine}>
                {' '}
                <div className={styles.headerUpLine}> Major</div>{' '}
              </div>
              <div className={styles.headerLine}>
                {' '}
                <div className={styles.headerTitle}>Events</div>{' '}
              </div>
              <hr className={styles.hr} />
            </div>

            <div className={styles.content}>
              <div className={styles.events}>
                <HorizontalScroll
                  className={styles.slide}
                  settings={{
                    responsive: undefined,
                    slidesToShow: Math.min(
                      recommendation.events ? recommendation.events.length : 0,
                      3
                    ),
                    slidesToScroll: 2
                  }}
                  items={recommendation.events.map(event => (
                    <div key={`poi-${event.id}`} className={styles.slide}>
                      <Image
                        src={
                          event.images &&
                          event.images.length > 0 &&
                          event.images[0]
                        }
                        className={styles.slideImage}
                        containerClassName={styles.slideImageContainer}
                        width={200}
                        height={120}
                        shadowBlur={30}
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
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {recommendation.top_pois.length > 0 ? (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard2}
        >
          {' '}
          <div className={styles.colorStrip} />
          <div className={styles.cardContent}>
            <div className={styles.header}>
              <div className={styles.headerLine}>
                {' '}
                <div className={styles.headerUpLine}> Must Visit</div>{' '}
              </div>
              <div className={styles.headerLine}>
                {' '}
                <div className={styles.headerTitle}>Attractions</div>{' '}
              </div>
              <hr className={styles.hr} />
            </div>

            <div className={styles.content}>
              <div className={styles.events}>
                {recommendation.top_pois.map(poi => (
                  <div key={`poi-${poi.id}`} className={styles.slide2}>
                    <Image
                      src={poi.imageLink}
                      className={styles.slideImage2}
                      containerClassName={styles.slideImageContainer2}
                      width={200}
                      height={120}
                      shadowBlur={30}
                      alt={poi.name}
                      key={poi.id}
                    />
                    <div className="flex center">
                      <div className={styles.slideText3}>{poi.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {recommendation.hotel_price ||
      recommendation.hostel_price ||
      recommendation.rental_price ? (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard2}
        >
          {' '}
          <div className={styles.colorStrip} />
          <div className={styles.cardContent}>
            <div className={styles.header}>
              <div className={styles.headerLine}>
                {' '}
                <div className={styles.headerUpLine}> Costs</div>{' '}
              </div>
              <div className={styles.headerLine}>
                {' '}
                <div className={styles.headerTitle}>Acommodation</div>{' '}
              </div>
              <hr className={styles.hr} />
            </div>

            <div className={styles.content}>
              {recommendation.hotel_price ? (
                <div className={styles.contentElement}>
                  <div className={styles.elementIcon}>
                    {' '}
                    <Acommodation />
                  </div>
                  <div className={styles.elementText}>
                    Hotel: ${Math.floor(recommendation.hotel_price)}
                  </div>
                </div>
              ) : null}
              {recommendation.hostel_price ? (
                <div className={styles.contentElement}>
                  <div className={styles.elementIcon}>
                    {' '}
                    <Acommodation />
                  </div>
                  <div className={styles.elementText}>
                    Hostel: ${Math.floor(recommendation.hostel_price)}
                  </div>
                </div>
              ) : null}
              {recommendation.rental_price ? (
                <div className={styles.contentElement}>
                  <div className={styles.elementIcon}>
                    {' '}
                    <Acommodation />
                  </div>
                  <div className={styles.elementText}>
                    Airbnb: ${Math.floor(recommendation.rental_price)}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        ) : null}
    </>
  )
}

export default Details
