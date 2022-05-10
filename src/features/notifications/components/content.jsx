import React from 'react'
import styles from './content.module.scss'
import Notification from './notification'
import { isBrowser, isTablet } from 'react-device-detect'
import { Loader } from 'components'
import SidePanel from '../../recommendations/components/sidePanel'
import Recommendation from 'features/recommendations/components/recommendation'

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
        {loading && (
          <div className={styles.recommendations}>
            <Recommendation.Skeleton />
          </div>
        )}
        {!loading &&
          notifications.length === 0 && (
            <span className={styles.noItem}>All clear. Come back later</span>
        )}
        {notifications.map(notification => {
          return <Notification key={`not-${notification.sid}`} notification={notification} />
        })}
      </div>
      {mapEnabled &&
        (isBrowser || isTablet) && (
          <SidePanel
            loading={loading}
            recommendations={notifications || []}
            contentType="notifications"
            onlyOnDesktop
            queryFunction={queryFunction}
            basePath={basePath}
            query={queryFunction(notifications)}
          />
      )}
    </div>
  )
}

export default Content
