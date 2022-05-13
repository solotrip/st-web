import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './content.module.scss'
import Recommendation from './recommendation/index'
import SidePanel from './sidePanel'
import RecommendationDetails from './recommendation-details'
import { Link } from 'react-router-dom'
import { isBrowser, isTablet } from 'react-device-detect'
import _get from 'lodash/get'
import cn from 'classnames'

import { Icon } from '@iconify/react'

const Content = ({
  recommendations,
  queryFunction,
  user,
  mapEnabled = true,
  toggleWishlist,
  wishlistedIds,
  loading,
  noItemsMessage,
  title,
  children,
  detailIndex,
  basePath,
  error,
  handleScroll,
  initialScrollPos = 0,
  contentType = 'recommendations'
}) => {
  const scrollRef = useRef()
  const [activeTab, setActiveTab] = useState('Recommendations')

  function tabSelect(e) {
    setActiveTab(e.target.textContent)
  }

  useEffect(
    () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: detailIndex !== -1 ? 0 : initialScrollPos,
          behavior: 'auto'
        })
      }
    },
    //eslint-disable-next-line
    [detailIndex]
  )

  if (error)
    return (
      <div className={styles.error}>
        Ooops! Something went wrong!
        <Link
          to={{
            pathname: '/recommendations'
          }}
          replace
          className="primaryButton"
        >
          Try Again
        </Link>
      </div>
    )

  const tabs = (
    <div className={styles.tabs}>
      <button
        className={cn(styles.tabItem, { [styles.active]: activeTab === 'Recommendations' })}
        onClick={tabSelect}
      >
        <Icon icon="fluent:beach-24-regular" height="30" className={styles.tabIcon} />
        <span className={styles.tabName}>Recommendations</span>
      </button>
      <button
        className={cn(styles.tabItem, { [styles.active]: activeTab === 'Analytics' })}
        onClick={tabSelect}
      >
        <Icon icon="fluent:data-histogram-24-regular" height="30" className={styles.tabIcon} />
        <span className={styles.tabName}>Analytics</span>
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

  const list = !loading && (
    <div ref={scrollRef} className={styles.recommendations} onScroll={handleScroll}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {children}
      {tabs}
      {activeTab === 'Map' && (
        <SidePanel
          recommendations={recommendations || []}
          query={contentType === 'recommendations' && queryFunction(recommendations).query}
          contentType={contentType}
          ignoreBoundaries={true}
          hideCharts
        />
      )}
      {activeTab === 'Analytics' && (
        <>
          <div className={styles.safetyMargin} />
          <SidePanel
            recommendations={recommendations || []}
            query={contentType === 'recommendations' && queryFunction(recommendations).query}
            contentType={contentType}
            hideMap
          />
        </>
      )}
      {!loading &&
        activeTab === 'Recommendations' &&
        recommendations.length === 0 && <span className={styles.noItems}>{noItemsMessage}</span>}
      {!loading &&
        recommendations.length > 0 &&
        activeTab === 'Recommendations' &&
        contentType === 'recommendations' &&
        recommendations.map((recommendation, i) => {
          const { query, queryString } = queryFunction(recommendation)
          return (
            <Recommendation
              key={`rec-${recommendation.id || recommendation.sid}`}
              query={query}
              queryString={queryString}
              recommendation={recommendation}
              user={user}
              toggleWishlist={toggleWishlist}
              wishlisted={!!wishlistedIds[recommendation.id]}
              basePath={basePath}
              index={i}
            />
          )
        })}
      {!loading &&
        recommendations.length > 0 &&
        activeTab === 'Recommendations' &&
        contentType === 'wishlist' &&
        recommendations.map((recommendation, i) => {
          const { query, queryString } = queryFunction(recommendation)
          return (
            <Recommendation
              key={`rec-${recommendation.id || recommendation.sid}`}
              query={query}
              queryString={queryString}
              recommendation={recommendation}
              user={user}
              toggleWishlist={toggleWishlist}
              wishlisted={!!wishlistedIds[recommendation.id]}
              basePath={basePath}
              index={i}
            />
          )
        })}
    </div>
  )

  return (
    <div className={styles.page}>
      {loading && (
        <div className={styles.recommendations}>
          <Recommendation.Skeleton />
        </div>
      )}
      {!loading &&
        (detailIndex === -1 ? (
          list
        ) : (
          <div ref={scrollRef} onScroll={handleScroll} className={styles.recommendationDetails}>
            <RecommendationDetails
              recommendation={recommendations[detailIndex]}
              toggleWishlist={toggleWishlist}
              wishlisted={!!wishlistedIds[recommendations[detailIndex].id]}
              query={queryFunction(recommendations[detailIndex].query)}
              passports={_get(queryFunction(recommendations[detailIndex]), 'query.passports', [])}
            />
          </div>
        ))}
      {mapEnabled &&
        (isBrowser || isTablet) && (
          <SidePanel
            loading={loading}
            recommendations={recommendations || []}
            query={contentType === 'recommendations' && queryFunction(recommendations).query}
            contentType={contentType}
            onlyOnDesktop
          />
      )}
    </div>
  )
}

Content.defaultProps = {
  noItemsMessage: 'No place matches your preferences'
}

Content.propTypes = {
  noItemsMessage: PropTypes.string
}

export default Content
