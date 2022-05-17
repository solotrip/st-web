/* eslint-disable max-len */
import React from 'react'
import styles from './notification.module.scss'
import { Link } from 'react-router-dom'
import { formatAsMonthDay, getTimeDiffString } from 'utils/date'
import { ReactComponent as Time } from 'assets/images/new-icons/time.svg'
import { ReactComponent as Calendar } from 'assets/images/new-icons/calendar.svg'
import { ReactComponent as EventsIcon } from 'assets/images/new-icons/events.svg'
import { Card } from 'components'
import _capitalize from 'lodash/capitalize'
import { NOTIFICATION_TYPES } from 'constants/index'
import qs from 'qs'

const Notification = ({ notification }) => {
  const { content, body, data } = notification

  const subTitle =
    (data.type === NOTIFICATION_TYPES.RECOMMENDATION ||
      data.type === NOTIFICATION_TYPES.WISHLIST) &&
    content.new &&
    content.new.country ? (
      <div className={styles.countryHolder}>
        <div className={styles.countryEmoji}>{content.new.country.emoji_flag}</div>{' '}
        <div>{content.new.country.name}</div>
      </div>
      ) : (
        <></>
      )

  return (
    <Card
      type={`${_capitalize(data.type)} Update`}
      title={
        (data.type === NOTIFICATION_TYPES.RECOMMENDATION ||
          data.type === NOTIFICATION_TYPES.WISHLIST) &&
        content.new
          ? content.new.name
          : ''
      }
      subTitle={subTitle}
    >
      <div className={styles.contentElement}>
        <div className={styles.elementIcon}>
          <Calendar />
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
          <EventsIcon />
        </div>
        <div className={styles.elementText}>{body}</div>
      </div>

      <div className={styles.contentElement}>
        <div className={styles.elementIcon}>
          <Time />
        </div>
        <div className={styles.elementText}>
          Updated {getTimeDiffString(notification.updatedAt)}
        </div>
      </div>

      <Link
        to={{
          pathname: '/recommendations',
          search: qs.stringify(content.query)
        }}
      >
        <button className={styles.showDetails}>Show Details</button>
      </Link>
    </Card>
  )
}

export default Notification
