import React from 'react'
import styles from './sidePanel.module.scss'
import AnalyticsMap from './analytics/map'
import Analytics from './analytics'
import qs from 'qs'
import cn from 'classnames'

const SidePanel = ({
  recommendations = [],
  loading,
  query,
  contentType = 'recommendations',
  hideMap,
  hideCharts,
  onlyOnDesktop
}) => {
  return (
    <div className={cn(styles.container, { [styles.onlyDesktop]: onlyOnDesktop })}>
      {!hideMap && <AnalyticsMap
        recommendations={contentType === 'notifications' ?
          recommendations.map(r => ({
            ...r.content.new,
            link: {
              pathname: `/recommendations/r/${r.id}`,
              search: qs.stringify(r.content.query)
            }
          })) :
          recommendations.map(r => ({
            ...r, link: {
              pathname: `/recommendations/r/${r.id}`,
              search: qs.stringify(query)
            }
          }))}
        loading={loading}
        query={query}
        halfHeight={contentType === 'recommendations' && !hideCharts}
      />}
      {(!hideCharts && contentType === 'recommendations') && (
        <Analytics
          loading={loading}
          recommendations={recommendations}
        />
      )}
    </div>
  )
}

export default SidePanel
