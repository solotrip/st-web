import React from 'react'
import styles from './content.module.scss'
import Notification from './notification'

const Content = ({ notifications }) => {
  return (
    <div className={styles.page}>
      <div className="flex">
        <h1>Notifications</h1>
      </div>
      <div className={styles.notifications}>
        {notifications.map(notification => {
          return (
            <Notification
              key={`not-${notification.sid}`}
              notification={notification}
            />
          )
        })}
        {(!notifications || notifications.length === 0) &&
        <div className="flex center">
          <span>All clear. Come back later</span>
        </div>}
      </div>
    </div>
  )
}

export default Content
