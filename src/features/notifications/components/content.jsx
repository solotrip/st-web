import React, { useState } from 'react'
import styles from './content.module.scss'
import Notification from './notification'
import { isBrowser, isTablet } from 'react-device-detect'
import { Loader } from 'components'
import SidePanel from '../../recommendations/components/sidePanel'
import Recommendation from 'features/recommendations/components/recommendation'
import cn from 'classnames'
import { Icon } from '@iconify/react'

const Content = ({
  notifications,
  mapEnabled = true,
  loading,
  basePath = '/recommendations',
  queryFunction
}) => {
  const [activeTab, setActiveTab] = useState('Notifications')

  function tabSelect(e) {
    setActiveTab(e.target.textContent)
  }

  const tabs = (
    <div className={styles.tabs}>
      <button
        className={cn(styles.tabItem, { [styles.active]: activeTab === 'Notifications' })}
        onClick={tabSelect}
      >
        <Icon icon="fluent:beach-24-regular" height="30" className={styles.tabIcon} />
        <span className={styles.tabName}>Notifications</span>
      </button>

      <button
        className={cn(styles.tabItem, { [styles.active]: activeTab === 'Map' })}
        onClick={tabSelect}
      >
        <Icon icon="fluent:map-24-regular" height="30" className={styles.tabIcon} />
        <span className={styles.tabName}>Map</span>
      </button>
    </div>
  )
  return (
    <div className={styles.page}>
      <div className={styles.notifications}>
        <h1 className={styles.title}>Notifications</h1>
        {tabs}
        {loading &&
          activeTab === 'Notifications' && (
            <div className={styles.recommendations}>
              <Recommendation.Skeleton />
            </div>
        )}
        {!loading &&
          notifications.length === 0 &&
          activeTab === 'Notifications' && (
            <span className={styles.noItem}>All clear. Come back later</span>
        )}
        {!loading &&
          activeTab === 'Notifications' &&
          notifications.map(notification => {
            return <Notification key={`not-${notification.sid}`} notification={notification} />
          })}
        {!loading &&
          activeTab === 'Map' && (
            <SidePanel
              loading={loading}
              recommendations={notifications || []}
              contentType="notifications"
              onlyOnDesktop={false}
              queryFunction={queryFunction}
              basePath={basePath}
              query={queryFunction(notifications)}
              ignoreBoundaries={true}
              hideCharts={false}
              showMapOnNotifications={true}
            />
        )}
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
