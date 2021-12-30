/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import styles from './header.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToTracked,
  removeFromTracked,
  trackSelector
} from 'features/track/slice'
import { locationSelector } from '../containers/location/slice'
import { filtersSelector } from '../containers/filters/slice'
import { querySelector } from 'features/query/slice'
import { Capacitor } from '@capacitor/core'

import { ReactComponent as FiltersIcon } from 'assets/images/icons/filters.svg'
import { ReactComponent as CalendarEditIcon } from 'assets/images/icons/calendar-edit.svg'
import { MdEdit } from 'react-icons/md'
import { Icon } from '@iconify/react'
import qs from 'qs'

const Header = ({ recommendationId, loading }) => {
  const { tracked } = useSelector(trackSelector)
  const dispatch = useDispatch()
  const location = useLocation()
  const { activeLocation, locations } = useSelector(locationSelector)
  const [isExpanded, setIsExpanded] = useState(false)
  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }
  const { query } = useSelector(querySelector)
  const { filters } = useSelector(filtersSelector)

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

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true)
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
          <div className={styles.rightActions}>
            <button className={styles.editSearch} onClick={handleExpand}>
              <div className={styles.queryText}>
                From{' '}
                {locations && activeLocation && locations[activeLocation]
                  ? locations[activeLocation].name_en
                  : // eslint-disable-next-line max-len
                  'Anywhere'}{' '}
                to Anywhere, based on your selected dates, {filters.length}{' '}
                filters applied
              </div>
            </button>

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
          </div>
        </div>
      </div>
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
              <MdEdit className={styles.actionIcon} />
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
              <MdEdit className={styles.actionIcon} />
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
              <CalendarEditIcon className={styles.actionIcon} />
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
              <span>{filters.length} filters selected</span>
              <FiltersIcon className={styles.actionIcon} />
            </Link>
        )}
      </div>
    </div>
  )
}

Header.propTypes = {
  tracked: PropTypes.bool,
  recommendationId: PropTypes.string
}

export default Header
