/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import styles from './content.module.scss'
import Notification from './notification'
import { isBrowser } from 'react-device-detect'
import { Loader } from 'components'
import SidePanel from '../../recommendations/components/sidePanel'

const Content = ({
  notifications,
  mapEnabled = true,
  loading,
  basePath = '/recommendations',
  queryFunction
}) => {
  return (
    <div className={styles.page}>
      <div className={styles.notifications}>
        <h1 className={styles.title}>Notifications</h1>
        {loading && <Loader />}
        {!loading &&
          notifications.length === 0 && (
            <span className={styles.noItem}>All clear. Come back later</span>
        )}
        {notifications.map(notification => {
          return <Notification key={`not-${notification.sid}`} notification={notification} />
        })}
      </div>
      {mapEnabled &&
        isBrowser &&
        !loading &&
        notifications.length > 0 && (
          <SidePanel
            className={styles.sidePanel}
            loading={loading}
            recommendations={notifications}
            query={queryFunction(notifications)}
            queryFunction={queryFunction}
            basePath={basePath}
            contentType="notifications"
          />
      )}
    </div>
  )
}

export default Content
