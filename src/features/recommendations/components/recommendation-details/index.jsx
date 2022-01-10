/* eslint-disable max-len */
import React from 'react'
import { Image } from 'components'

import styles from './recommendation-details.module.scss'
import activityImages from './activity-images.json'
import moment from 'moment'

import { ReactComponent as Passport } from 'assets/images/new-icons/passport.svg'
import { ReactComponent as Acommodation } from 'assets/images/new-icons/acommodation.svg'
import { ReactComponent as Calendar } from 'assets/images/new-icons/calendar.svg'
import { ReactComponent as Vaccine } from 'assets/images/new-icons/vaccine.svg'
import { ReactComponent as Quarantine } from 'assets/images/new-icons/quarantine.svg'
import { ReactComponent as Attraction } from 'assets/images/new-icons/attraction.svg'
import { ReactComponent as Cloud } from 'assets/images/new-icons/cloud.svg'
import { ReactComponent as Mask } from 'assets/images/new-icons/mask.svg'
import { ReactComponent as Transport } from 'assets/images/new-icons/transport.svg'
import { formatAsMonthDay } from 'utils/date'
import { processRecommendation } from 'utils/recommendation'

const Details = ({ recommendation, passports }) => {

  const {
    startDate,
    endDate
  } = recommendation

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
    publicTransportText
  } = processRecommendation(recommendation, passports)


  return (
    <>
      <div className={styles.oneRow}>
        <h1 className={styles.title}>
          {recommendation ? recommendation.name : 'Go back to your recommendations'}
        </h1>
      </div>
      <div
        className={styles.recommendationCard}
      >
        {' '}
        <div className={styles.colorStrip}/>
        <div className={styles.cardContent}>
          <div className={styles.header}>
            <div className={styles.headerLine}>
              {' '}
              <div className={styles.headerUpLine}> Overview</div>
              {' '}
            </div>
            <div className={styles.headerLine}>
              {' '}
              <div className={styles.headerTitle}>Highlights</div>
              {' '}
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
            {visaText && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Passport/>
                </div>
                <div className={styles.elementText}>{visaText}</div>
              </div>)
            }
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Cloud/>
              </div>
              <div className={styles.elementText}>{temperatureText}</div>
            </div>
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Cloud/>
              </div>
              <div className={styles.elementText}>{weatherText}</div>
            </div>
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Mask/>
              </div>
              <div className={styles.elementText}>{maskText}</div>
            </div>
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
              <div className={styles.elementText}>
                {vaccinatedQuarantineText}
              </div>
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
        <div className={styles.colorStrip}/>
        <div className={styles.cardContent}>
          <div className={styles.header}>
            <div className={styles.headerLine}>
              {' '}
              <div className={styles.headerUpLine}> Overview</div>
              {' '}
            </div>
            <div className={styles.headerLine}>
              {' '}
              <div className={styles.headerTitle}>Status</div>
              {' '}
            </div>
            <hr className={styles.hr}/>
          </div>

          <div className={styles.content}>
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Attraction/>
              </div>
              <div className={styles.elementText}>{barText}</div>
            </div>
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Attraction/>
              </div>
              <div className={styles.elementText}>{restaurantText}</div>
            </div>
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Attraction/>
              </div>
              <div className={styles.elementText}>{attractionsText}</div>
            </div>
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Transport/>
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
          <div className={styles.colorStrip}/>
          <div className={styles.cardContent}>
            <div className={styles.header}>
              <div className={styles.headerLine}>
                {' '}
                <div className={styles.headerUpLine}> Major</div>
                {' '}
              </div>
              <div className={styles.headerLine}>
                {' '}
                <div className={styles.headerTitle}>Events</div>
                {' '}
              </div>
              <hr className={styles.hr}/>
            </div>

            <div className={styles.content}>
              <div className={styles.events}>
                {recommendation.events.map(event => (
                  <div key={`event-${event.eid}`} className={styles.slide}>
                    <Image
                      src={
                        event.images &&
                        event.images.length > 0 &&
                        event.images[0]
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
          <div className={styles.colorStrip}/>
          <div className={styles.cardContent}>
            <div className={styles.header}>
              <div className={styles.headerLine}>
                {' '}
                <div className={styles.headerUpLine}> Costs</div>
                {' '}
              </div>
              <div className={styles.headerLine}>
                {' '}
                <div className={styles.headerTitle}>Acommodation</div>
                {' '}
              </div>
              <hr className={styles.hr}/>
            </div>

            <div className={styles.content}>
              {(recommendation.hotel_price_min ||
                recommendation.hotel_price_max) &&
              recommendation.hotel_price_min !==
              recommendation.hotel_price_max ? (
                <div className={styles.contentElement}>
                  <div className={styles.elementIcon}>
                    {' '}
                    <Acommodation/>
                  </div>
                  <div className={styles.elementText}>
                    Hotel prices range from ${Math.floor(
                    recommendation.hotel_price_min
                  )}{' '}
                    to ${Math.floor(recommendation.hotel_price_max)}.
                  </div>
                </div>
                ) : (
                  Math.floor(recommendation.hotel_price_min) !== 0 && (
                  <div className={styles.contentElement}>
                    <div className={styles.elementIcon}>
                      {' '}
                      <Acommodation/>
                    </div>
                    <div className={styles.elementText}>
                      Average Hotel price is ${Math.floor(
                      recommendation.hotel_price_min
                    )}.
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
                    <Acommodation/>
                  </div>
                  <div className={styles.elementText}>
                    Hostel prices range from ${Math.floor(
                    recommendation.hostel_price_min
                  )}{' '}
                    to ${Math.floor(recommendation.hostel_price_max)}.
                  </div>
                </div>
                ) : (
                  Math.floor(recommendation.hostel_price_min) !== 0 && (
                  <div className={styles.contentElement}>
                    <div className={styles.elementIcon}>
                      {' '}
                      <Acommodation/>
                    </div>
                    <div className={styles.elementText}>
                      Average hostel price is ${Math.floor(
                      recommendation.hostel_price_min
                    )}.
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
                    <Acommodation/>
                  </div>
                  <div className={styles.elementText}>
                    Airbnb prices range from ${Math.floor(
                    recommendation.vacation_rental_price_min
                  )}{' '}
                    to ${Math.floor(recommendation.vacation_rental_price_max)}.
                  </div>
                </div>
                ) : (
                  Math.floor(recommendation.vacation_rental_price_min) !== 0 && (
                  <div className={styles.contentElement}>
                    <div className={styles.elementIcon}>
                      {' '}
                      <Acommodation/>
                    </div>
                    <div className={styles.elementText}>
                      Average Airbnb price is ${Math.floor(
                      recommendation.vacation_rental_price_min
                    )}.
                    </div>
                  </div>
                  )
                )}
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
          <div className={styles.colorStrip}/>
          <div className={styles.cardContent}>
            <div className={styles.header}>
              <div className={styles.headerLine}>
                {' '}
                <div className={styles.headerUpLine}> Must Visit</div>
                {' '}
              </div>
              <div className={styles.headerLine}>
                {' '}
                <div className={styles.headerTitle}>Attractions</div>
                {' '}
              </div>
              <hr className={styles.hr}/>
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
          <div className={styles.colorStrip}/>
          <div className={styles.cardContent}>
            <div className={styles.header}>
              <div className={styles.headerLine}>
                {' '}
                <div className={styles.headerUpLine}>Must Do</div>
                {' '}
              </div>
              <div className={styles.headerLine}>
                {' '}
                <div className={styles.headerTitle}>Activities</div>
                {' '}
              </div>
              <hr className={styles.hr}/>
            </div>

            <div className={styles.content}>
              <div className={styles.events}>
                {recommendation.activities.map(activity => (
                  <div key={`activitiy-${activity}`} className={styles.slide2}>
                    <Image
                      src={
                        activityImages[activity].image
                      }
                      className={styles.slideImage2}
                      width={200}
                      height={120}
                      alt={activity}
                      key={activity}
                    />
                    <div className="flex center">
                      {recommendation.startDate !== recommendation.endDate ? (
                        <div className={styles.slideText3}>
                          {activity} from{' '}
                          {moment(Date.parse(startDate)).format(
                            'MMMM'
                          )}{' '}
                          to{' '}
                          {moment(Date.parse(endDate)).format(
                            'MMMM'
                          )}
                        </div>
                      ) : (
                        <div className={styles.slideText3}>
                          {activity} in{' '}
                          {moment(Date.parse(startDate)).format(
                            'MMMM'
                          )}{' '}
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
