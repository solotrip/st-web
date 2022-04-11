import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './content.module.scss'
import Recommendation from './recommendation/index'
import SidePanel from './sidePanel'
import RecommendationDetails from './recommendation-details'
import { Link, useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import _get from 'lodash/get'

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
  const history = useHistory()

  const scrollRef = useRef()

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
      {children}
      {!loading &&
        recommendations.length === 0 && <span className={styles.noItems}>{noItemsMessage}</span>}
      {!loading &&
        recommendations.length > 0 &&
        recommendations.map((recommendation, i) => {
          const { query, queryString } = queryFunction(recommendation)
          return (
            <Recommendation
              key={`rec-${recommendation.sid}`}
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
        isBrowser &&
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
