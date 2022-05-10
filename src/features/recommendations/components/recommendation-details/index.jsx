/* eslint-disable max-len */
import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Currency, Image, Temperature } from 'components'

import styles from './recommendation-details.module.scss'
import activityImages from './activity-images.json'
import dayjs from 'dayjs'

import { MdIosShare } from 'react-icons/md'
import { BsHeartFill, BsInfoLg, BsExclamationLg } from 'react-icons/bs'
import { Icon } from '@iconify/react'

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
  Vaccine
} from 'assets/images/new-icons'

import { formatAsMonthDay, getMonthName } from 'utils/date'
import {
  getDefaultImage,
  getEventImage,
  getPoiImage,
  processRecommendation
} from 'utils/recommendation'
import useThemeState from 'utils/hooks/use-theme-state'

const Details = ({ recommendation, passports, query, toggleWishlist, wishlisted }) => {
  const [appTheme] = useThemeState()
  const history = useHistory()
  const {
    id,
    name,
    sid,
    startDate,
    endDate,
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
    country
  } = recommendation

  const {
    visaText,
    vaccinatedTestText,
    vaccinatedQuarantineText,
    unvaccinatedTestText,
    unvaccinatedQuarantineText,
    restaurantText,
    attractionsText,
    weatherText,
    maskText,
    barText,
    publicTransportText,
    minTemp,
    maxTemp
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
        eventsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
      } else if (e.target.textContent === 'Costs' && costsRef && costsRef.current) {
        costsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
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

  const tabs = (
    <div className={styles.tabs}>
      <button className={styles.tabItem} onClick={tabSelect}>
        <Icon icon="fluent:apps-list-24-regular" height="30" className={styles.tabIcon} />
        <span className={styles.tabName}>Overview</span>
      </button>
      {uniqueEvents &&
        uniqueEvents.length > 0 && (
          <button className={styles.tabItem} onClick={tabSelect}>
            <Icon icon="fluent:star-emphasis-24-regular" height="30" className={styles.tabIcon} />
            <span className={styles.tabName}>Events</span>
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
    <>
      {areaHasImage && (
        <Image
          alt={name}
          height={325}
          srcsetProvided={true}
          src={`https://ik.imagekit.io/stmedia/areas/${sid}?tr=w-800,h-650`}
          srcset={`https://ik.imagekit.io/stmedia/areas/${sid}?tr=w-800,h-650,
                   https://ik.imagekit.io/stmedia/areas/${sid}?tr=w-1600,h-1300 2x,
                   https://ik.imagekit.io/stmedia/areas/${sid}?tr=w-2400,h-1950 3x`}
          className={styles.headerImage}
          isRounded={false}
        />
      )}
      {areaHasImage ? (
        <div className={styles.headerHolder}>
          <div className={styles.oneRow}>
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
                <BsHeartFill className={styles.likeIcon} />
              )}
            </button>
            <button onClick={openShare} className={styles.share}>
              <MdIosShare className={styles.shareIcon} />
            </button>
          </div>
          <div ref={overviewRef} className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Calendar />
            </div>
            <div className={styles.elementText3}>
              {formatAsMonthDay(startDate)}
              {startDate !== endDate ? ` - ${formatAsMonthDay(endDate)}` : ''}{' '}
            </div>
          </div>
          <div className={styles.description}>{description}</div>
        </div>
      ) : (
        <div className={styles.headerHolderCoverless}>
          <div className={styles.oneRow}>
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
                <BsHeartFill className={styles.likeIcon} />
              )}
            </button>
            <button onClick={openShare} className={styles.share}>
              <MdIosShare className={styles.shareIcon} />
            </button>
          </div>
          <div ref={overviewRef} className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Calendar />
            </div>
            <div className={styles.elementText3}>
              {formatAsMonthDay(startDate)}
              {startDate !== endDate ? ` - ${formatAsMonthDay(endDate)}` : ''}{' '}
            </div>
          </div>
          <div className={styles.description}>{description}</div>
        </div>
      )}
      {tabs}
      <Card title="Overview" type="Highlights" className={styles.recommendationCard}>
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
                min <Temperature value={minTemp} />, max <Temperature value={maxTemp} />
              </div>
            </div>
        )}
        {weatherText && (
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              {' '}
              <Cloud />
            </div>
            <div className={styles.elementText}>{weatherText}</div>
          </div>
        )}
        {tripdays &&
          ((tripdays.min_days && tripdays.max_days) || tripdays.ideal_days) && (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Calendar />
              </div>
              <div className={styles.elementText}>
                {tripdays.min_days && tripdays.max_days
                  ? tripdays.min_days !== tripdays.max_days
                    ? `Most travelers spend ${tripdays.min_days} - ${tripdays.max_days} days. `
                    : `Most travelers spend ${tripdays.min_days} days. `
                  : tripdays.ideal_days ? `Most travelers spend ${tripdays.ideal_days} days. ` : ''}
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
      <div className={styles.disclaimer}>
        {' '}
        <BsInfoLg className={styles.disclaimerIcon} /> Always double check information provided by
        Pulfy with official websites before your trip.
      </div>
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

      <div className={styles.disclaimer}>
        {' '}
        <BsExclamationLg className={styles.disclaimerIcon2} />{' '}
        <div className={styles.report}>
          Did you find any inaccuracy or misinformation?{' '}
          <a href={'mailto:support@pulfy.com?subject=Pulfy Inaccuracy or Misinformation&body='}>
            {' '}
            Report to us
          </a>
        </div>
      </div>
      {uniqueEvents && uniqueEvents.length > 0 ? (
        <Card title="Events" type="Major" className={styles.recommendationCard}>
          <div ref={eventsRef} className={styles.events}>
            {uniqueEvents.map(event => (
              <div key={`event-${event.eid}`} className={styles.slide}>
                <Image
                  src={getEventImage(event, appTheme === 'light')}
                  className={styles.slideImage}
                  width={200}
                  height={120}
                  alt={event.title}
                  key={event.eid}
                />
                <div className="flex center">
                  <div className={styles.slideText}>{event.title}</div>
                </div>
                <div className={styles.slideText7}>
                  {formatAsMonthDay(event.start)}
                  {event.start !== event.end ? ` - ${formatAsMonthDay(event.end)}` : ''}{' '}
                </div>
                {event.url && (
                  <a href={event.url} className={styles.slideText7}>
                    Visit Official Website
                  </a>
                )}
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
                Hotel prices range from <Currency value={hotelPriceMin} /> to{' '}
                <Currency value={hotelPriceMax} />.
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
                  Average Hotel price is <Currency value={hotelPriceMin} />.
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
                Hostel prices range from <Currency value={hostelPriceMin} /> to{' '}
                <Currency value={hostelPriceMax} />.
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
                  Average hostel price is <Currency value={hostelPriceMin} />.
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
                Airbnb prices range from <Currency value={vacationRentalPriceMin} /> to{' '}
                <Currency value={vacationRentalPriceMax} />.
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
                  Average Airbnb price is <Currency value={vacationRentalPriceMin} />.
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
                <div className={styles.elementText2}>
                  {colLabels.meal_cheap_restaurant_cost_label}
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
                <div className={styles.elementText2}>
                  {colLabels.meal_mid_range_restaurant_cost_label}
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
                <div className={styles.elementText2}>
                  {colLabels.mcmeal_at_mcdonalds_cost_label}
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
                <div className={styles.elementText2}>{colLabels.beer_at_restaurant_cost_label}</div>
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
                <div className={styles.elementText2}>{colLabels.public_transport_cost_label}</div>
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
                <div className={styles.elementText2}>{colLabels.beer_from_market_label}</div>
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
                <div className={styles.elementText2}>{colLabels.montly_transport_pass_label}</div>
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
                <div className={styles.elementText2}>{colLabels.gasoline_1_liter_cost_label}</div>
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
                <div className={styles.elementText2}>{colLabels.prepaid_card_cost_label}</div>
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
                <div className={styles.elementText2}>{colLabels.internet_cost_label}</div>
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
                <div className={styles.elementText2}>{colLabels.cinema_ticket_cost_label}</div>
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
                <div className={styles.elementText2}>{colLabels.taxi_1km_cost_label}</div>
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
                  <Image
                    src={
                      poi.poi_has_image
                        ? 'https://ik.imagekit.io/stmedia/pois/' +
                          getPoiImage(poi, appTheme === 'light') +
                          '?tr=w-600,h-388'
                        : getDefaultImage(poi, appTheme === 'light')
                    }
                    srcsetProvided={true}
                    srcset={`https://ik.imagekit.io/stmedia/pois/${getPoiImage(
                      poi,
                      appTheme === 'light'
                    )}?tr=w-600,h-388,
                             https://ik.imagekit.io/stmedia/pois/${getPoiImage(
                      poi,
                      appTheme === 'light'
                    )}?tr=w-1200,h-776 2x,
                             https://ik.imagekit.io/stmedia/pois/${getPoiImage(
                      poi,
                      appTheme === 'light'
                    )}?tr=w-1800,h-1164 3x`}
                    className={styles.slideImage}
                    width={200}
                    height={120}
                    alt={poi.name}
                    key={poi.id}
                  />
                  <div className={styles.slideText5}>{poi.name}</div>
                  <div className={styles.slideText6}>{poi.perex}</div>
                  <div className={styles.slideText7Holder}>
                    {poi.references.map(r => (
                      <a key={`poi-${poi.id}-${r.url}`} href={r.url} className={styles.slideText7}>
                        Visit {r.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
      )}
      {activities &&
        activities.length > 0 && (
          <Card title="Activities" type="Must Do" className={styles.recommendationCard}>
            <div className={styles.events}>
              {activities.map(activity => (
                <div key={`activitiy-${activity}`} className={styles.centeredSlide}>
                  <Image
                    src={
                      activity &&
                      activityImages &&
                      activityImages[activity] &&
                      activityImages[activity].image_hash
                        ? 'https://ik.imagekit.io/stmedia/activities/' +
                          activityImages[activity].image_hash +
                          '?tr=w-600,h-388'
                        : ''
                    }
                    srcsetProvided={true}
                    srcset={
                      activity &&
                      activityImages &&
                      activityImages[activity] &&
                      activityImages[activity].image_hash
                        ? `https://ik.imagekit.io/stmedia/activities/${
                          activityImages[activity].image_hash
                        }?tr=w-600,h-388,
                             https://ik.imagekit.io/stmedia/activities/${
                               activityImages[activity].image_hash
                             }?tr=w-1200,h-776 2x,
                             https://ik.imagekit.io/stmedia/activities/${
                               activityImages[activity].image_hash
                             }?tr=w-1800,h-1164 3x`
                        : ''
                    }
                    className={styles.slideImage}
                    width={278}
                    height={180}
                    alt={activity}
                    key={activity}
                  />
                  <div className="flex center">
                    {startMonth && endMonth && startMonth !== endMonth ? (
                      <div className={styles.slideText3}>
                        {activity} from {startMonth} to {endMonth}
                      </div>
                    ) : (
                      <div className={styles.slideText3}>
                        {activity} in {startMonth}{' '}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
      )}
    </>
  )
}

export default Details
