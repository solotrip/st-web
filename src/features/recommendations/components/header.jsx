import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import { useDispatch, useSelector } from 'react-redux'
import { MdClose, MdSearch } from 'react-icons/md'
import { Icon } from '@iconify/react'
import { addToTracked, removeFromTracked, trackSelector } from 'features/track/slice'

import { useQuery } from 'utils/hooks/use-query'
import { NavLink } from 'react-router-dom'

import styles from './header.module.scss'
import { isGuestSelector } from 'features/profile/slice'

import {
  Alert28Regular,
  CircleEdit24Regular,
  Heart28Regular,
  List28Regular,
  Search28Regular
} from '@fluentui/react-icons'

const Header = ({
  recommendationId,
  recommendationHash,
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

  const isGuest = useSelector(isGuestSelector)

  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }
  const query = useQuery()

  const isTracked = !!tracked[recommendationHash]

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (isTracked) {
      dispatch(removeFromTracked(recommendationHash))
    } else {
      //TODO: Add option to set name of the tracked query
      dispatch(addToTracked({ recommendationHash }))
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

  const openShare = () => {
    history.push({
      pathname: '/recommendations/share',
      search: location.search
    })
  }

  const openFilters = () => {
    history.push({ pathname: '/recommendations/filters', search: location.search })
  }

  const openDates = () => {
    history.push({ pathname: '/recommendations', search: location.search })
  }

  return (
    <div
      className={cx(styles.navbarFixed, {
        [styles.expanded]: isExpanded,
        [styles.navbarFixedIos]: Capacitor.getPlatform() === 'ios'
      })}
    >
      <div className={styles.actions}>
        <Link to="/browse" className={styles.headerLink}>
          <div className={styles.headerLogo} />
        </Link>
        {(alwaysShowBack || backIsVisible) && (
          <button
            className={cx(styles.trackButton, {
              [styles.active]: isTracked
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
              query && Object.keys(query).length > 0 ? (
                <button className={styles.editSearchBlue} onClick={openFilters}>
                  <Icon
                    icon="fluent:calendar-edit-24-regular"
                    height="30"
                    className={styles.tabIcon}
                  />
                  <div className={styles.editSearchBlueText}>Edit your Search</div>
                </button>
              ) : (
                <button
                  className={cx(styles.editSearchTrackless, {
                    [styles.withBack]: backIsVisible,
                    [styles.exp]: isExpanded
                  })}
                  onClick={openDates}
                >
                  <MdSearch className={styles.searchIcon} />
                  <div className={styles.startText}>Start your search</div>
                  {query &&
                    Object.keys(query).length > 0 && (
                      <MdClose onClick={clearQuery} role="button" className={styles.clearIcon} />
                  )}
                </button>
              )
            ) : (
              <button
                className={cx(styles.editSearchTrackless, {
                  [styles.withBack]: backIsVisible,
                  [styles.exp]: isExpanded
                })}
                onClick={openDates}
              >
                <MdSearch className={styles.searchIcon} />
                {<div className={styles.startText}>Start your search</div>}
              </button>
            )}
            <div className={trackIsVisible ? styles.sideHolder : styles.sideHolderHidden}>
              {trackIsVisible && (
                <button
                  className={cx(styles.trackButton, {
                    [styles.active]: isTracked
                  })}
                  onClick={handleTrack}
                  disabled={loading}
                >
                  {isTracked ? (
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
              {trackIsVisible && (
                <button
                  className={cx(styles.trackButton, {
                    [styles.active]: isTracked
                  })}
                  onClick={openShare}
                  disabled={loading}
                >
                  {
                    <Icon
                      icon="fluent:share-ios-24-filled"
                      color="#3cafeb"
                      height="30"
                      className={styles.bell}
                    />
                  }
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <div className={styles.navigator}>
        {' '}
        <NavLink
          to={{ pathname: '/browse', search: location.search }}
          className={styles.navigatorItem}
          activeClassName={styles.active}
        >
          <Search28Regular />Browse
        </NavLink>
        <NavLink
          to={{ pathname: '/wishlist', search: location.search }}
          className={styles.navigatorItem}
          activeClassName={styles.active}
        >
          <Heart28Regular />Wishlist
        </NavLink>
        <NavLink
          to={{ pathname: '/notifications', search: location.search }}
          className={styles.navigatorItem}
          activeClassName={styles.active}
        >
          <Alert28Regular /> Notifications
        </NavLink>
        <NavLink
          to={{
            pathname: '/recommendations/preferences',
            search: location.search
          }}
          className={styles.navigatorItem}
          activeClassName={styles.active}
        >
          <CircleEdit24Regular />Preferences
        </NavLink>
      </div>
    </div>
  )
}

export default Header
