import React from 'react'
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
import { Capacitor } from '@capacitor/core'
import { MdNotificationsActive, MdNotificationsOff } from 'react-icons/md'
import { ReactComponent as FiltersIcon } from 'assets/images/icons/filters.svg'
import {
  ReactComponent as
  CalendarEditIcon
} from 'assets/images/icons/calendar-edit.svg'

const Header = ({
  recommendationId,
  loading
}) => {

  const { tracked } = useSelector(trackSelector)
  const dispatch = useDispatch()
  const location = useLocation()
  const handleTrack = () => {
    if (tracked[recommendationId]) {
      dispatch(removeFromTracked(recommendationId))
    } else {
      //TODO: Add option to set name of the tracked query
      dispatch(addToTracked({ recommendationId }))
    }
  }
  return (
    <>
      <div
        className={
          Capacitor.getPlatform() === 'ios'
            ? styles.navbarFixedIos
            : styles.navbarFixed
        }
      >
        <div className={styles.actions}>
          <Link
            to={{
              pathname: '/recommendations/date',
              search: location.search
            }}
          >
            <CalendarEditIcon className={styles.actionIcon}/>
          </Link>
          <div className={styles.rightActions}>
            <Link className={styles.filtersButton}
                  to={{
                    pathname: '/recommendations/filters',
                    search: location.search
                  }}
            >
              <FiltersIcon className={styles.actionIcon}/>
            </Link>
            <button
              className={cx(
                styles.trackButton,
                { [styles.active]: !!tracked[recommendationId] })
              }
              onClick={handleTrack}
              disabled={loading}
            >
              {tracked[recommendationId] ?
                <MdNotificationsActive className={styles.actionIcon}/> :
                <MdNotificationsOff className={styles.actionIcon}/>}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

Header.propTypes = {
  tracked: PropTypes.bool,
  recommendationId: PropTypes.string
}

export default Header
