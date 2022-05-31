import React from 'react'
import { Link } from 'react-router-dom'
import styles from './recommendation.module.scss'
import { Currency, HorizontalList, Image, Temperature } from 'components'
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
import useThemeState from 'utils/hooks/use-theme-state'
import { formatAsMonthDay, formatTripDates } from 'utils/date'
import { getEventImage, getEventSourceSet, processRecommendation } from 'utils/recommendation'
import ContentLoader from 'react-content-loader'
import { SUPPORTED_SIZES } from '../../../../utils/image'
import { BsHeartFill, BsHeart } from 'react-icons/bs'

const Recommendation = ({
  recommendation,
  query,
  queryString,
  wishlisted,
  toggleWishlist,
  basePath,
  index
}) => {
  const {
    sid,
    country,
    name,
    startDate,
    endDate,
    duration,
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
  const [appTheme] = useThemeState()

  return (
    <div className={styles.recommendationCard}>
      {' '}
      <div className={styles.colorStrip} />
      <div className={styles.cardContent}>
        <div className={styles.header}>
          <div className={styles.headerLine}>
            {' '}
            <div className={styles.country}>
              {' '}
              <div className={styles.countryElement}>{country.emoji_flag}</div>
              &nbsp;
              <div>{country.name}</div>
            </div>{' '}
            <button
              className={styles.heart}
              onClick={() =>
                toggleWishlist({
                  query,
                  recommendation
                })
              }
            >
              {wishlisted ? (
                <BsHeartFill className={styles.likeIconFilled} />
              ) : (
                <BsHeart className={styles.likeIcon} />
              )}
            </button>
          </div>
          <div className={styles.headerLine}>
            {' '}
            <div className={styles.headerTitle}>{name}</div>{' '}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Calendar />
            </div>

            <div className={styles.elementText}>
              <div className={styles.elementHighlight}>
                {formatTripDates(startDate, endDate, duration)}
              </div>
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
          {country &&
            country.safety &&
            country.safety.riskLevel && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Passport />
                </div>
                <div className={styles.elementText}>Safety: {country.safety.riskLevel}</div>
              </div>
          )}
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              <Cloud />
            </div>
            <div className={styles.elementText}>
              min &nbsp;
              <div className={styles.elementHighlight}>
                <Temperature value={minTemp} />{' '}
              </div>
              , max &nbsp;
              <div className={styles.elementHighlight}>
                <Temperature value={maxTemp} />
              </div>
            </div>
          </div>

          {(hotelPriceMin || hotelPriceMax) && hotelPriceMin !== hotelPriceMax ? (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Accommodation />
              </div>
              <div className={styles.elementText}>
                Hotel prices range from &nbsp;
                <div className={styles.elementHighlight}>
                  <Currency value={hotelPriceMin} />{' '}
                </div>
                &nbsp;to&nbsp;
                <div className={styles.elementHighlight}>
                  <Currency value={hotelPriceMax} />
                </div>
                .
              </div>
            </div>
          ) : (
            Math.floor(hotelPriceMin) !== 0 && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Accommodation />
                </div>
                <div className={styles.elementText}>
                  Average Hotel price is&nbsp;
                  <div className={styles.elementHighlight}>
                    <Currency value={hotelPriceMin} />
                  </div>
                  .
                </div>
              </div>
            )
          )}
          {(hostelPriceMin || hostelPriceMax) && hostelPriceMin !== hostelPriceMax ? (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                <Accommodation />
              </div>
              <div className={styles.elementText}>
                Hostel prices range from&nbsp;
                <div className={styles.elementHighlight}>
                  <Currency value={hostelPriceMin} />
                </div>
                &nbsp;to&nbsp;
                <div className={styles.elementHighlight}>
                  <Currency value={hostelPriceMax} />{' '}
                </div>
                .
              </div>
            </div>
          ) : (
            Math.floor(hostelPriceMin) !== 0 && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  <Accommodation />
                </div>
                <div className={styles.elementText}>
                  Average hostel price is&nbsp;
                  <div className={styles.elementHighlight}>
                    <Currency value={hostelPriceMin} />
                  </div>
                  .
                </div>
              </div>
            )
          )}
          {(vacationRentalPriceMin || vacationRentalPriceMax) &&
          vacationRentalPriceMin !== vacationRentalPriceMax ? (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                <Accommodation />
              </div>
              <div className={styles.elementText}>
                Vacation rental prices range from&nbsp;
                <div className={styles.elementHighlight}>
                  <Currency value={vacationRentalPriceMin} />
                </div>
                &nbsp;to &nbsp;
                <div className={styles.elementHighlight}>
                  <Currency value={vacationRentalPriceMax} />
                </div>
                .
              </div>
            </div>
            ) : (
              Math.floor(vacationRentalPriceMin) !== 0 && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  <Accommodation />
                </div>
                <div className={styles.elementText}>
                  Average vacation rental price is &nbsp;
                  <div className={styles.elementHighlight}>
                    <Currency value={vacationRentalPriceMin} />
                  </div>
                  .
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
                {fastestFlightCost && (
                  <>
                    {'Fastest: '}
                    <div className={styles.elementHighlight}>
                      <Currency value={fastestFlightCost} /> &nbsp;
                    </div>
                  </>
                )}
                {fastestFlightCost && (
                  <>
                    {',Cheapest: '}
                    <div className={styles.elementHighlight}>
                      &nbsp; <Currency value={cheapestFlightCost} /> &nbsp;
                    </div>
                  </>
                )}
                {fastestFlightCost && (
                  <>
                    {',Best: '}
                    <div className={styles.elementHighlight}>
                      &nbsp; <Currency value={bestFlightCost} /> &nbsp;
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Vaccine />
            </div>
            <div className={styles.elementText}>
              {' '}
              <div
                className={
                  vaccinatedTestText.includes('Test Required')
                    ? styles.elementRed
                    : vaccinatedTestText.includes('Test not required') && styles.elementGreen
                }
              >
                {vaccinatedTestText}
              </div>
            </div>
          </div>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Vaccine />
            </div>
            <div className={styles.elementText}>
              {' '}
              <div
                className={
                  unvaccinatedTestText.includes('Test Required')
                    ? styles.elementRed
                    : unvaccinatedTestText.includes('Test not required') && styles.elementGreen
                }
              >
                {unvaccinatedTestText}{' '}
              </div>{' '}
            </div>
          </div>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Quarantine />
            </div>
            <div className={styles.elementText}>
              <div
                className={
                  vaccinatedQuarantineText.includes('Quarantine Required')
                    ? styles.elementRed
                    : vaccinatedQuarantineText.includes('Quarantine not required') &&
                      styles.elementGreen
                }
              >
                {vaccinatedQuarantineText}
              </div>
            </div>
          </div>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Quarantine />
            </div>
            <div className={styles.elementText}>
              <div
                className={
                  unvaccinatedQuarantineText.includes('Quarantine Required')
                    ? styles.elementRed
                    : unvaccinatedQuarantineText.includes('Quarantine not required') &&
                      styles.elementGreen
                }
              >
                {unvaccinatedQuarantineText}
              </div>
            </div>
          </div>

          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Attraction />
            </div>
            <div className={styles.elementText}>
              <div
                className={
                  attractionsText.includes('Attractions are closed')
                    ? styles.elementRed
                    : attractionsText.includes('Attractions are open')
                      ? styles.elementGreen
                      : 'Attractions are restricted' && styles.elementYellow
                }
              >
                {attractionsText}
              </div>
            </div>
          </div>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Food />
            </div>
            <div className={styles.elementText}>
              <div
                className={
                  restaurantText.includes('Restaurants are closed')
                    ? styles.elementRed
                    : restaurantText.includes('Restaurants are open')
                      ? styles.elementGreen
                      : 'Restaurants are restricted' && styles.elementYellow
                }
              >
                {restaurantText}
              </div>
            </div>
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
            <HorizontalList
              slidesPerView={2}
              itemClassName={styles.horizontalListItem}
              items={events.map(event => (
                <div data-key={`${sid}-poi-${event.eid}`} className={styles.slide}>
                  <Image
                    src={getEventImage(event, appTheme === 'light', SUPPORTED_SIZES['1080'])}
                    srcsetProvided
                    srcset={getEventSourceSet(event, appTheme === 'light')}
                    className={styles.slideImage}
                    width={200}
                    height={120}
                    alt={event.title}
                    key={event.eid}
                  />
                  <div className={cn(styles.slideText, styles.eventDate)}>
                    {formatAsMonthDay(event.start)}
                    {event.start !== event.end ? ` - ${formatAsMonthDay(event.end)}` : ''}
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
            >
              Show Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

Recommendation.Skeleton = () => (
  <div className={styles.recommendationCard}>
    <ContentLoader
      speed={2}
      width="100%"
      height={565}
      viewBox="0 0 321 565"
      backgroundColor="var(--color-card-bg)"
      foregroundColor="var(--color-highlight-bg)"
    >
      <rect x="4" y="8" rx="4" ry="4" width="40%" height="16" />
      <rect x="4" y="32" rx="3" ry="3" width="60%" height="32" />
      <rect x="80%" y="48" rx="3" ry="3" width="20%" height="16" />
      <rect x="4" y="80" rx="3" ry="3" width="24" height="24" />
      <rect x="10%" y="84" rx="3" ry="3" width="80%" height="16" />
      <rect x="4" y="80" rx="3" ry="3" width="24" height="24" />
      <rect x="10%" y="84" rx="3" ry="3" width="50%" height="16" />
      <rect x="4" y="112" rx="3" ry="3" width="24" height="24" />
      <rect x="10%" y="116" rx="3" ry="3" width="70%" height="16" />
      <rect x="4" y="144" rx="3" ry="3" width="24" height="24" />
      <rect x="10%" y="148" rx="3" ry="3" width="60%" height="16" />
      <rect x="4" y="176" rx="3" ry="3" width="24" height="24" />
      <rect x="10%" y="180" rx="3" ry="3" width="80%" height="16" />
      <rect x="4" y="208" rx="3" ry="3" width="24" height="24" />
      <rect x="10%" y="212" rx="3" ry="3" width="40%" height="16" />
      <rect x="4" y="240" rx="3" ry="3" width="24" height="24" />
      <rect x="10%" y="244" rx="3" ry="3" width="75%" height="16" />
      <rect x="4" y="272" rx="3" ry="3" width="24" height="24" />
      <rect x="10%" y="276" rx="3" ry="3" width="65%" height="16" />
      <rect x="4" y="304" rx="3" ry="3" width="24" height="24" />
      <rect x="10%" y="308" rx="3" ry="3" width="80%" height="16" />
      <rect x="2%" y="340" rx="3" ry="3" width="30%" height="120" />
      <rect x="2%" y="468" rx="3" ry="3" width="30%" height="16" />
      <rect x="34%" y="340" rx="3" ry="3" width="30%" height="120" />
      <rect x="34%" y="468" rx="3" ry="3" width="30%" height="16" />
      <rect x="66%" y="340" rx="3" ry="3" width="30%" height="120" />
      <rect x="66%" y="468" rx="3" ry="3" width="30%" height="16" />
      <rect x="5%" y="510" rx="16" ry="16" width="90%" height="38" />
    </ContentLoader>
  </div>
)

export default Recommendation
