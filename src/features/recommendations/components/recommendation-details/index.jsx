/* eslint-disable max-len */
import React from 'react'
import { Card, Currency, Image, Temperature } from 'components'

import styles from './recommendation-details.module.scss'
import activityImages from './activity-images.json'
import dayjs from 'dayjs'

import {
  Accommodation,
  Attraction,
  Calendar,
  Cloud,
  EventsIcon,
  Food,
  Passport,
  Quarantine,
  Vaccine,
  Transport,
  Mask,
  Star
} from 'assets/images/new-icons'

import { formatAsMonthDay, getMonthName } from 'utils/date'
import {
  getEventImage,
  processRecommendation,
  getPoiImage,
  getDefaultImage
} from 'utils/recommendation'
import useThemeState from 'utils/hooks/use-theme-state'

const Details = ({ recommendation, passports, query, toggleWishlist, wishlisted }) => {
  const [appTheme] = useThemeState()

  const {
    name,
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
    area_perex: description
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

  return (
    <>
      <div className={styles.headerImage}>
        <div className={styles.oneRow}>
          <h1 className={styles.title}>
            {recommendation ? name : 'Go back to your recommendations'}
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
        <div className={styles.description}>{description}</div>
      </div>

      <Card title="Overview" type="Highlights" className={styles.recommendationCard}>
        <div className={styles.contentElement}>
          <div className={styles.elementIcon}>
            {' '}
            <Calendar />
          </div>
          <div className={styles.elementText}>
            {formatAsMonthDay(startDate)}
            {startDate !== endDate ? ` - ${formatAsMonthDay(endDate)}` : ''}{' '}
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
            min <Temperature value={minTemp} />, max <Temperature value={maxTemp} />
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
          <div className={styles.elementText}>{vaccinatedQuarantineText}</div>
        </div>
        <div className={styles.contentElement}>
          <div className={styles.elementIcon}>
            {' '}
            <Quarantine />
          </div>
          <div className={styles.elementText}>{unvaccinatedQuarantineText}</div>
        </div>
        {tripdays &&
          ((tripdays.min_days && tripdays.max_days) || tripdays.ideal_days) && (
            <div className={styles.contentElement}>
              <div className={styles.elementIcon}>
                {' '}
                <Calendar />
              </div>
              <div className={styles.elementText}>
                {tripdays.min_days && tripdays.max_days
                  ? `Most travelers spend ${tripdays.min_days} - ${tripdays.max_days} days. `
                  : tripdays.ideal_days ? `Most travelers spend ${tripdays.ideal_days} days. ` : ''}
              </div>
            </div>
        )}
      </Card>
      <Card title="Status" type="Overview" className={styles.recommendationCard}>
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
      </Card>
      {uniqueEvents && uniqueEvents.length > 0 ? (
        <Card title="Events" type="Major" className={styles.recommendationCard}>
          <div className={styles.events}>
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
                <div className={styles.slideText4}>
                  {formatAsMonthDay(event.start)}
                  {event.start !== event.end ? ` - ${formatAsMonthDay(event.end)}` : ''}{' '}
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
          {colLabels.meal_cheap_restaurant_cost_label && (
            <div className={styles.contentElement2}>
              <div className={styles.elementText2}>
                <div className={styles.elementIcon2}>
                  {' '}
                  <Food className={styles.food} />
                </div>
                Meal at Cheap Restaurant
              </div>
              <div className={styles.elementText2}>
                {colLabels.meal_cheap_restaurant_cost_label}
              </div>
            </div>
          )}
          {colLabels.meal_mid_range_restaurant_cost_label && (
            <div className={styles.contentElement2}>
              <div className={styles.elementText2}>
                <div className={styles.elementIcon2}>
                  {' '}
                  <Food />
                </div>
                Meal at Expensive Restaurant
              </div>
              <div className={styles.elementText2}>
                {colLabels.meal_mid_range_restaurant_cost_label}
              </div>
            </div>
          )}
          {colLabels.mcmeal_at_mcdonalds_cost_label && (
            <div className={styles.contentElement2}>
              <div className={styles.elementText2}>
                <div className={styles.elementIcon2}>
                  {' '}
                  <Food />
                </div>
                McDonalds Menu
              </div>
              <div className={styles.elementText2}>{colLabels.mcmeal_at_mcdonalds_cost_label}</div>
            </div>
          )}
          {colLabels.beer_at_restaurant_cost_label && (
            <div className={styles.contentElement2}>
              <div className={styles.elementText2}>
                {' '}
                <div className={styles.elementIcon2}>
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
                <div className={styles.elementIcon3}>
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
                <div className={styles.elementIcon2}>
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
                <div className={styles.elementIcon3}>
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
                <div className={styles.elementIcon3}>
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
                <div className={styles.elementIcon2}>
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
                <div className={styles.elementIcon2}>
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
                <div className={styles.elementIcon2}>
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
                <div className={styles.elementIcon3}>
                  {' '}
                  <Transport />
                </div>
                Taxi 1km
              </div>
              <div className={styles.elementText2}>{colLabels.taxi_1km_cost_label}</div>
            </div>
          )}
        </Card>
      )}
      {topPois &&
        topPois.length > 0 && (
          <Card title="Attractions" type="Must Visit" className={styles.recommendationCard}>
            <div className={styles.events}>
              {topPois.filter(poi => poi.poi_has_image === true).map(poi => (
                <div key={`poi-${poi.id}`} className={styles.centeredSlide}>
                  <Image
                    src={
                      poi.poi_has_image
                        ? 'https://pulfy-images.s3.eu-central-1.amazonaws.com/pois/' +
                          getPoiImage(poi, appTheme === 'light')
                        : getDefaultImage(poi, appTheme === 'light')
                    }
                    className={styles.slideImage2}
                    width={200}
                    height={120}
                    alt={poi.name}
                    key={poi.id}
                  />
                  <div className={styles.slideText5}>{poi.name}</div>
                  <div className={styles.slideText6}>{poi.perex}</div>
                  <div className={styles.slideText7Holder}>
                    {poi.references.map(r => (
                      <a href={r.url} className={styles.slideText7}>
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
                      activity && activityImages[activity] && activityImages[activity].image
                        ? activityImages[activity].image
                        : ''
                    }
                    className={styles.slideImage2}
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
