import React from 'react'
import PropTypes from 'prop-types'
import styles from './content.module.scss'
// eslint-disable-next-line max-len

import Element from './element/index'

import { Loader } from 'components'

const Content = ({
  recommendations,
  recommendationId,
  query,
  user,
  mapEnabled = true,
  toggleWishlist,
  wishlistedIds,
  notifications,
  loading,
  noItemsMessage,
  title,
  children,
  events,
  restrictions,
  visas,
  activities,
  weather,
  featured,
  attractions
}) => {
  //default dark map.

  return (
    <div className={styles.page}>
      <div className={styles.segments}>
        <h1 className={styles.title}>Featured</h1>
        <div className={styles.notifications}>
          {children}
          {loading && <Loader />}
          {!loading &&
            featured.length === 0 && (
              <span className={styles.noItems}>{noItemsMessage}</span>
          )}
          {featured.map(element => {
            return <Element key={`not-${element.title}`} element={element} />
          })}
        </div>
        <h1 className={styles.title}>Browse by Events</h1>
        <div className={styles.notifications}>
          {children}
          {loading && <Loader />}
          {!loading &&
            events.length === 0 && (
              <span className={styles.noItems}>{noItemsMessage}</span>
          )}
          {events.map(element => {
            return <Element key={`not-${element.title}`} element={element} />
          })}
        </div>
        <h1 className={styles.title}>Browse by Restrictions</h1>
        <div className={styles.notifications}>
          {children}
          {loading && <Loader />}
          {!loading &&
            recommendations.length === 0 && (
              <span className={styles.noItems}>{noItemsMessage}</span>
          )}
          {restrictions.map(element => {
            return <Element key={`not-${element.title}`} element={element} />
          })}
        </div>
        <h1 className={styles.title}>Browse by Visa Requirement</h1>
        <div className={styles.notifications}>
          {children}
          {loading && <Loader />}
          {!loading &&
            visas.length === 0 && (
              <span className={styles.noItems}>{noItemsMessage}</span>
          )}
          {visas.map(element => {
            return <Element key={`not-${element.title}`} element={element} />
          })}
        </div>

        <h1 className={styles.title}>Browse by Activities</h1>
        <div className={styles.notifications}>
          {children}
          {loading && <Loader />}
          {!loading &&
            recommendations.length === 0 && (
              <span className={styles.noItems}>{noItemsMessage}</span>
          )}
          {activities.map(element => {
            return <Element key={`not-${element.title}`} element={element} />
          })}
        </div>
        <h1 className={styles.title}>Browse by Weather</h1>
        <div className={styles.notifications}>
          {children}
          {loading && <Loader />}
          {!loading &&
            recommendations.length === 0 && (
              <span className={styles.noItems}>{noItemsMessage}</span>
          )}
          {weather.map(element => {
            return <Element key={`not-${element.title}`} element={element} />
          })}
        </div>
        <h1 className={styles.title}>Browse by Attractions</h1>
        <div className={styles.notifications}>
          {children}
          {loading && <Loader />}
          {!loading &&
            recommendations.length === 0 && (
              <span className={styles.noItems}>{noItemsMessage}</span>
          )}
          {attractions.map(element => {
            return <Element key={`not-${element.title}`} element={element} />
          })}
        </div>
      </div>
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
