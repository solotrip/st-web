import React from 'react'
import styles from './sidePanel.module.scss'
import AnalyticsMap from './analytics/map'
import Analytics from './analytics'
import qs from 'qs'
import cn from 'classnames'
import { useLocation } from 'react-router-dom'

var defaultSelectedOption

const SidePanel = ({
  recommendations = [],
  loading,
  query,
  contentType = 'recommendations',
  hideMap,
  hideCharts,
  onlyOnDesktop,
  ignoreBoundaries = false,
  showMapOnNotifications = false
}) => {
  const { search } = useLocation()
  const queryOptions = qs.parse(search)

  if (queryOptions.show) {
    if (queryOptions.show === 'hotel-prices') {
      defaultSelectedOption = {
        value: 'hotel-prices',
        label: 'Hotel Prices'
      }
    } else if (queryOptions.show === 'hostel-prices') {
      defaultSelectedOption = {
        value: 'hostel-prices',
        label: 'Hostel Prices'
      }
    } else if (queryOptions.show === 'airbnb-prices') {
      defaultSelectedOption = { value: 'airbnb-prices', label: 'Airbnb Prices' }
    } else if (queryOptions.show === 'temperature') {
      defaultSelectedOption = { value: 'temperature', label: 'Temperature' }
    } else if (queryOptions.show === 'trip-days') {
      defaultSelectedOption = { value: 'trip-days', label: 'Tripdays' }
    } else if (queryOptions.show === 'cost-of-living') {
      defaultSelectedOption = { value: 'cost-of-living', label: 'Cost of Living' }
    } else if (queryOptions.show === 'restrictions') {
      defaultSelectedOption = { value: 'restrictions', label: 'Restrictions' }
    }
  } else {
    defaultSelectedOption = {
      value: 'hotel-prices',
      label: 'Hotel Prices'
    }
  }
  return (
    <div className={cn(styles.container, { [styles.onlyDesktop]: onlyOnDesktop })}>
      {!hideMap && (
        <AnalyticsMap
          recommendations={
            contentType === 'notifications'
              ? recommendations.map(r => ({
                ...r.content.new,
                link: {
                  pathname: `/recommendations/r/${r.id}`,
                  search: qs.stringify(r.content.query)
                }
              }))
              : recommendations.map(r => ({
                ...r,
                link: {
                  pathname: `/recommendations/r/${r.id}`,
                  search: qs.stringify(query)
                }
              }))
          }
          loading={loading}
          query={query}
          halfHeight={contentType === 'recommendations' && !hideCharts}
          ignoreBoundaries={ignoreBoundaries}
        />
      )}
      {!hideCharts &&
        contentType !== 'notifications' && (
          <Analytics
            loading={loading}
            recommendations={recommendations}
            defaultSelectedOption={defaultSelectedOption}
            contentType={contentType}
            ignoreBoundaries={ignoreBoundaries}
            halfHeight={contentType === 'recommendations' && !hideCharts}
          />
      )}
    </div>
  )
}

export default SidePanel
