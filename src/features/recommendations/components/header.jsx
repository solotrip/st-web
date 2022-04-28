import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import { useDispatch, useSelector } from 'react-redux'
import { MdClose, MdSearch } from 'react-icons/md'
import { Icon } from '@iconify/react'
import { addToTracked, removeFromTracked, trackSelector } from 'features/track/slice'
import { filtersSelector } from 'features/recommendations/containers/filters/slice'
import { locationSelector } from '../containers/location/slice'
import { useQuery } from 'utils/hooks/use-query'
import { Query } from 'components'

import styles from './header.module.scss'
import { isGuestSelector } from 'features/profile/slice'

const Header = ({
  recommendationId,
  loading,
  defaultExpanded = false,
  backIsVisible = true,
  searchIsVisible = true,
  trackIsVisible = true,
  alwaysShowBack = false,
  basePath
}) => {
  const { tracked } = useSelector(trackSelector)
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const { locations } = useSelector(locationSelector)
  const { filtersDict } = useSelector(filtersSelector)
  const isGuest = useSelector(isGuestSelector)

  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }
  const query = useQuery()

  useEffect(
    () => {
      if (!isExpanded && defaultExpanded) {
        setIsExpanded(true)
      }
      if (isExpanded && !defaultExpanded) {
        setIsExpanded(false)
      }
      //eslint-disable-next-line
    },
    [defaultExpanded]
  )
  const handleTrack = () => {
    if (isGuest) {
      history.replace({
        pathname: `${location.pathname}/signup`,
        search: location.search
      })
      return
    }
    if (tracked[recommendationId]) {
      dispatch(removeFromTracked(recommendationId))
    } else {
      //TODO: Add option to set name of the tracked query
      dispatch(addToTracked({ recommendationId }))
    }
  }

  const goBack = () => {
    if (location.pathname.includes('/r/')) {
      history.replace({ pathname: basePath, search: location.search })
    } else {
      history.push('/browse')
    }
  }

  const clearQuery = () => {
    history.replace({ pathname: '/recommendations' })
  }

  return (
    <div
      className={cx(styles.navbarFixed, {
        [styles.expanded]: isExpanded,
        [styles.navbarFixedIos]: Capacitor.getPlatform() === 'ios'
      })}
    >
      <div className={styles.upperHeader}>upperlogo</div>
      <div className={styles.actions}>
        <Link to="/browse" className={styles.headerLink}>
          <div className={styles.headerLogo} />
        </Link>
        {(alwaysShowBack || (backIsVisible && !isExpanded)) && (
          <button
            className={cx(styles.trackButton, {
              [styles.active]: !!tracked[recommendationId]
            })}
            onClick={goBack}
            disabled={loading}
          >
            <Icon
              icon="fluent:ios-arrow-ltr-24-regular"
              color="#3cafeb"
              height="30"
              className={styles.bell}
            />
          </button>
        )}
        {searchIsVisible && (
          <>
            {trackIsVisible ? (
              <button
                className={cx(styles.editSearch, {
                  [styles.withBack]: backIsVisible,
                  [styles.exp]: isExpanded
                })}
                onClick={handleExpand}
              >
                <MdSearch className={styles.searchIcon} />
                {query && Object.keys(query).length > 0 ? (
                  <Query
                    className={cx(styles.query, { [styles.exp]: isExpanded })}
                    history={history}
                    location={location}
                    prefixClassName={styles.prefix}
                    filtersDict={filtersDict}
                    query={query}
                    locations={locations}
                    maxFiltersDisplayed={isExpanded ? 3 : 1}
                    enableClick={isExpanded}
                  />
                ) : (
                  ' Start your search'
                )}
                {query &&
                  Object.keys(query).length > 0 && (
                    <MdClose onClick={clearQuery} role="button" className={styles.clearIcon} />
                )}
              </button>
            ) : (
              <button
                className={cx(styles.editSearchTrackless, {
                  [styles.withBack]: backIsVisible,
                  [styles.exp]: isExpanded
                })}
                onClick={handleExpand}
              >
                <MdSearch className={styles.searchIcon} />
                {query && Object.keys(query).length > 0 ? (
                  <Query
                    className={cx(styles.query, { [styles.exp]: isExpanded })}
                    history={history}
                    location={location}
                    prefixClassName={styles.prefix}
                    filtersDict={filtersDict}
                    query={query}
                    locations={locations}
                    maxFiltersDisplayed={isExpanded ? 3 : 1}
                    enableClick={isExpanded}
                  />
                ) : (
                  ' Start your search'
                )}
                {query &&
                  Object.keys(query).length > 0 && (
                    <MdClose onClick={clearQuery} role="button" className={styles.clearIcon} />
                )}
              </button>
            )}
            {trackIsVisible &&
              !isExpanded && (
                <button
                  className={cx(styles.trackButton, {
                    [styles.active]: !!tracked[recommendationId]
                  })}
                  onClick={handleTrack}
                  disabled={loading}
                >
                  {tracked[recommendationId] ? (
                    <Icon
                      icon="fluent:alert-24-regular"
                      color="#3cafeb"
                      height="30"
                      className={styles.bell}
                    />
                  ) : (
                    <Icon
                      icon="fluent:alert-off-24-regular"
                      color="#3cafeb"
                      height="30"
                      className={styles.bell}
                    />
                  )}
                </button>
            )}
          </>
        )}
      </div>
      <div className={styles.navigator}>
        {' '}
        <Link to="/browse" className={styles.navigatorItem}>
          Browse
        </Link>
        <Link to="/wishlist" className={styles.navigatorItem}>
          Wishlist
        </Link>
        <Link to="/notifications" className={styles.navigatorItem}>
          Notifications
        </Link>
        <Link to="/recommendations/preferences" className={styles.navigatorItem}>
          Preferences
        </Link>
      </div>
    </div>
  )
}

export default Header
