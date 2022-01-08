/* eslint-disable max-len */
import React from 'react'
import styles from './notification.module.scss'
import { Link } from 'react-router-dom'
import { formatAsMonthDay, getTimeDiffString } from 'utils/date'
import { ReactComponent as Time } from 'assets/images/new-icons/time.svg'
import { ReactComponent as Calendar } from 'assets/images/new-icons/calendar.svg'
import { ReactComponent as EventsIcon } from 'assets/images/new-icons/events.svg'

const Notification = ({ notification }) => {
  const { content, body, data } = notification
  return (
    <div
      className={styles.recommendationCard2}
    >
      <div className={styles.colorStrip}/>
      <div className={styles.cardContent}>
        <div className={styles.header}>
          <div className={styles.headerLine}>
            <div className={styles.headerUpLine}>Notification</div>
            {' '}
          </div>
          <div className={styles.headerLine}>
            <div className={styles.headerTitle}>{data.type} update</div>
            {' '}
            <div className={styles.country}>
              <div>
                <span role="img" aria-label="comeoon"/>🇺🇸
              </div>
              {' '}
              &nbsp;
              <div>United States</div>
            </div>
          </div>
          <hr className={styles.hr}/>
        </div>

        <div className={styles.content}>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              <Calendar/>
            </div>
            <div className={styles.elementText}>
              {formatAsMonthDay(content.new.startDate)}
              {content.new.startDate !== content.new.endDate
                ? ` - ${formatAsMonthDay(content.new.endDate)}`
                : ''}{' '}
            </div>
          </div>
          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              <EventsIcon/>
            </div>
            <div className={styles.elementText}>{body}</div>
          </div>

          <div className={styles.contentElement}>
            <div className={styles.elementIcon}>
              <Time/>
            </div>
            <div className={styles.elementText}>
              Updated {getTimeDiffString(notification.updatedAt)}
            </div>
          </div>

          <Link to={'recommendations/recommendation/'}>
            <button className={styles.showDetails}>Show Details</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Notification
