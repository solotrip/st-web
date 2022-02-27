/* eslint-disable max-len */
import React from 'react'
import { Image } from 'components'

import styles from './recommendation-details.module.scss'
import activityImages from './activity-images.json'
import moment from 'moment'

import useThemeState from 'utils/hooks/use-theme-state'

import { ReactComponent as Passport } from 'assets/images/new-icons/passport.svg'
import { ReactComponent as Acommodation } from 'assets/images/new-icons/acommodation.svg'
import { ReactComponent as Calendar } from 'assets/images/new-icons/calendar.svg'
import { ReactComponent as Vaccine } from 'assets/images/new-icons/vaccine.svg'
import { ReactComponent as Quarantine } from 'assets/images/new-icons/quarantine.svg'
import { ReactComponent as Attraction } from 'assets/images/new-icons/attraction.svg'
import { ReactComponent as Cloud } from 'assets/images/new-icons/cloud.svg'
import { ReactComponent as Mask } from 'assets/images/new-icons/mask.svg'
import { ReactComponent as Transport } from 'assets/images/new-icons/transport.svg'
import { ReactComponent as Food } from 'assets/images/new-icons/food.svg'
import { ReactComponent as Star } from 'assets/images/new-icons/events.svg'

import { formatAsMonthDay } from 'utils/date'
import { processRecommendation } from 'utils/recommendation'

