/* eslint-disable max-len */
import React from 'react'
import styles from './element.module.scss'

import { Link } from 'react-router-dom'

import { formatAsMonthDay } from 'utils/date'

import { ReactComponent as Calendar } from 'assets/images/new-icons/calendar.svg'
import { ReactComponent as Location } from 'assets/images/new-icons/location.svg'
import { ReactComponent as Passport } from 'assets/images/new-icons/passport.svg'

import { ReactComponent as EventsIcon } from 'assets/images/new-icons/events.svg'
import { Image } from 'components'

const Element = ({ element }) => {
  const { image, title, query, startDate, endDate, areaString, type } = element
  return (
    <>
      {type === 'event' && (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard2}
        >
          {' '}
          {/*<div className={styles.colorStrip} />*/}
          <div className={styles.cardContent}>
            <div className={styles.header} />

            <div className={styles.content}>
              <div key={`image-${title}`} className={styles.slide}>
                <Image
                  src={image && image}
                  className={styles.slideImage}
                  width={200}
                  height={120}
                  alt={title}
                  key={title}
                />
              </div>
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <EventsIcon />
                </div>
                <div className={styles.elementText}>{title}</div>
              </div>
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
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Location />
                </div>
                <div className={styles.elementText}>{areaString}</div>
              </div>

              <Link to={`${query}`}>
                <button className={styles.showDetails}>Discover </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {type === 'featured' && (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard2}
        >
          {' '}
          {/*<div className={styles.colorStrip} />*/}
          <div className={styles.cardContent}>
            <div className={styles.header} />

            <div className={styles.content}>
              <div key={`image-${title}`} className={styles.slide}>
                <Image
                  src={image && image}
                  className={styles.slideImage}
                  width={200}
                  height={120}
                  alt={title}
                  key={title}
                />
              </div>
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <EventsIcon />
                </div>
                <div className={styles.elementText}>{title}</div>
              </div>

              <Link to={`${query}`}>
                <button className={styles.showDetails}>Discover </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {type === 'restriction' && (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard2}
        >
          {' '}
          {/*<div className={styles.colorStrip} />*/}
          <div className={styles.cardContent}>
            <div className={styles.header} />

            <div className={styles.content}>
              <div key={`image-${title}`} className={styles.slide}>
                <Image
                  src={image && image}
                  className={styles.slideImage}
                  width={200}
                  height={120}
                  alt={title}
                  key={title}
                />
              </div>
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <EventsIcon />
                </div>
                <div className={styles.elementText}>{title}</div>
              </div>

              <Link to={`${query}`}>
                <button className={styles.showDetails}>Discover </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {type === 'visa' && (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard2}
        >
          {' '}
          {/*<div className={styles.colorStrip} />*/}
          <div className={styles.cardContent}>
            <div className={styles.header} />

            <div className={styles.content}>
              <div key={`image-${title}`} className={styles.slide}>
                <Image
                  src={image && image}
                  className={styles.slideImage}
                  width={200}
                  height={120}
                  alt={title}
                  key={title}
                />
              </div>
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Passport />
                </div>
                <div className={styles.elementText}>{title}</div>
              </div>

              <Link to={`${query}`}>
                <button className={styles.showDetails}>Discover </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {type === 'activity' && (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard2}
        >
          {' '}
          {/*<div className={styles.colorStrip} />*/}
          <div className={styles.cardContent}>
            <div className={styles.header} />

            <div className={styles.content}>
              <div key={`image-${title}`} className={styles.slide}>
                <Image
                  src={image && image}
                  className={styles.slideImage}
                  width={200}
                  height={120}
                  alt={title}
                  key={title}
                />
              </div>
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <EventsIcon />
                </div>
                <div className={styles.elementText}>{title}</div>
              </div>

              <Link to={`${query}`}>
                <button className={styles.showDetails}>Discover </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {type === 'weather' && (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard2}
        >
          {' '}
          {/*<div className={styles.colorStrip} />*/}
          <div className={styles.cardContent}>
            <div className={styles.header} />

            <div className={styles.content}>
              <div key={`image-${title}`} className={styles.slide}>
                <Image
                  src={image && image}
                  className={styles.slideImage}
                  width={200}
                  height={120}
                  alt={title}
                  key={title}
                />
              </div>
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <EventsIcon />
                </div>
                <div className={styles.elementText}>{title}</div>
              </div>

              <Link to={`${query}`}>
                <button className={styles.showDetails}>Discover </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {type === 'season' && (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard2}
        >
          {' '}
          {/*<div className={styles.colorStrip} />*/}
          <div className={styles.cardContent}>
            <div className={styles.header} />

            <div className={styles.content}>
              <div key={`image-${title}`} className={styles.slide}>
                <Image
                  src={image && image}
                  className={styles.slideImage}
                  width={200}
                  height={120}
                  alt={title}
                  key={title}
                />
              </div>
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <EventsIcon />
                </div>
                <div className={styles.elementText}>{title}</div>
              </div>

              <Link to={`${query}`}>
                <button className={styles.showDetails}>Discover </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {type === 'region' && (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard2}
        >
          {' '}
          {/*<div className={styles.colorStrip} />*/}
          <div className={styles.cardContent}>
            <div className={styles.header} />

            <div className={styles.content}>
              <div key={`image-${title}`} className={styles.slide}>
                <Image
                  src={image && image}
                  className={styles.slideImage}
                  width={200}
                  height={120}
                  alt={title}
                  key={title}
                />
              </div>
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <EventsIcon />
                </div>
                <div className={styles.elementText}>{title}</div>
              </div>

              <Link to={`${query}`}>
                <button className={styles.showDetails}>Discover </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {type === 'cost' && (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard2}
        >
          {' '}
          {/*<div className={styles.colorStrip} />*/}
          <div className={styles.cardContent}>
            <div className={styles.header} />

            <div className={styles.content}>
              <div key={`image-${title}`} className={styles.slide}>
                <Image
                  src={image && image}
                  className={styles.slideImage}
                  width={200}
                  height={120}
                  alt={title}
                  key={title}
                />
              </div>
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <EventsIcon />
                </div>
                <div className={styles.elementText}>{title}</div>
              </div>

              <Link to={`${query}`}>
                <button className={styles.showDetails}>Discover </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {type === 'language' && (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard2}
        >
          {' '}
          {/*<div className={styles.colorStrip} />*/}
          <div className={styles.cardContent}>
            <div className={styles.header} />

            <div className={styles.content}>
              <div key={`image-${title}`} className={styles.slide}>
                <Image
                  src={image && image}
                  className={styles.slideImage}
                  width={200}
                  height={120}
                  alt={title}
                  key={title}
                />
              </div>
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <EventsIcon />
                </div>
                <div className={styles.elementText}>{title}</div>
              </div>

              <Link to={`${query}`}>
                <button className={styles.showDetails}>Discover </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {type === 'attraction' && (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard2}
        >
          {' '}
          {/*<div className={styles.colorStrip} />*/}
          <div className={styles.cardContent}>
            <div className={styles.header} />

            <div className={styles.content}>
              <div key={`image-${title}`} className={styles.slide}>
                <Image
                  src={image && image}
                  className={styles.slideImage}
                  width={200}
                  height={120}
                  alt={title}
                  key={title}
                />
              </div>
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <EventsIcon />
                </div>
                <div className={styles.elementText}>{title}</div>
              </div>
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Location />
                </div>
                <div className={styles.elementText}>{areaString}</div>
              </div>

              <Link to={`${query}`}>
                <button className={styles.showDetails}>Discover </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {type === 'destination' && (
        <div
          onMouseEnter={() => {
            //activeHandler(sid)
          }}
          className={styles.recommendationCard2}
        >
          {' '}
          {/*<div className={styles.colorStrip} />*/}
          <div className={styles.cardContent}>
            <div className={styles.header} />

            <div className={styles.content}>
              <div key={`image-${title}`} className={styles.slide}>
                <Image
                  src={image && image}
                  className={styles.slideImage}
                  width={200}
                  height={120}
                  alt={title}
                  key={title}
                />
              </div>
              <div className={styles.contentElement}>
                <div className={styles.elementIcon}>
                  {' '}
                  <Location />
                </div>
                <div className={styles.elementText}>{title}</div>
              </div>

              <Link to={`${query}`}>
                <button className={styles.showDetails}>Discover </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Element
