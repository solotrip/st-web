import React, { createRef } from 'react'
import PropTypes from 'prop-types'
import styles from './content.module.scss'
// eslint-disable-next-line max-len

import Element from './element/index'

import { Loader } from 'components'

import {
  IosArrowLtr24Regular,
  IosArrowRtl24Regular
} from '@fluentui/react-icons'

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
  attractions,
  seasons,
  regions,
  costs,
  languages,
  destinations
}) => {
  const eventsContainer = createRef()
  const restrictionsContainer = createRef()
  const visaRequirementContainer = createRef()
  const activitiesContainer = createRef()
  const weatherContainer = createRef()
  const regionsContainer = createRef()
  const destinationsContainer = createRef()
  const attractionsContainer = createRef()
  const seasonsContainer = createRef()
  const costsContainer = createRef()
  const languageContainer = createRef()

  const scrollToRight = container => {
    container.current.scrollBy({
      top: 0,
      //width(302) + marginleft(10) + marginright(20)
      left: 332,
      behavior: 'smooth'
    })
  }
  const scrollToLeft = container => {
    container.current.scrollBy({
      top: 0,
      //width(302) + marginleft(10) + marginright(20)
      left: -332,
      behavior: 'smooth'
    })
  }

  return (
    <div className={styles.page}>
      <div className={styles.segments}>
        <div className={styles.titleRow}>
          <div className={styles.title}>Browse by Events</div>
          <div className={styles.arrowHolder}>
            <button onClick={() => scrollToLeft(eventsContainer)}>
              {' '}
              <IosArrowLtr24Regular className={styles.arrow} />
            </button>
            <button onClick={() => scrollToRight(eventsContainer)}>
              {' '}
              <IosArrowRtl24Regular className={styles.arrow} />
            </button>
          </div>
        </div>

        <div className={styles.segment}>
          <div
            id="scrollContainer"
            ref={eventsContainer}
            className={styles.notifications}
          >
            {children}
            {loading && <Loader />}
            {!loading &&
              events.length === 0 && (
                <span className={styles.noItems}>{noItemsMessage}</span>
            )}
            {events.map(element => {
              return <Element key={`${element.title}`} element={element} />
            })}
          </div>
        </div>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Browse by Restrictions</h1>
          <div className={styles.arrowHolder}>
            <button onClick={() => scrollToLeft(restrictionsContainer)}>
              {' '}
              <IosArrowLtr24Regular className={styles.arrow} />
            </button>
            <button onClick={() => scrollToRight(restrictionsContainer)}>
              {' '}
              <IosArrowRtl24Regular className={styles.arrow} />
            </button>
          </div>
        </div>

        <div className={styles.segment}>
          <div
            id="restrictionsContainer"
            ref={restrictionsContainer}
            className={styles.notifications}
          >
            {children}
            {loading && <Loader />}
            {!loading &&
              restrictions.length === 0 && (
                <span className={styles.noItems}>{noItemsMessage}</span>
            )}
            {restrictions.map(element => {
              return <Element key={`not-${element.title}`} element={element} />
            })}
          </div>
        </div>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Browse by Visa Requirement</h1>
          <div className={styles.arrowHolder}>
            <button onClick={() => scrollToLeft(visaRequirementContainer)}>
              {' '}
              <IosArrowLtr24Regular className={styles.arrow} />
            </button>
            <button onClick={() => scrollToRight(visaRequirementContainer)}>
              {' '}
              <IosArrowRtl24Regular className={styles.arrow} />
            </button>
          </div>
        </div>

        <div className={styles.segment}>
          <div
            id="visaRequirementContainer"
            ref={visaRequirementContainer}
            className={styles.notifications}
          >
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
        </div>
        <div className={styles.titleRow}>
          {' '}
          <h1 className={styles.title}>Browse by Activities</h1>{' '}
          <div className={styles.arrowHolder}>
            <button onClick={() => scrollToLeft(activitiesContainer)}>
              {' '}
              <IosArrowLtr24Regular className={styles.arrow} />
            </button>
            <button onClick={() => scrollToRight(activitiesContainer)}>
              {' '}
              <IosArrowRtl24Regular className={styles.arrow} />
            </button>
          </div>
        </div>

        <div className={styles.segment}>
          <div
            id="activitiesContainer"
            ref={activitiesContainer}
            className={styles.notifications}
          >
            {children}
            {loading && <Loader />}
            {!loading &&
              activities.length === 0 && (
                <span className={styles.noItems}>{noItemsMessage}</span>
            )}
            {activities.map(element => {
              return <Element key={`not-${element.title}`} element={element} />
            })}
          </div>
        </div>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Browse by Weather</h1>
          <div className={styles.arrowHolder}>
            <button onClick={() => scrollToLeft(weatherContainer)}>
              {' '}
              <IosArrowLtr24Regular className={styles.arrow} />
            </button>
            <button onClick={() => scrollToRight(weatherContainer)}>
              {' '}
              <IosArrowRtl24Regular className={styles.arrow} />
            </button>
          </div>
        </div>

        <div className={styles.segment}>
          <div
            id="weatherContainer"
            ref={weatherContainer}
            className={styles.notifications}
          >
            {children}
            {loading && <Loader />}
            {!loading &&
              weather.length === 0 && (
                <span className={styles.noItems}>{noItemsMessage}</span>
            )}
            {weather.map(element => {
              return <Element key={`not-${element.title}`} element={element} />
            })}
          </div>
        </div>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Browse by Regions</h1>
          <div className={styles.arrowHolder}>
            <button onClick={() => scrollToLeft(regionsContainer)}>
              {' '}
              <IosArrowLtr24Regular className={styles.arrow} />
            </button>
            <button onClick={() => scrollToRight(regionsContainer)}>
              {' '}
              <IosArrowRtl24Regular className={styles.arrow} />
            </button>
          </div>
        </div>

        <div className={styles.segment}>
          <div
            id="regionsContainer"
            ref={regionsContainer}
            className={styles.notifications}
          >
            {children}
            {loading && <Loader />}
            {!loading &&
              regions.length === 0 && (
                <span className={styles.noItems}>{noItemsMessage}</span>
            )}
            {regions.map(element => {
              return <Element key={`not-${element.title}`} element={element} />
            })}
          </div>
        </div>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Browse by Destinations</h1>
          <div className={styles.arrowHolder}>
            <button onClick={() => scrollToLeft(destinationsContainer)}>
              {' '}
              <IosArrowLtr24Regular className={styles.arrow} />
            </button>
            <button onClick={() => scrollToRight(destinationsContainer)}>
              {' '}
              <IosArrowRtl24Regular className={styles.arrow} />
            </button>
          </div>
        </div>

        <div className={styles.segment}>
          <div
            id="destinationsContainer"
            ref={destinationsContainer}
            className={styles.notifications}
          >
            {children}
            {loading && <Loader />}
            {!loading &&
              destinations.length === 0 && (
                <span className={styles.noItems}>{noItemsMessage}</span>
            )}
            {destinations.map(element => {
              return <Element key={`not-${element.title}`} element={element} />
            })}
          </div>
        </div>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Browse by Attractions</h1>
          <div className={styles.arrowHolder}>
            <button onClick={() => scrollToLeft(attractionsContainer)}>
              {' '}
              <IosArrowLtr24Regular className={styles.arrow} />
            </button>
            <button onClick={() => scrollToRight(attractionsContainer)}>
              {' '}
              <IosArrowRtl24Regular className={styles.arrow} />
            </button>
          </div>
        </div>

        <div className={styles.segment}>
          <div
            id="attractionsContainer"
            ref={attractionsContainer}
            className={styles.notifications}
          >
            {children}
            {loading && <Loader />}
            {!loading &&
              attractions.length === 0 && (
                <span className={styles.noItems}>{noItemsMessage}</span>
            )}
            {attractions.map(element => {
              return <Element key={`not-${element.title}`} element={element} />
            })}
          </div>
        </div>
        <div className={styles.titleRow}>
          {' '}
          <h1 className={styles.title}>Browse by Seasons</h1>{' '}
          <div className={styles.arrowHolder}>
            <button onClick={() => scrollToLeft(seasonsContainer)}>
              {' '}
              <IosArrowLtr24Regular className={styles.arrow} />
            </button>
            <button onClick={() => scrollToRight(seasonsContainer)}>
              {' '}
              <IosArrowRtl24Regular className={styles.arrow} />
            </button>
          </div>
        </div>
        <div className={styles.segment}>
          <div
            id="seasonsContainer"
            ref={seasonsContainer}
            className={styles.notifications}
          >
            {children}
            {loading && <Loader />}
            {!loading &&
              seasons.length === 0 && (
                <span className={styles.noItems}>{noItemsMessage}</span>
            )}
            {seasons.map(element => {
              return <Element key={`not-${element.title}`} element={element} />
            })}
          </div>
        </div>
        <div className={styles.titleRow}>
          {' '}
          <h1 className={styles.title}>Browse by Costs</h1>
          <div className={styles.arrowHolder}>
            <button onClick={() => scrollToLeft(costsContainer)}>
              {' '}
              <IosArrowLtr24Regular className={styles.arrow} />
            </button>
            <button onClick={() => scrollToRight(costsContainer)}>
              {' '}
              <IosArrowRtl24Regular className={styles.arrow} />
            </button>
          </div>
        </div>

        <div className={styles.segment}>
          <div
            id="costsContainer"
            ref={costsContainer}
            className={styles.notifications}
          >
            {children}
            {loading && <Loader />}
            {!loading &&
              costs.length === 0 && (
                <span className={styles.noItems}>{noItemsMessage}</span>
            )}
            {costs.map(element => {
              return <Element key={`not-${element.title}`} element={element} />
            })}
          </div>
        </div>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Browse by Language</h1>{' '}
          <div className={styles.arrowHolder}>
            <button onClick={() => scrollToLeft(languageContainer)}>
              {' '}
              <IosArrowLtr24Regular className={styles.arrow} />
            </button>
            <button onClick={() => scrollToRight(languageContainer)}>
              {' '}
              <IosArrowRtl24Regular className={styles.arrow} />
            </button>
          </div>
        </div>

        <div className={styles.segment}>
          <div
            id="languageContainer"
            ref={languageContainer}
            className={styles.notifications}
          >
            {children}
            {loading && <Loader />}
            {!loading &&
              languages.length === 0 && (
                <span className={styles.noItems}>{noItemsMessage}</span>
            )}
            {languages.map(element => {
              return <Element key={`not-${element.title}`} element={element} />
            })}
          </div>
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