const Details = ({
  recommendation,
  passports,
  query,
  toggleWishlist,
  wishlisted,
  currencyCoefficient = 1,
  currency = 'USD',
  distanceUnit = 'km',
  temperatureUnit = '°C',
  distanceCoefficient = 1,
  temperaturize
}) => {
  const { startDate, endDate } = recommendation
  const [appTheme] = useThemeState()

  const {
    visaText,
    vaccinatedTestText,
    vaccinatedQuarantineText,
    unvaccinatedTestText,
    unvaccinatedQuarantineText,
    restaurantText,
    attractionsText,
    temperatureText,
    weatherText,
    maskText,
    barText,
    publicTransportText,
    minTemp,
    maxTemp
  } = processRecommendation(recommendation, passports)

  return (
    <>
      <div className={styles.oneRow}>
        <h1 className={styles.title}>
          {recommendation
            ? recommendation.name
            : 'Go back to your recommendations'}
        </h1>
        <button
          className={wishlisted ? styles.heartFilled : styles.heart}
          onClick={() =>
            toggleWishlist({
              query: query.query,
              recommendation
            })
          }
        />
      </div>
      <div className={styles.recommendationCard}>
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
                {formatAsMonthDay(startDate)}
                {startDate !== endDate
                  ? ` - ${formatAsMonthDay(endDate)}`
                  : ''}{' '}
              </div>
            </div>
            {visaText && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Passport />
                </div>
                <div className={styles.elementText}>{visaText}</div>
              </div>
            )}
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Cloud />
              </div>
              <div className={styles.elementText}>
                {' '}
                min {temperaturize(minTemp)}
                {temperatureUnit}, max {temperaturize(maxTemp)}
                {temperatureUnit}
              </div>
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
        className={styles.recommendationCard}
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
      {recommendation.events && recommendation.events.length > 0 ? (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard}
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
                {recommendation.events.map(event => (
                  <div key={`event-${event.eid}`} className={styles.slide}>
                    <Image
                      src={
                        event.images && event.images.length > 0
                          ? event.images[0]
                          : appTheme !== 'light'
                            ? 'https://ik.imagekit.io/rfjpogvdn8p/darkplaceholder_oP8oGnR_A.png?ik-sdk-version=javascript-1.4.3&updatedAt=1646003262784'
                            : 'https://ik.imagekit.io/rfjpogvdn8p/lightplaceholder_K7Q0Pfos6.png?ik-sdk-version=javascript-1.4.3&updatedAt=1646003263016'
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
                    <div className={styles.slideText4}>
                      {formatAsMonthDay(event.start)}
                      {event.start !== event.end
                        ? ` - ${formatAsMonthDay(event.end)}`
                        : ''}{' '}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {recommendation.hotel_price_min ||
      recommendation.hostel_price_min ||
      recommendation.vacation_rental_price_min ||
      recommendation.hotel_price_max ||
      recommendation.hostel_price_max ||
      recommendation.vacation_rental_price_max ? (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard}
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
              {(recommendation.hotel_price_min ||
                recommendation.hotel_price_max) &&
              recommendation.hotel_price_min !==
                recommendation.hotel_price_max ? (
                <div className={styles.contentElement}>
                  <div className={styles.elementIcon}>
                    {' '}
                    <Acommodation />
                  </div>
                  <div className={styles.elementText}>
                    Hotel prices range from{' '}
                    {Math.floor(
                      recommendation.hotel_price_min * currencyCoefficient
                    )}{' '}
                    {currency} to{' '}
                    {Math.floor(
                      recommendation.hotel_price_max * currencyCoefficient
                    )}{' '}
                    {currency}.
                  </div>
                </div>
                ) : (
                  Math.floor(recommendation.hotel_price_min) !== 0 && (
                  <div className={styles.contentElement}>
                    <div className={styles.elementIcon}>
                      {' '}
                      <Acommodation />
                    </div>
                    <div className={styles.elementText}>
                      Average Hotel price is{' '}
                      {Math.floor(
                        recommendation.hotel_price_min * currencyCoefficient
                      )}{' '}
                      {currency}.
                    </div>
                  </div>
                  )
                )}
              {(recommendation.hostel_price_min ||
                recommendation.hostel_price_max) &&
              recommendation.hostel_price_min !==
                recommendation.hostel_price_max ? (
                <div className={styles.contentElement}>
                  <div className={styles.elementIcon}>
                    {' '}
                    <Acommodation />
                  </div>
                  <div className={styles.elementText}>
                    Hostel prices range from{' '}
                    {Math.floor(
                      recommendation.hostel_price_min * currencyCoefficient
                    )}{' '}
                    {currency} to ${Math.floor(recommendation.hostel_price_max)}.
                  </div>
                </div>
                ) : (
                  Math.floor(recommendation.hostel_price_min) !== 0 && (
                  <div className={styles.contentElement}>
                    <div className={styles.elementIcon}>
                      {' '}
                      <Acommodation />
                    </div>
                    <div className={styles.elementText}>
                      Average hostel price is{' '}
                      {Math.floor(
                        recommendation.hostel_price_min * currencyCoefficient
                      )}{' '}
                      {currency}.
                    </div>
                  </div>
                  )
                )}
              {(recommendation.vacation_rental_price_min ||
                recommendation.vacation_rental_price_max) &&
              recommendation.vacation_rental_price_min !==
                recommendation.vacation_rental_price_max ? (
                <div className={styles.contentElement}>
                  <div className={styles.elementIcon}>
                    {' '}
                    <Acommodation />
                  </div>
                  <div className={styles.elementText}>
                    Airbnb prices range from{' '}
                    {Math.floor(
                      recommendation.vacation_rental_price_min *
                        currencyCoefficient
                    )}{' '}
                    {currency} to{' '}
                    {Math.floor(
                      recommendation.vacation_rental_price_max *
                        currencyCoefficient
                    )}{' '}
                    {currency}.
                  </div>
                </div>
                ) : (
                  Math.floor(recommendation.vacation_rental_price_min) !== 0 && (
                  <div className={styles.contentElement}>
                    <div className={styles.elementIcon}>
                      {' '}
                      <Acommodation />
                    </div>
                    <div className={styles.elementText}>
                      Average Airbnb price is{' '}
                      {Math.floor(
                        recommendation.vacation_rental_price_min *
                          currencyCoefficient
                      )}{' '}
                      {currency}.
                    </div>
                  </div>
                  )
                )}
            </div>
          </div>
        </div>
        ) : null}
      {recommendation.cost_of_living_labels &&
      recommendation.cost_of_living_labels !== null &&
      recommendation.cost_of_living_labels !== undefined ? (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard}
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
                <div className={styles.headerTitle}>Cost of Living</div>{' '}
              </div>
              <hr className={styles.hr} />
              <div className={styles.content}>
                {recommendation.cost_of_living_labels
                  .meal_cheap_restaurant_cost_label && (
                  <div className={styles.contentElement2}>
                    <div className={styles.elementText2}>
                      <div className={styles.elementIcon2}>
                        {' '}
                        <Food />
                      </div>Meal at Cheap Restaurant
                    </div>
                    <div className={styles.elementText2}>
                      {
                        recommendation.cost_of_living_labels
                          .meal_cheap_restaurant_cost_label
                      }
                    </div>
                  </div>
                )}
                {recommendation.cost_of_living_labels
                  .meal_mid_range_restaurant_cost_label && (
                  <div className={styles.contentElement2}>
                    <div className={styles.elementText2}>
                      <div className={styles.elementIcon2}>
                        {' '}
                        <Food />
                      </div>Meal at Expensive Restaurant
                    </div>
                    <div className={styles.elementText2}>
                      {
                        recommendation.cost_of_living_labels
                          .meal_mid_range_restaurant_cost_label
                      }
                    </div>
                  </div>
                )}
                {recommendation.cost_of_living_labels
                  .mcmeal_at_mcdonalds_cost_label && (
                  <div className={styles.contentElement2}>
                    <div className={styles.elementText2}>
                      <div className={styles.elementIcon2}>
                        {' '}
                        <Food />
                      </div>McDonalds Menu
                    </div>
                    <div className={styles.elementText2}>
                      {
                        recommendation.cost_of_living_labels
                          .mcmeal_at_mcdonalds_cost_label
                      }
                    </div>
                  </div>
                )}
                {recommendation.cost_of_living_labels
                  .beer_at_restaurant_cost_label && (
                  <div className={styles.contentElement2}>
                    <div className={styles.elementText2}>
                      {' '}
                      <div className={styles.elementIcon2}>
                        {' '}
                        <Food />
                      </div>Beer at Restaurant
                    </div>
                    <div className={styles.elementText2}>
                      {
                        recommendation.cost_of_living_labels
                          .beer_at_restaurant_cost_label
                      }
                    </div>
                  </div>
                )}
                {recommendation.cost_of_living_labels
                  .public_transport_cost_label && (
                  <div className={styles.contentElement2}>
                    <div className={styles.elementText2}>
                      {' '}
                      <div className={styles.elementIcon3}>
                        {' '}
                        <Transport />
                      </div>Public Transport
                    </div>
                    <div className={styles.elementText2}>
                      {
                        recommendation.cost_of_living_labels
                          .public_transport_cost_label
                      }
                    </div>
                  </div>
                )}
                {recommendation.cost_of_living_labels
                  .beer_from_market_label && (
                  <div className={styles.contentElement2}>
                    <div className={styles.elementText2}>
                      {' '}
                      <div className={styles.elementIcon2}>
                        {' '}
                        <Food />
                      </div>Beer from Market
                    </div>
                    <div className={styles.elementText2}>
                      {
                        recommendation.cost_of_living_labels
                          .beer_from_market_label
                      }
                    </div>
                  </div>
                )}
                {recommendation.cost_of_living_labels
                  .montly_transport_pass_label && (
                  <div className={styles.contentElement2}>
                    <div className={styles.elementText2}>
                      <div className={styles.elementIcon3}>
                        {' '}
                        <Transport />
                      </div>Monthly Transport Pass
                    </div>
                    <div className={styles.elementText2}>
                      {
                        recommendation.cost_of_living_labels
                          .montly_transport_pass_label
                      }
                    </div>
                  </div>
                )}
                {recommendation.cost_of_living_labels
                  .gasoline_1_liter_cost_label && (
                  <div className={styles.contentElement2}>
                    <div className={styles.elementText2}>
                      {' '}
                      <div className={styles.elementIcon3}>
                        {' '}
                        <Transport />
                      </div>Gasoline 1 Liter
                    </div>
                    <div className={styles.elementText2}>
                      {
                        recommendation.cost_of_living_labels
                          .gasoline_1_liter_cost_label
                      }
                    </div>
                  </div>
                )}
                {recommendation.cost_of_living_labels
                  .prepaid_card_cost_label && (
                  <div className={styles.contentElement2}>
                    <div className={styles.elementText2}>
                      {' '}
                      <div className={styles.elementIcon2}>
                        {' '}
                        <Star />
                      </div>Prepaid Card
                    </div>
                    <div className={styles.elementText2}>
                      {
                        recommendation.cost_of_living_labels
                          .prepaid_card_cost_label
                      }
                    </div>
                  </div>
                )}
                {recommendation.cost_of_living_labels.internet_cost_label && (
                  <div className={styles.contentElement2}>
                    <div className={styles.elementText2}>
                      {' '}
                      <div className={styles.elementIcon2}>
                        {' '}
                        <Star />
                      </div>Internet
                    </div>
                    <div className={styles.elementText2}>
                      {recommendation.cost_of_living_labels.internet_cost_label}
                    </div>
                  </div>
                )}
                {recommendation.cost_of_living_labels
                  .cinema_ticket_cost_label && (
                  <div className={styles.contentElement2}>
                    <div className={styles.elementText2}>
                      {' '}
                      <div className={styles.elementIcon2}>
                        {' '}
                        <Star />
                      </div>Cinema Ticket
                    </div>
                    <div className={styles.elementText2}>
                      {
                        recommendation.cost_of_living_labels
                          .cinema_ticket_cost_label
                      }
                    </div>
                  </div>
                )}
                {recommendation.cost_of_living_labels.taxi_1km_cost_label && (
                  <div className={styles.contentElement2}>
                    <div className={styles.elementText2}>
                      {' '}
                      <div className={styles.elementIcon3}>
                        {' '}
                        <Transport />
                      </div>Taxi 1km
                    </div>
                    <div className={styles.elementText2}>
                      {recommendation.cost_of_living_labels.taxi_1km_cost_label}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        ) : null}
      {recommendation.top_pois && recommendation.top_pois.length > 0 ? (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard}
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
                      width={200}
                      height={120}
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
      {recommendation.activities && recommendation.activities.length > 0 ? (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard}
        >
          {' '}
          <div className={styles.colorStrip} />
          <div className={styles.cardContent}>
            <div className={styles.header}>
              <div className={styles.headerLine}>
                {' '}
                <div className={styles.headerUpLine}>Must Do</div>{' '}
              </div>
              <div className={styles.headerLine}>
                {' '}
                <div className={styles.headerTitle}>Activities</div>{' '}
              </div>
              <hr className={styles.hr} />
            </div>

            <div className={styles.content}>
              <div className={styles.events}>
                {recommendation.activities.map(activity => (
                  <div key={`activitiy-${activity}`} className={styles.slide2}>
                    <Image
                      src={activityImages[activity].image}
                      className={styles.slideImage2}
                      width={200}
                      height={120}
                      alt={activity}
                      key={activity}
                    />
                    <div className="flex center">
                      {moment(Date.parse(startDate)).format('MMMM') !==
                        'Invalid date' &&
                      moment(Date.parse(endDate)).format('MMMM') !==
                        'Invalid date' &&
                      moment(Date.parse(startDate)).format('MMMM') !==
                        moment(Date.parse(endDate)).format('MMMM') ? (
                        <div className={styles.slideText3}>
                          {activity} from{' '}
                          {moment(Date.parse(startDate)).format('MMMM')} to{' '}
                          {moment(Date.parse(endDate)).format('MMMM')}
                        </div>
                        ) : (
                        <div className={styles.slideText3}>
                          {activity} in{' '}
                          {moment(Date.parse(startDate)).format('MMMM')}{' '}
                        </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Details
