import React, { useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import { Link, useHistory, useLocation } from 'react-router-dom'
import styles from './header.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToTracked,
  removeFromTracked,
  trackSelector
} from 'features/track/slice'
import { locationSelector } from '../containers/location/slice'
import { Capacitor } from '@capacitor/core'

import { ReactComponent as FiltersIcon } from 'assets/images/icons/filters.svg'
import {
  ReactComponent as
  CalendarEditIcon
} from 'assets/images/icons/calendar-edit.svg'
import { MdEdit } from 'react-icons/md'
import { Icon } from '@iconify/react'
import qs from 'qs'
import { useQuery } from 'utils/hooks/use-query'

const Header = ({
  recommendationId,
  loading,
  defaultExpanded = false,
  backIsVisible = true,
  searchIsVisible = true,
  trackIsVisible = true,
  basePath
}) => {
  const { tracked } = useSelector(trackSelector)
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const { activeLocation, locations } = useSelector(locationSelector)
  const [isExpanded, setIsExpanded] = useState(false)
  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }
  const query = useQuery()

  const handleScroll = () => {
    setIsExpanded(false)
  }

  function useOutsideAlerter(ref) {
    useEffect(
      () => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            setIsExpanded(false)
          }
        }

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener('mousedown', handleClickOutside)
        }
      },
      [ref]
    )
  }

  const handleTrack = () => {
    if (tracked[recommendationId]) {
      dispatch(removeFromTracked(recommendationId))
    } else {
      //TODO: Add option to set name of the tracked query
      dispatch(addToTracked({ recommendationId }))
    }
  }

  const goBack = () => {
    if (location.pathname.startsWith(`${basePath}/r/`)) {
      history.replace({ pathname: basePath, search: location.search })
    } else {
      history.push('/browse')
    }
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true)
  }, [])

  useEffect(() => {
    if (defaultExpanded) {
      setIsExpanded(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={isExpanded ? styles.expanded : styles.notExpanded}>
      <div
        className={
          Capacitor.getPlatform() === 'ios'
            ? styles.navbarFixedIos
            : styles.navbarFixed
        }
      >
        <div className={styles.actions}>

          {backIsVisible && (
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
          {searchIsVisible && (<>
              <button
                className={
                  backIsVisible ? styles.editSearchwithBack : styles.editSearch
                }
                onClick={handleExpand}
              >
                <div className={styles.queryText}>
                  From{' '}
                  {locations && activeLocation && locations[activeLocation]
                    ? locations[activeLocation].name_en
                    : 'Anywhere'}{' '}
                  to Anywhere, based on your selected dates,{' '}
                  {query &&
                  qs.parse(query) &&
                  qs.parse(query).filters &&
                  Object.keys(qs.parse(query).filters).length}{' '}
                  filters applied
                </div>
              </button>
              {trackIsVisible && (
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
      </div>
      {searchIsVisible && (
        <div
          className={
            isExpanded ? styles.expandedElements : styles.expandedElementsHidden
          }
        >
          {isExpanded &&
          activeLocation !== '' && (
            <Link
              className={styles.fromLink}
              to={{
                pathname: '/recommendations/location',
                search: qs.stringify(query)
              }}
            >
              <span>
                <b>From: </b>
                {locations &&
                activeLocation &&
                locations[activeLocation] &&
                locations[activeLocation].fullname_en}
              </span>
              <MdEdit className={styles.actionIcon}/>
            </Link>
          )}
          {isExpanded &&
          activeLocation !== '' && (
            <Link
              className={styles.fromLink}
              to={{
                pathname: '/recommendations/location',
                search: qs.stringify(query)
              }}
            >
              <span>
                <b>To: </b>
                Anywhere
              </span>
              <MdEdit className={styles.actionIcon}/>
            </Link>
          )}
          {isExpanded &&
          activeLocation !== '' && (
            <Link
              className={styles.fromLink}
              to={{
                pathname: '/recommendations/date',
                search: location.search
              }}
            >
              <span>Edit your Available Dates</span>
              <CalendarEditIcon className={styles.actionIcon}/>
            </Link>
          )}

          {isExpanded &&
          activeLocation !== '' && (
            <Link
              className={styles.fromLink}
              to={{
                pathname: '/recommendations/filters',
                search: location.search
              }}
            >
              <span>
                {query &&
                qs.parse(query) &&
                qs.parse(query).filters &&
                Object.keys(qs.parse(query).filters).length}{' '}
                filters selected
              </span>
              <FiltersIcon className={styles.actionIcon}/>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default Header
