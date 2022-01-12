import React, { useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import { useHistory, useLocation } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import { useDispatch, useSelector } from 'react-redux'
import { MdClose, MdSearch } from 'react-icons/md'
import { Icon } from '@iconify/react'
import {
  addToTracked,
  removeFromTracked,
  trackSelector
} from 'features/track/slice'
import { filtersSelector }
  from 'features/recommendations/containers/filters/slice'
import { locationSelector } from '../containers/location/slice'
import { useQuery } from 'utils/hooks/use-query'
import { Query } from 'components'

import styles from './header.module.scss'

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
  const { locations } = useSelector(locationSelector)
  const { filtersDict } = useSelector(filtersSelector)
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

  const clearQuery = () => {
    history.replace({ pathname: '/recommendations' })
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
    <div className={cx(styles.navbarFixed, {
      [styles.expanded]: isExpanded,
      [styles.navbarFixedIos]: Capacitor.getPlatform() === 'ios'
    }
    )}
    >
      <div className={styles.actions}>

        {(backIsVisible && !isExpanded) && (
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
              className={cx(styles.editSearch,
                {
                  [styles.withBack]: backIsVisible,
                  [styles.exp]: isExpanded
                })
              }
              onClick={handleExpand}
            >
              <MdSearch className={styles.searchIcon}/>
              {query && Object.keys(query).length > 0
                ? <Query
                  className={cx(
                    styles.query,
                    { [styles.exp]: isExpanded }
                  )}
                  history={history}
                  location={location}
                  prefixClassName={styles.prefix}
                  filtersDict={filtersDict}
                  query={query}
                  locations={locations}
                  maxFiltersDisplayed={2}
                  enableClick={isExpanded}
                />
                : 'Search for your dream destination...'}
              {(query && Object.keys(query).length > 0) &&
              <MdClose
                onClick={clearQuery}
                role="button"
                className={styles.clearIcon}
              />}
            </button>
            {(trackIsVisible && !isExpanded) && (
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
  )
}

export default Header
