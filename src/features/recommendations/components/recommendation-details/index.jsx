/* eslint-disable max-len */
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import moment from 'moment'
import styles from './recommendation-details.module.scss'
import { IoIosArrowBack, IoIosGlasses } from 'react-icons/io'
import { MdOutlineLocalActivity, MdAttractions } from 'react-icons/md'

import activityImages from './activity-images.json'

import { passportSelector } from '../../containers/passport-countries/slice'
import { recommendationsSelector } from '../../slice'
import { wishlistSelector } from '../../../wishlist/slice'

const Details = () => {
  let recommendation
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
      recommendation = recommendationReturned
    }
  })

  //search recommendation among different wishlisted areas.
  const { wishlist } = useSelector(wishlistSelector)
  Object.keys(wishlist).forEach(wishlistedObject => {
    console.log('wishlisted object: ', wishlist[wishlistedObject].data)

    if (wishlist[wishlistedObject].data.id === id) {
      recommendation = wishlist[wishlistedObject].data
    }
  })

  const [isRecommendationProcessed, setIsRecommendationProcessed] = useState(
    false
  )

  const history = useHistory()
  const overviewRef = useRef(null)
  const eventsRef = useRef(null)
  const poisRef = useRef(null)

  const [activeTab, setActiveTab] = useState('overview')

  const { passports: passportsObject } = useSelector(passportSelector)
  let passports = passportsObject

  const [processedRecommendation] = useState({
    overview: {
      highlights: [],
      costs: []
    },
    experiences: {
      eventsAndFestivals: [],
      activities: []
    },
    attractions: {
      topAttractions: []
    }
  })

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
      let visaImage =
        'https://ik.imagekit.io/7zlqc1cmihe/4x/visa4x.png?updatedAt=1636642405053'

      let visaFreeObject
      if (isVisaFree) {
        visaFreeObject = {
          image: visaImage,
          title: 'Visa free for you.',
          subtitle: `Passport of ${approvedPassports[0].label}`
        }
      } else {
        let isVisaOnArrival = passports.some(checkVisaOnArrivalFor)
        if (isVisaOnArrival) {
          visaFreeObject = {
            image: visaImage,
            title: 'Visa on Arrival',
            subtitle: `Passport of ${approvedPassports[0].label}`
          }
        } else {
          visaFreeObject = {
            image: visaImage,
            title: 'Visa required.',
            subtitle: `Visa requirements of ${recommendation.country.name}`
          }
        }
      }
      processedRecommendation.overview.highlights.push(visaFreeObject)

      //Adding the temperature.
      if (recommendation.climate.t_min && recommendation.climate.t_max) {
        let temperatureObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/temperature4x.png?updatedAt=1636642404434',
          title: `min ${recommendation.climate.t_min}°C, max ${
            recommendation.climate.t_max
          }°C`,
          subtitle: `Average Weather in ${moment(
            Date.parse(recommendation.startDate)
          ).format('MMMM')}`
        }
        processedRecommendation.overview.highlights.push(temperatureObject)
      }
      //Adding the weather.
      if (
        recommendation.climate.humidity &&
        recommendation.climate.rainy_days
      ) {
        let weatherObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/humidity4x.png?updatedAt=1636642404574',
          title: `Rainy days: ${recommendation.climate.rainy_days}, humidity ${
            recommendation.climate.humidity
          }`,
          subtitle: `Average Weather in ${moment(
            Date.parse(recommendation.startDate)
          ).format('MMMM')}`
        }
        processedRecommendation.overview.highlights.push(weatherObject)
      }

      //Adding the restrictions.
      let restrictions = recommendation.country.restrictions
      let restrictionObject

      //Status
      if (restrictions['open_for_vaccinated']) {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/vaccine4x.png?updatedAt=1636642404899',
          title: 'Open for Vaccinated',
          subtitle: 'Restrictions for vaccinated travellers'
        }
      } else if (restrictions['open_for_vaccinated'] === null) {
        restrictionObject = null
      } else {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/vaccine4x.png?updatedAt=1636642404899',
          title: 'Closed',
          subtitle: 'Restrictions for vaccinated travellers'
        }
      }
      if (restrictionObject !== null) {
        processedRecommendation.overview.highlights.push(restrictionObject)
      }

      //Test Required
      if (restrictions['vaccinated_arrival_test_required']) {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/pcrtest4x.png?updatedAt=1636642404807',
          title: 'Test Required',
          subtitle: 'Restrictions for vaccinated travellers'
        }
      } else if (restrictions['vaccinated_arrival_test_required'] === null) {
        restrictionObject = null
      } else {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/pcrtest4x.png?updatedAt=1636642404807',
          title: 'Test Not Required',
          subtitle: 'Restrictions for vaccinated travellers'
        }
      }
      if (restrictionObject !== null) {
        processedRecommendation.overview.highlights.push(restrictionObject)
      }

      //Quarantine Required
      if (restrictions['vaccinated_arrival_quarantine_required']) {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/quarantine.png?updatedAt=1636841090144',
          title: 'Quarantine Required',
          subtitle: 'Restrictions for vaccinated travellers'
        }
      } else if (
        restrictions['vaccinated_arrival_quarantine_required'] === null
      ) {
        restrictionObject = null
      } else {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/quarantine.png?updatedAt=1636841090144',
          title: 'Quarantine Not Required',
          subtitle: 'Restrictions for vaccinated travellers'
        }
      }
      if (restrictionObject !== null) {
        processedRecommendation.overview.highlights.push(restrictionObject)
      }

      //Unvaccinated
      //Test
      if (restrictions['arrival_test_required']) {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/pcrtest4x.png?updatedAt=1636642404807',
          title: 'Test Required',
          subtitle: 'Restrictions for unvaccinated travellers'
        }
      } else if (restrictions['arrival_test_required'] === null) {
        restrictionObject = null
      } else {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/pcrtest4x.png?updatedAt=1636642404807',
          title: 'Test Not Required',
          subtitle: 'Restrictions for unvaccinated travellers'
        }
      }
      if (restrictionObject !== null) {
        processedRecommendation.overview.highlights.push(restrictionObject)
      }

      //Quarantine Required
      if (restrictions['arrival_quarantine_required']) {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/quarantine.png?updatedAt=1636841090144',
          title: 'Quarantine Required',
          subtitle: 'Restrictions for unvaccinated travellers'
        }
      } else if (restrictions['arrival_quarantine_required'] === null) {
        restrictionObject = null
      } else {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/quarantine.png?updatedAt=1636841090144',
          title: 'Quarantine Not Required',
          subtitle: 'Restrictions for unvaccinated travellers'
        }
      }
      if (restrictionObject !== null) {
        processedRecommendation.overview.highlights.push(restrictionObject)
      }

      //General Restrictions(mask,bars,restaurants,attractions,public transport)

      //mask status
      if (restrictions['mask_status'] === 'REQUIRED') {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/mask.png?updatedAt=1636886233110',
          title: 'Mask Required',
          subtitle: 'General Restrictions'
        }
      } else if (restrictions['mask_status'] === null) {
        restrictionObject = null
      } else if (restrictions['mask_status'] === 'NOT_REQUIRED') {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/mask.png?updatedAt=1636886233110',
          title: 'Mask Not Required',
          subtitle: 'General Restrictions'
        }
      }
      if (restrictionObject !== null) {
        processedRecommendation.overview.highlights.push(restrictionObject)
      }

      //bar status
      if (restrictions['bar_status'] === 'OPEN') {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/bar.png?updatedAt=1636893337625',
          title: 'Bars are open',
          subtitle: 'General Restrictions'
        }
      } else if (restrictions['bar_status'] === null) {
        restrictionObject = null
      } else if (restrictions['bar_status'] === 'CLOSED') {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/bar.png?updatedAt=1636893337625',
          title: 'Bars are closed',
          subtitle: 'General Restrictions'
        }
      } else if (restrictions['bar_status'] === 'RESTRICTIONS') {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/bar.png?updatedAt=1636893337625',
          title: 'Bars are partially open',
          subtitle: 'General Restrictions'
        }
      }
      if (restrictionObject !== null) {
        processedRecommendation.overview.highlights.push(restrictionObject)
      }

      //restaurant status
      if (restrictions['restaurant_status'] === 'OPEN') {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/restauant.png?updatedAt=1636894062772',
          title: 'Restaurants are open',
          subtitle: 'General Restrictions'
        }
      } else if (restrictions['restaurant_status'] === null) {
        restrictionObject = null
      } else if (restrictions['restaurant_status'] === 'CLOSED') {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/restauant.png?updatedAt=1636894062772',
          title: 'Restaurants are closed',
          subtitle: 'General Restrictions'
        }
      } else if (restrictions['restaurant_status'] === 'RESTRICTIONS') {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/restauant.png?updatedAt=1636894062772',
          title: 'Restaurants are partially open',
          subtitle: 'General Restrictions'
        }
      }
      if (restrictionObject !== null) {
        processedRecommendation.overview.highlights.push(restrictionObject)
      }

      //attractions restrictions
      if (restrictions['Tourist Attractions'] === 'Open') {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/attraction.png?updatedAt=1636894626169',
          title: 'Attractions are open',
          subtitle: 'General Restrictions'
        }
      } else if (restrictions['Tourist Attractions'] === null) {
        restrictionObject = null
      } else if (restrictions['Tourist Attractions'] === 'Closed') {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/attraction.png?updatedAt=1636894626169',
          title: 'Attractions are closed',
          subtitle: 'General Restrictions'
        }
      } else if (restrictions['Tourist Attractions'] === 'Partially Open') {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/attraction.png?updatedAt=1636894626169',
          title: 'Attractions are restricted',
          subtitle: 'General Restrictions'
        }
      }
      if (restrictionObject !== null) {
        processedRecommendation.overview.highlights.push(restrictionObject)
      }

      //public transport
      if (restrictions['Public Transport'] === 'Operating') {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/public-transport.png?updatedAt=1636895594154',
          title: 'Public transport is  functional',
          subtitle: 'General Restrictions'
        }
      } else if (restrictions['Public Transport'] === null) {
        restrictionObject = null
      } else if (restrictions['Public Transport'] === 'Not Operartional') {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/public-transport.png?updatedAt=1636895594154',
          title: 'Public transport is not functional',
          subtitle: 'General Restrictions'
        }
      } else if (restrictions['Public Transport'] === 'Partial Restrictions') {
        restrictionObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/public-transport.png?updatedAt=1636895594154',
          title: 'Public transport is restricted',
          subtitle: 'General Restrictions'
        }
      }
      if (restrictionObject !== null) {
        processedRecommendation.overview.highlights.push(restrictionObject)
      }

      //Costs
      let costObject
      if (recommendation.hotel_price) {
        costObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/acommodation4x.png?updatedAt=1636642404688',
          title: 'Hotel',
          subtitle: 'Monthly average',
          cost: `$${recommendation.hotel_price}`,
          costLabel: 'from'
        }
        processedRecommendation.overview.costs.push(costObject)
      }
      if (recommendation.hostel_price) {
        costObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/acommodation4x.png?updatedAt=1636642404688',
          title: 'Hostel',
          subtitle: 'Monthly average',
          cost: `$${recommendation.hostel_price}`,
          costLabel: 'from'
        }
        processedRecommendation.overview.costs.push(costObject)
      }
      if (recommendation.rental_price) {
        costObject = {
          image:
            'https://ik.imagekit.io/7zlqc1cmihe/4x/acommodation4x.png?updatedAt=1636642404688',
          title: 'Vacation Rental',
          subtitle: 'Monthly average',
          cost: `$${recommendation.rental_price}`,
          costLabel: 'from'
        }
        processedRecommendation.overview.costs.push(costObject)
      }

      //Top Attractions
      let attractionObject
      if (recommendation.top_pois && recommendation.top_pois !== []) {
        let attractions = recommendation.top_pois
        attractions.forEach(attraction => {
          attractionObject = {
            image: attraction.imageLink,
            title: attraction.name,
            subtitle: 'View on Map'
          }
          processedRecommendation.attractions.topAttractions.push(
            attractionObject
          )
        })
      }

      //Events
      let eventObject
      if (recommendation.events && recommendation.events !== []) {
        let events = recommendation.events
        events.forEach(event => {
          eventObject = {
            image: (event.images && event.images[0]) || null,
            tag: event.datesConfirmed
              ? 'Dates confirmed'
              : 'Dates not confirmed',
            title: event.title,
            dates: `${moment(Date.parse(event.start)).format(
              'DD MMM'
            )} - ${moment(Date.parse(event.end)).format('DD MMM')}`
          }
          processedRecommendation.experiences.eventsAndFestivals.push(
            eventObject
          )
        })
      }

      //Activities (Find activity images from activity-images.json)
      let activityObject
      if (recommendation.activities && recommendation.activities !== []) {
        let activities = recommendation.activities
        activities.forEach(activity => {
          var foundActivity = findElement(activityImages, 'name', activity)
          activityObject = {
            image: foundActivity.image,
            title: activity,
            subtitle: ` ${moment(Date.parse(recommendation.startDate)).format(
              'MMMM'
            )} activity`
          }
          processedRecommendation.experiences.activities.push(activityObject)
        })
      }

      setIsRecommendationProcessed(true)
    }
  }

  function findElement(arr, propName, propValue) {
    for (var i = 0; i < arr.length; i++)
      if (arr[i][propName] === propValue) return arr[i]
  }
  function findRecommendation(arr, propName, propValue) {
    for (var i = 0; i < arr.length; i++)
      if (arr[i][propName] === propValue) return arr[i]
  }

  const scrollToOverview = () => {
    setActiveTab('overview')
    overviewRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    })
  }

  const scrollToExperiences = () => {
    setActiveTab('experiences')
    eventsRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    })
  }

  const scrollToTopAttractions = () => {
    setActiveTab('attractions')
    poisRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    })
  }

  if (!isRecommendationProcessed) {
    recommendationProcessor()
  }

  return (
    <div className={styles.outer}>
      <div
        className={styles.beforeElem}
        style={{
          backgroundPosition: 'right',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className={styles.logo1}>
          <div className={styles.logoIcon1}>
            <img style={{ width: '100px' }} alt="" />
          </div>
        </div>
        <div className={styles.innerHolder}>
          <div className={styles.holder}>
            <button
              onClick={history.goBack}
              className={styles.backButtonHolder}
            >
              <IoIosArrowBack
                style={{
                  width: '30px',
                  height: '30px',
                  margin: '5px',
                  color: 'black'
                }}
              />
            </button>
            {recommendation && (
              <div className={styles.textHolder}>
                <div className={styles.areaName}>{recommendation.name}</div>
                <div className={styles.dates}>
                  {moment(Date.parse(recommendation.startDate)).format(
                    'DD MMM'
                  )}
                  &nbsp;-&nbsp;
                  {moment(Date.parse(recommendation.endDate)).format('DD MMM')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.headerSubHolder}>
        <div
          className={styles.sticky}
          style={{
            backgroundPosition: 'left top',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>
      {recommendation ? (
        <div ref={overviewRef} className={styles.contents}>
          <div className={styles.content}>
            <div className={styles.contentMasterTitle}>Overview</div>
            <div className={styles.contentTitle}>Highlights</div>
            {processedRecommendation.overview.highlights &&
              processedRecommendation.overview.highlights.length > 0 &&
              processedRecommendation.overview.highlights.map((element, i) => {
                return (
                  <div className={styles.cellElement}>
                    <div
                      className={styles.cellImage}
                      style={{
                        backgroundImage: 'url(' + element.image + ')',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                    <div className={styles.cellText}>
                      <div className={styles.cellTitle}>{element.title}</div>
                      <div className={styles.cellSubtitle}>
                        {element.subtitle}
                      </div>
                    </div>
                  </div>
                )
              })}
            {!processedRecommendation.overview.highlights && (
              <div> No highlight data to show.</div>
            )}
            <div className={styles.contentTitle}>Costs</div>
            {processedRecommendation.overview.costs &&
              processedRecommendation.overview.costs.length > 0 &&
              processedRecommendation.overview.costs.map(element => {
                return (
                  <div className={styles.cellElement}>
                    <div
                      className={styles.cellImage}
                      style={{
                        backgroundImage: 'url(' + element.image + ')',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                    <div className={styles.cellRow}>
                      <div className={styles.cellTextCosts}>
                        <div className={styles.cellTitle}>{element.title}</div>
                        <div className={styles.cellSubtitle}>
                          {element.subtitle}
                        </div>
                      </div>
                      <div className={styles.costHolder}>
                        <div className={styles.costLabel}>
                          {element.costLabel}
                        </div>
                        <div className={styles.cost}>{element.cost}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            {!processedRecommendation.overview.costs && (
              <div> No cost data to show.</div>
            )}
          </div>
          <div ref={eventsRef} className={styles.eventsContent}>
            <div className={styles.contentMasterTitle}>Events</div>
            <div className={styles.contentTitle}>Major Events</div>
            {processedRecommendation.experiences.eventsAndFestivals &&
              processedRecommendation.experiences.eventsAndFestivals.length >
                0 &&
              processedRecommendation.experiences.eventsAndFestivals.map(
                element => {
                  return (
                    <div className={styles.eventCellElement}>
                      <div
                        className={styles.eventCellImage}
                        style={{
                          backgroundImage: 'url(' + element.image + ')',
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat'
                        }}
                      />
                      <div className={styles.cellText}>
                        <div className={styles.cellUptitle}>{element.tag}</div>
                        <div className={styles.cellTitle}>{element.title}</div>
                        <div className={styles.eventCellSubtitle}>
                          {element.dates}
                        </div>
                      </div>
                    </div>
                  )
                }
              )}
            {!processedRecommendation.experiences.eventsAndFestivals && (
              <div> No event data to show.</div>
            )}
            <div className={styles.contentTitle}>Activities</div>
            {processedRecommendation.experiences.activities &&
              processedRecommendation.experiences.activities.length > 0 &&
              processedRecommendation.experiences.activities.map(element => {
                return (
                  <div className={styles.cellElement}>
                    <div
                      className={styles.cellImage}
                      style={{
                        backgroundImage: 'url(' + element.image + ')',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                    <div className={styles.cellText}>
                      <div className={styles.cellTitle}>{element.title}</div>
                      <div className={styles.cellSubtitle}>
                        {element.subtitle}
                      </div>
                    </div>
                  </div>
                )
              })}
            {!processedRecommendation.experiences.activities && (
              <div> No activity data to show.</div>
            )}
          </div>

          <div ref={poisRef} className={styles.content}>
            <div className={styles.contentMasterTitle}>Attractions</div>

            <div className={styles.contentTitle}>Must Visit</div>
            {processedRecommendation.attractions.topAttractions &&
              processedRecommendation.attractions.topAttractions.length > 0 &&
              processedRecommendation.attractions.topAttractions.map(
                element => {
                  return (
                    <div className={styles.cellElement}>
                      <div
                        className={styles.cellImageAttractions}
                        style={{
                          backgroundImage: 'url(' + element.image + ')',
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat'
                        }}
                      />
                      <div className={styles.cellText}>
                        <div className={styles.cellTitle}>{element.title}</div>
                        <div className={styles.cellSubtitle}>
                          {element.subtitle}
                        </div>
                      </div>
                    </div>
                  )
                }
              )}
            {!processedRecommendation.attractions.topAttractions && (
              <div> No attraction data to show.</div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.noRecommendation}>
          {' '}
          It looks like you don't have a recommendation like this.{' '}
        </div>
      )}
      {recommendation && (
        <footer className={styles.navigator}>
          <button className={styles.navigatorButton} onClick={scrollToOverview}>
            <IoIosGlasses
              style={
                activeTab === 'overview'
                  ? {
                    width: '35px',
                    height: '35px',
                    margin: '1px',
                    color: '#3cafeb'
                  }
                  : {
                    width: '35px',
                    height: '35px',
                    margin: '1px'
                  }
              }
            />
            <div style={activeTab === 'overview' ? { color: '#3cafeb' } : null}>
              Overview
            </div>
          </button>
          <button
            lassName={styles.navigatorButton}
            onClick={scrollToExperiences}
          >
            <MdOutlineLocalActivity
              style={
                activeTab === 'experiences'
                  ? {
                    width: '30px',
                    height: '30px',
                    margin: '1px',
                    marginTop: '-3px',
                    marginBottom: '0px',
                    color: '#3cafeb'
                  }
                  : {
                    width: '30px',
                    height: '30px',
                    margin: '1px',
                    marginTop: '-3px',
                    marginBottom: '0px'
                  }
              }
            />
            <div
              style={activeTab === 'experiences' ? { color: '#3cafeb' } : null}
            >
              Events
            </div>
          </button>
          <button
            lassName={styles.navigatorButton}
            onClick={scrollToTopAttractions}
          >
            <MdAttractions
              style={
                activeTab === 'attractions'
                  ? {
                    width: '30px',
                    height: '30px',
                    margin: '1px',
                    marginTop: '-3px',
                    marginBottom: '0px',
                    color: '#3cafeb'
                  }
                  : {
                    width: '30px',
                    height: '30px',
                    margin: '1px',
                    marginTop: '-3px',
                    marginBottom: '0px'
                  }
              }
            />
            <div
              style={activeTab === 'attractions' ? { color: '#3cafeb' } : null}
            >
              Attractions
            </div>
          </button>
        </footer>
      )}
    </div>
  )
}

export default Details
