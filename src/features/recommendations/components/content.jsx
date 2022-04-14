import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './content.module.scss'
import Recommendation from './recommendation/index'
import SidePanel from './sidePanel'
import RecommendationDetails from './recommendation-details'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { isBrowser, isTablet } from 'react-device-detect'
import _get from 'lodash/get'
import qs from 'qs'

import {
  MdAdd,
  MdEditCalendar,
  MdMyLocation,
  MdBarChart,
  MdMap,
  MdOutlineStar
} from 'react-icons/md'

const Content = ({
  recommendations,
  queryFunction,
  query,
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
  const history = useHistory()
  const location = useLocation()

  const scrollRef = useRef()

  const [activeTab, setActiveTab] = useState('Recommendations')

  useEffect(
    () => {
      if (location.pathname.includes('map')) {
        setActiveTab('Map')
      } else if (location.pathname.includes('analytics')) {
        setActiveTab('Analytics')
      } else {
        setActiveTab('Recommendations')
      }
    }
    //eslint-disable-next-line
  )

  function tabSelect(e) {
    setActiveTab(e.target.innerText)
    //open sheet with content
    const lowerCased = e.target.innerText.toLowerCase()

    history.replace(
      lowerCased === 'recommendations'
        ? {
          pathname: `/${lowerCased}/`,
          search: qs.stringify(query)
        }
        : {
          pathname: `/recommendations/${lowerCased}/`,
          search: qs.stringify(query)
        }
    )
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

  const list = !loading && (
    <div ref={scrollRef} className={styles.recommendations} onScroll={handleScroll}>
      {title && <h1 className={styles.title}>{title}</h1>}
      <div
        className={
          contentType === 'recommendations'
            ? styles.analyticsTabRecommendations
            : styles.analyticsTab
        }
      >
        <button
          className={activeTab === 'Recommendations' ? styles.tabItemActive : styles.tabItem}
          onClick={tabSelect}
        >
          <MdOutlineStar
            className={activeTab === 'Recommendations' ? styles.tabIconActive : styles.tabIcon}
            fontSize="24px"
          />
          <span className={activeTab === 'Recommendations' ? styles.tabNameActive : styles.tabName}>
            Recommendations
          </span>
        </button>{' '}
        <button
          className={activeTab === 'Analytics' ? styles.tabItemActive : styles.tabItem}
          onClick={tabSelect}
        >
          <MdBarChart
            className={activeTab === 'Analytics' ? styles.tabIconActive : styles.tabIcon}
            fontSize="24px"
          />
          <span className={activeTab === 'Analytics' ? styles.tabNameActive : styles.tabName}>
            Analytics
          </span>
        </button>{' '}
        <button
          className={activeTab === 'Map' ? styles.tabItemActive : styles.tabItem}
          onClick={tabSelect}
        >
          <MdMap
            className={activeTab === 'Map' ? styles.tabIconActive : styles.tabIcon}
            fontSize="24px"
          />
          <span className={activeTab === 'Map' ? styles.tabNameActive : styles.tabName}>Map</span>
        </button>{' '}
      </div>
      {children}
      {!loading &&
        recommendations.length === 0 && <span className={styles.noItems}>{noItemsMessage}</span>}
      {!loading &&
        recommendations.length > 0 &&
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
        (isBrowser || isTablet) &&
        !loading &&
        recommendations.length > 0 && (
          <SidePanel
            className={styles.sidePanel}
            loading={loading}
            recommendations={recommendations}
            query={contentType === 'recommendations' && queryFunction(recommendations)}
            queryFunction={queryFunction}
            basePath={basePath}
            contentType={contentType}
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
