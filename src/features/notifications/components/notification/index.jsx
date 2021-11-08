import React from 'react'
import styles from './notification.module.scss'
import { NOTIFICATION_TYPES } from 'constants/index'
import Logo from 'assets/images/logo.svg'
import { formatAsMonthDay, getTimeDiffString } from 'utils/date'

const Notification = ({ notification }) => {
  const { content, body, data, hasSeen } = notification
  return (
    <div
      className={styles.wrapper}
    >
      {<img
        className={styles.image}
        src={content.new.image || Logo}
        alt={content.new.name}
      />}
      <div className={styles.content}>
        <div className={styles.title}>
          {
            (data.type === NOTIFICATION_TYPES.WISHLIST ||
              data.type === NOTIFICATION_TYPES.RECOMMENDATION) &&
            (
              <div
                className={styles.dateHolder}
              >
                {`${formatAsMonthDay(content.new.startDate)} -` +
                ` ${formatAsMonthDay(content.new.endDate)}`}
              </div>
            )
          }
          {!hasSeen && (
            <div className={styles.notSeen}/>
          )}
        </div>
        <div className={styles.body}>{body}</div>
        <div
          className={styles.notificationTime}
        >
          {getTimeDiffString(notification.updatedAt)}
        </div>
      </div>


    </div>
  )
}

export default Notification
