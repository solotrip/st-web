import React, { useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Card, Currency, Image, Temperature } from 'components'

import styles from './recommendation-details.module.scss'
import activityImages from './activity-images.json'
import dayjs from 'dayjs'

import { BsExclamationLg, BsHeartFill, BsInfoLg, BsHeart, BsBoxArrowUp } from 'react-icons/bs'
import { Icon } from '@iconify/react'
import { getImagePath, getSourceSet, SUPPORTED_SIZES } from 'utils/image'
import {
  Accommodation,
  Attraction,
  Calendar,
  Cloud,
  EventsIcon,
  Food,
  Mask,
  Passport,
  Quarantine,
  Star,
  Transport,
  Vaccine,
  LocationIcon
} from 'assets/images/new-icons'

import { formatAsMonthDay, formatTripDates, getMonthName } from 'utils/date'
import {
  getDefaultImage,
  getEventImage,
  getEventSourceSet,
  getPoiImage,
  processRecommendation
} from 'utils/recommendation'
import useThemeState from 'utils/hooks/use-theme-state'

const Details = ({ recommendation, passports, query, toggleWishlist, wishlisted }) => {
  const [appTheme] = useThemeState()
  const history = useHistory()
  const location = useLocation()
  const {
    id,
    name,
    sid,
    startDate,
    endDate,
    duration,
    events,
    hotel_price_min: hotelPriceMin,
    hotel_price_max: hotelPriceMax,
    hostel_price_min: hostelPriceMin,
    hostel_price_max: hostelPriceMax,
    vacation_rental_price_min: vacationRentalPriceMin,
    vacation_rental_price_max: vacationRentalPriceMax,
    cost_of_living_labels: colLabels,
    top_pois: topPois,
    activities,
    tripdays,
    area_has_image: areaHasImage,
    area_perex: description,
    area_description,
    lat,
    lon,
    country,
    best_time,
    experience
  } = recommendation

  const {
    visaText,
    vaccinatedTestText,
    vaccinatedQuarantineText,
    unvaccinatedTestText,
    unvaccinatedQuarantineText,
    restaurantText,
    attractionsText,
    maskText,
    barText,
    publicTransportText,
    minTemp,
    maxTemp,
    humidity,
    rainyDays
  } = processRecommendation(recommendation, passports)

  const startMonth = dayjs(startDate).isValid() && getMonthName(startDate)
  const endMonth = dayjs(endDate).isValid() && getMonthName(endDate)
  const uniqueEvents = [...new Map(events.map(event => [event['eid'], event])).values()]

  const openInNewTab = url => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const openShare = () => {
    history.push({
      pathname: `/recommendations/r/${id}/share`,
      search: query.queryString
    })
  }

  const goBack = () => {
    if (location.pathname.includes('/r/')) {
      history.replace({ pathname: '/recommendations', search: location.search })
    } else {
      history.push('/browse')
    }
  }

  const overviewRef = useRef(null)
  const eventsRef = useRef(null)
  const costsRef = useRef(null)
  const attractionsRef = useRef(null)

  function tabSelect(e) {
    if (e && e.target && e.target.textContent) {
      if (e.target.textContent === 'Overview') {
        overviewRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      } else if (e.target.textContent === 'Events' && eventsRef && eventsRef.current) {
        eventsRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        })
      } else if (e.target.textContent === 'Costs' && costsRef && costsRef.current) {
        costsRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        })
      } else if (
        e.target.textContent === 'Attractions' &&
        attractionsRef &&
        attractionsRef.current
      ) {
        attractionsRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        })
      }
    }
  }

  const costOfLivingReturner = value => {
    if (value.split('-').length > 0 && value.split('-')[0] && value.split('-')[1]) {
      return (
        <div className={styles.elementHighlight2}>
          <Currency value={parseInt(value.split('-')[0].split('$')[1])} /> -{' '}
          <Currency value={parseInt(value.split('-')[1].split('$')[1])} />
        </div>
      )
    } else if (value.split('+').length > 0) {
      return (
        <div className={styles.elementHighlight2}>
          <Currency value={parseInt(value.split('+')[0].split('$')[1])} /> +
        </div>
      )
    }
  }

  // eslint-disable-next-line no-unused-vars
  const tabs = (
    <div className={styles.tabs}>
      <button className={styles.tabItem} onClick={tabSelect}>
        <Icon icon="fluent:briefcase-24-regular" height="30" className={styles.tabIcon} />
        <span className={styles.tabName}>Overview</span>
      </button>
      <button className={styles.tabItem} onClick={tabSelect}>
        <Icon icon="fluent:phone-status-bar-24-regular" height="30" className={styles.tabIcon} />
        <span className={styles.tabName}>Status</span>
      </button>
      {uniqueEvents &&
        uniqueEvents.length > 0 && (
          <button className={styles.tabItem} onClick={tabSelect}>
            <Icon icon="carbon:event" height="30" className={styles.tabIcon} />
            <span className={styles.tabName}>Events</span>
          </button>
      )}
      {(hotelPriceMin ||
        hostelPriceMin ||
        vacationRentalPriceMin ||
        hotelPriceMax ||
        hostelPriceMax ||
        vacationRentalPriceMax) && (
        <button className={styles.tabItem} onClick={tabSelect}>
          <Icon icon="fluent:home-24-regular" height="30" className={styles.tabIcon} />
          <span className={styles.tabName}>Acommodation</span>
        </button>
      )}
      {colLabels && (
        <button className={styles.tabItem} onClick={tabSelect}>
          <Icon icon="fluent:money-hand-24-regular" height="30" className={styles.tabIcon} />
          <span className={styles.tabName}>Costs</span>
        </button>
      )}
      {topPois &&
        topPois.filter(poi => poi.poi_has_image === true).length > 0 && (
          <button className={styles.tabItem} onClick={tabSelect}>
            <Icon icon="fluent:location-24-regular" height="30" className={styles.tabIcon} />
            <span className={styles.tabName}>Attractions</span>
          </button>
      )}
    </div>
  )

  return (
    <div className={styles.page}>
      {areaHasImage && (
        <Image
          alt={name}
          height={400}
          srcsetProvided={true}
          src={getImagePath(`areas/${sid}`, SUPPORTED_SIZES['1080'])}
          srcset={getSourceSet(
            sid,
            [SUPPORTED_SIZES['1080'], SUPPORTED_SIZES['1920'], SUPPORTED_SIZES.original],
            'areas/'
          )}
          className={styles.headerImage}
          isRounded={false}
        />
      )}

      <div className={styles.headerHolder}>
        <div className={styles.oneRow}>
          <button className={styles.trackButton} onClick={goBack}>
            <Icon
              icon="fluent:ios-arrow-ltr-24-regular"
              color="#3cafeb"
              height="30"
              className={styles.bell}
            />
          </button>
          <h1 className={styles.title}>
            {recommendation ? name : 'Go back to your recommendations'}
          </h1>
          <button
            className={styles.heart}
            onClick={() =>
              toggleWishlist({
                query: query.query,
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
          <button onClick={openShare} className={styles.share}>
            <BsBoxArrowUp className={styles.shareIcon} />
          </button>
        </div>
        <div className={styles.holdzo}>
          <div className={styles.country}>
            {' '}
            <div className={styles.countryElement}>{country.emoji_flag}</div>
            &nbsp;
            <div>{country.name}</div>
          </div>{' '}
          <div ref={overviewRef} className={styles.contentElement3}>
            <div className={styles.elementIcon}>
              {' '}
              <Calendar />
            </div>
            <div className={styles.elementText3}>
              {formatTripDates(startDate, endDate, duration)}
            </div>
          </div>
          <div className={styles.description}>{description}</div>
        </div>

        <Card title="Overview" type="Highlights" className={styles.recommendationCard}>
          {events.length > 0 &&
            best_time === true && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  <LocationIcon />
                </div>

                <div className={styles.elementText}>
                  Reason for a trip:&nbsp;There are some good events and it is best time to visit
                </div>
              </div>
          )}
          {experience && (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                <EventsIcon />
              </div>

              <div className={styles.elementText}>{experience}</div>
            </div>
          )}
          {visaText && (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Passport />
              </div>
              <div className={styles.elementText}>{visaText}</div>
            </div>
          )}
          {minTemp &&
            maxTemp && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
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
          )}
          {typeof humidity !== 'undefined' &&
            typeof rainyDays !== 'undefined' && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Cloud />
                </div>
                <div className={styles.elementText}>
                  Humidity &nbsp;
                  <div className={styles.elementHighlight}>{humidity}%</div>
                  , Rainy days: &nbsp;
                  <div className={styles.elementHighlight}>{rainyDays} </div>{' '}
                  {rainyDays === '1' ? 'day/month' : 'days/month'}
                </div>
              </div>
          )}

          {tripdays &&
            tripdays.min_days &&
            tripdays.max_days && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Calendar />
                </div>
                {tripdays.min_days !== tripdays.max_days && (
                  <div className={styles.elementText}>
                    Most travelers spend &nbsp;
                    <div className={styles.elementHighlight}>{tripdays.min_days}</div>
                    &nbsp;-&nbsp;
                    <div className={styles.elementHighlight}>{tripdays.max_days}</div>
                    days.
                  </div>
                )}
                {tripdays.min_days === tripdays.max_days && (
                  <div className={styles.elementText}>
                    Most travelers spend &nbsp;
                    <div className={styles.elementHighlight}>{tripdays.min_days}</div>
                    &nbsp;days.
                  </div>
                )}
              </div>
          )}
          {tripdays &&
            ((!tripdays.min_days || !tripdays.max_days) && tripdays.ideal_days) && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Calendar />
                </div>
                <div className={styles.elementText}>
                  Most travelers spend &nbsp;
                  <div className={styles.elementHighlight}>{tripdays.ideal_days}</div>
                  &nbsp;-&nbsp; days.
                </div>
              </div>
          )}
          {maskText && (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Mask />
              </div>
              <div className={styles.elementText}>{maskText}</div>
            </div>
          )}
          {vaccinatedTestText && (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Vaccine />
              </div>
              <div className={styles.elementText}>{vaccinatedTestText}</div>
            </div>
          )}
          {unvaccinatedTestText && (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Vaccine />
              </div>
              <div className={styles.elementText}>{unvaccinatedTestText}</div>
            </div>
          )}
          {vaccinatedQuarantineText && (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Quarantine />
              </div>
              <div className={styles.elementText}>{vaccinatedQuarantineText}</div>
            </div>
          )}
          {unvaccinatedQuarantineText && (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Quarantine />
              </div>
              <div className={styles.elementText}>{unvaccinatedQuarantineText}</div>
            </div>
          )}

          {recommendation['country'] &&
            recommendation['country']['restrictions'] &&
            recommendation['country']['restrictions']['Health Check Up on Arrival'] && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Quarantine />
                </div>
                <div className={styles.elementText}>
                  {recommendation['country']['restrictions']['Health Check Up on Arrival']}
                </div>
              </div>
          )}
          {recommendation['country'] &&
            recommendation['country']['restrictions'] &&
            recommendation['country']['restrictions']['Covid 19 negative certificate'] && (
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Vaccine />
                </div>
                <div className={styles.elementText}>
                  {recommendation['country']['restrictions']['Covid 19 negative certificate']}
                </div>
              </div>
          )}
          {recommendation['country']['restrictions']['Official links'] &&
            recommendation['country']['restrictions']['Official links'].length > 0 &&
            recommendation['country']['restrictions']['Official links'][0].link && (
              <button
                className={styles.slideText8}
                onClick={() =>
                  openInNewTab(recommendation['country']['restrictions']['Official links'][0].link)
                }
              >
                Check Information on Official Website
              </button>
          )}
        </Card>

        <Card title="Status" type="Overview" className={styles.recommendationCard}>
          {barText && (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Attraction />
              </div>
              <div className={styles.elementText}>{barText}</div>
            </div>
          )}
          {restaurantText && (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Attraction />
              </div>
              <div className={styles.elementText}>{restaurantText}</div>
            </div>
          )}
          {attractionsText && (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Attraction />
              </div>
              <div className={styles.elementText}>{attractionsText}</div>
            </div>
          )}
          {publicTransportText && (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Transport />
              </div>
              <div className={styles.elementText}>{publicTransportText}</div>
            </div>
          )}
        </Card>
        {uniqueEvents && uniqueEvents.length > 0 ? (
          <Card title="Events" type="Major" className={styles.recommendationCard}>
            <div ref={eventsRef} className={styles.events}>
              {uniqueEvents.map(event => (
                <div key={`event-${event.eid}`} className={styles.slide2}>
                  <Image
                    src={getEventImage(event, appTheme === 'light', SUPPORTED_SIZES['1080'])}
                    srcsetProvided
                    srcset={getEventSourceSet(event, appTheme === 'light')}
                    className={styles.slideImageRow}
                    alt={event.title}
                    key={event.eid}
                  />
                  <div className={styles.sideContent}>
                    <div className={styles.sideContentTitle}>{event.title}</div>
                    <div className={styles.tagtextItem2}>
                      {formatAsMonthDay(event.start)}
                      {event.start !== event.end ? ` - ${formatAsMonthDay(event.end)}` : ''}{' '}
                    </div>

                    {event.url && (
                      <div className={styles.eventClick}>
                        <a href={event.url} className={styles.slideText9}>
                          <Icon
                            icon="charm:link-external"
                            height="30"
                            className={styles.poiDirect}
                          />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : null}
        {(hotelPriceMin ||
          hostelPriceMin ||
          vacationRentalPriceMin ||
          hotelPriceMax ||
          hostelPriceMax ||
          vacationRentalPriceMax) && (
          <Card title="Accommodation" type="Costs" className={styles.recommendationCard}>
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
                  {' '}
                  <Accommodation />
                </div>
                <div className={styles.elementText}>
                  Budget Inn prices range from&nbsp;
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
                    {' '}
                    <Accommodation />
                  </div>
                  <div className={styles.elementText}>
                    Average Budget Inn price is&nbsp;
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
                  {' '}
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
                    {' '}
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
          </Card>
        )}
        {colLabels && (
          <Card title="Cost of Living" type="Costs" className={styles.recommendationCard}>
            <div ref={costsRef}>
              {colLabels.meal_cheap_restaurant_cost_label && (
                <div className={styles.contentElement2}>
                  <div className={styles.elementText2}>
                    <div className={styles.elementIcon5}>
                      {' '}
                      <Food className={styles.food} />
                    </div>
                    <div>Meal at Cheap Restaurant</div>
                  </div>
                  <div className={styles.elementHighlight2}>
                    {costOfLivingReturner(colLabels.meal_cheap_restaurant_cost_label)}
                  </div>
                </div>
              )}
              {colLabels.meal_mid_range_restaurant_cost_label && (
                <div className={styles.contentElement2}>
                  <div className={styles.elementText2}>
                    <div className={styles.elementIcon5}>
                      {' '}
                      <Food />
                    </div>
                    Meal at Luxury Restaurant
                  </div>
                  <div className={styles.elementHighlight2}>
                    {costOfLivingReturner(colLabels.meal_mid_range_restaurant_cost_label)}
                  </div>
                </div>
              )}
              {colLabels.mcmeal_at_mcdonalds_cost_label && (
                <div className={styles.contentElement2}>
                  <div className={styles.elementText2}>
                    <div className={styles.elementIcon5}>
                      {' '}
                      <Food />
                    </div>
                    McDonalds Menu
                  </div>
                  <div className={styles.elementHighlight2}>
                    {costOfLivingReturner(colLabels.mcmeal_at_mcdonalds_cost_label)}
                  </div>
                </div>
              )}
              {colLabels.beer_at_restaurant_cost_label && (
                <div className={styles.contentElement2}>
                  <div className={styles.elementText2}>
                    {' '}
                    <div className={styles.elementIcon5}>
                      {' '}
                      <Food />
                    </div>
                    Beer at Restaurant
                  </div>
                  <div className={styles.elementHighlight2}>
                    {costOfLivingReturner(colLabels.beer_at_restaurant_cost_label)}
                  </div>
                </div>
              )}
              {colLabels.public_transport_cost_label && (
                <div className={styles.contentElement2}>
                  <div className={styles.elementText2}>
                    {' '}
                    <div className={styles.elementIcon5}>
                      {' '}
                      <Transport />
                    </div>
                    Public Transport
                  </div>
                  <div className={styles.elementHighlight2}>
                    {costOfLivingReturner(colLabels.public_transport_cost_label)}
                  </div>
                </div>
              )}
              {colLabels.beer_from_market_label && (
                <div className={styles.contentElement2}>
                  <div className={styles.elementText2}>
                    {' '}
                    <div className={styles.elementIcon5}>
                      {' '}
                      <Food />
                    </div>
                    Beer from Market
                  </div>
                  <div className={styles.elementHighlight2}>
                    {costOfLivingReturner(colLabels.beer_from_market_label)}
                  </div>
                </div>
              )}
              {colLabels.montly_transport_pass_label && (
                <div className={styles.contentElement2}>
                  <div className={styles.elementText2}>
                    <div className={styles.elementIcon5}>
                      {' '}
                      <Transport />
                    </div>
                    Monthly Transport Pass
                  </div>
                  <div className={styles.elementHighlight2}>
                    {costOfLivingReturner(colLabels.montly_transport_pass_label)}
                  </div>
                </div>
              )}
              {colLabels.gasoline_1_liter_cost_label && (
                <div className={styles.contentElement2}>
                  <div className={styles.elementText2}>
                    {' '}
                    <div className={styles.elementIcon5}>
                      {' '}
                      <Transport />
                    </div>
                    Gasoline 1 Liter
                  </div>
                  <div className={styles.elementHighlight2}>
                    {costOfLivingReturner(colLabels.gasoline_1_liter_cost_label)}
                  </div>
                </div>
              )}
              {colLabels.prepaid_card_cost_label && (
                <div className={styles.contentElement2}>
                  <div className={styles.elementText2}>
                    {' '}
                    <div className={styles.elementIcon5}>
                      {' '}
                      <EventsIcon />
                    </div>
                    Prepaid Card
                  </div>
                  <div className={styles.elementHighlight2}>
                    {costOfLivingReturner(colLabels.prepaid_card_cost_label)}
                  </div>
                </div>
              )}
              {colLabels.internet_cost_label && (
                <div className={styles.contentElement2}>
                  <div className={styles.elementText2}>
                    {' '}
                    <div className={styles.elementIcon5}>
                      {' '}
                      <Star />
                    </div>
                    Internet
                  </div>
                  <div className={styles.elementHighlight2}>
                    {costOfLivingReturner(colLabels.internet_cost_label)}
                  </div>
                </div>
              )}
              {colLabels.cinema_ticket_cost_label && (
                <div className={styles.contentElement2}>
                  <div className={styles.elementText2}>
                    {' '}
                    <div className={styles.elementIcon5}>
                      {' '}
                      <Star />
                    </div>
                    Cinema Ticket
                  </div>
                  <div className={styles.elementHighlight2}>
                    {' '}
                    {costOfLivingReturner(colLabels.cinema_ticket_cost_label)}
                  </div>
                </div>
              )}
              {colLabels.taxi_1km_cost_label && (
                <div className={styles.contentElement2}>
                  <div className={styles.elementText2}>
                    {' '}
                    <div className={styles.elementIcon5}>
                      {' '}
                      <Transport />
                    </div>
                    Taxi 1km
                  </div>
                  <div className={styles.elementHighlight2}>
                    {' '}
                    {costOfLivingReturner(colLabels.taxi_1km_cost_label)}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
        {country &&
          country.safety &&
          country.safety.description && (
            <Card title="Safety" type="Country" className={styles.recommendationCard}>
              {
                <div className={styles.contentElement}>
                  <div className={styles.elementIcon}>
                    {' '}
                    <Attraction />
                  </div>
                  <div className={styles.elementText}>
                    {' '}
                    <div
                      className={styles.dang}
                      dangerouslySetInnerHTML={{ __html: country.safety.description }}
                    />
                  </div>
                </div>
              }
            </Card>
        )}

        {topPois &&
          topPois.filter(poi => poi.poi_has_image === true).length > 0 && (
            <Card title="Attractions" type="Must Visit" className={styles.recommendationCard}>
              <div ref={attractionsRef} className={styles.events}>
                {topPois.filter(poi => poi.poi_has_image === true).map((poi, i) => (
                  <div key={`poi-${i}-${poi.id}`} className={styles.slide}>
                    <div className={styles.slideText5}>{poi.name}</div>
                    <div className={styles.tagtext}>
                      {poi.tags.map(
                        (t, index) =>
                          index < 3 &&
                          t.name !== '360° Content' && (
                            <div className={styles.tagtextItem}> {t.name}</div>
                          )
                      )}{' '}
                    </div>
                    <Image
                      src={
                        poi.poi_has_image
                          ? getImagePath(
                            getPoiImage(poi, appTheme === 'light'),
                            SUPPORTED_SIZES['720'],
                            'pois/'
                          )
                          : getDefaultImage(poi, appTheme === 'light')
                      }
                      srcsetProvided={true}
                      srcset={getSourceSet(
                        getPoiImage(poi, appTheme === 'light'),
                        [SUPPORTED_SIZES['720'], SUPPORTED_SIZES['1080'], SUPPORTED_SIZES['1920']],
                        'pois/'
                      )}
                      className={styles.slideImage}
                      width={200}
                      height={120}
                      alt={poi.name}
                      key={poi.id}
                    />

                    <div className={styles.slideText6}>
                      {poi.description && poi.description.text
                        ? poi.description.text
                        : poi.perex ? poi.perex : poi.address ? poi.address : ' '}
                    </div>

                    <div className={styles.slideText7Holder}>
                      {poi.phone && (
                        <a
                          key={`poi-${poi.id}-${poi.phone}`}
                          href={`tel:${poi.phone}`}
                          className={styles.slideText7}
                        >
                          {
                            <Icon
                              icon="fluent:call-28-regular"
                              height="30"
                              className={styles.poiDirect}
                            />
                          }
                        </a>
                      )}
                      {poi.location && (
                        <a
                          key={`poi-${poi.id}-${poi.location.lng}-${poi.location.lat}`}
                          href={`https://www.google.com/maps/dir///@${poi.location.lat},${
                            poi.location.lng
                          },15z`}
                          className={styles.slideText7}
                        >
                          {<Icon icon="bx:navigation" height="30" className={styles.poiDirect} />}
                        </a>
                      )}
                      {poi.references.map(r => (
                        <a
                          key={`poi-${poi.id}-${r.url}`}
                          href={r.url}
                          className={styles.slideText7}
                        >
                          {r.title !== 'Wikipedia' && (
                            <Icon
                              icon="charm:link-external"
                              height="30"
                              className={styles.poiDirect}
                            />
                          )}
                          {r.title === 'Wikipedia' && (
                            <Icon icon="cib:wikipedia" height="30" className={styles.poiDirect} />
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
        )}

        <Card title={'More to know'} type="Overview" className={styles.recommendationCard}>
          {area_description &&
            area_description['text'] && (
              <div className={styles.slideText6}>{area_description['text']}</div>
          )}

          <div className={styles.slideText7Holder}>
            {lat &&
              lon && (
                <a
                  key={`loc-${id}-0-${lat}-${lon}`}
                  href={`https://www.google.com/maps/dir///@${lat},${lon},15z`}
                  className={styles.slideText7}
                >
                  {<Icon icon="bx:navigation" height="30" className={styles.poiDirect} />}
                </a>
            )}
            {area_description &&
              area_description['link'] && (
                <a
                  key={`${id}-${lat}-${lon}`}
                  href={area_description['link']}
                  className={styles.slideText7}
                >
                  {<Icon icon="cib:wikipedia" height="30" className={styles.poiDirect} />}
                </a>
            )}
          </div>
        </Card>
        {activities &&
          activities.length > 0 && (
            <Card title="Activities" type="Must Do" className={styles.recommendationCard}>
              <div className={styles.events}>
                {activities.map(activity => (
                  <div key={`activitiy-${activity}`} className={styles.slide2}>
                    <Image
                      src={
                        activity &&
                        activityImages &&
                        activityImages[activity] &&
                        activityImages[activity].image_hash
                          ? getImagePath(
                            activityImages[activity].image_hash,
                            SUPPORTED_SIZES['720'],
                            'activities/'
                          )
                          : ''
                      }
                      srcsetProvided={true}
                      srcset={
                        activity &&
                        activityImages &&
                        activityImages[activity] &&
                        activityImages[activity].image_hash
                          ? getSourceSet(
                            activityImages[activity].image_hash,
                            [
                              SUPPORTED_SIZES['720'],
                              SUPPORTED_SIZES['1080'],
                              SUPPORTED_SIZES['1920']
                            ],
                            'activities/'
                          )
                          : ''
                      }
                      className={styles.slideImageRow}
                      alt={activity}
                      key={activity}
                    />
                    <div className={styles.sideContent2}>
                      {startMonth && endMonth && startMonth !== endMonth ? (
                        <>
                          <div className={styles.sideContentTitle}>
                            {activity === 'Car' ? 'Scenic Drive' : activity}
                          </div>
                          <div className={styles.sideContentSubtitle}>
                            from {startMonth} to {endMonth}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={styles.sideContentTitle}>
                            {activity === 'Car' ? 'Scenic Drive' : activity}
                          </div>
                          <div className={styles.sideContentSubtitle}>in {startMonth} </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
        )}
      </div>
    </div>
  )
}

export default Details
