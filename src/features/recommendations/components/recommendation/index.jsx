import React from 'react'
import styles from './recommendation.module.scss'
import { HorizontalScroll, Image } from 'components'
import { ReactComponent as Cloud } from 'assets/images/icons/cloud.svg'
import { ReactComponent as Home } from 'assets/images/icons/home.svg'
import { ReactComponent as Passport } from 'assets/images/icons/passport.svg'
import { ReactComponent as Plane } from 'assets/images/icons/plane.svg'
import { formatAsMonthDay } from 'utils/date'

const Recommendation = ({
  recommendation,
  recommendationId,
  query,
  activeHandler,
  wishlisted,
  toggleWishlist
}) => {

  const {
    sid,
    country,
    name,
    startDate,
    endDate,
    events,

    hotelPrice,
    hostelPrice,
    rentalPrice,

    fastestFlightCost,
    cheapestFlightCost,
    bestFlightCost,
    top_pois: topPois,
    climate = {}
  } = recommendation

  const {
    t_min: minTemperature,
    t_max: maxTemperature
  } = climate

  return (

    <div
      onMouseEnter={() => {
        activeHandler(sid)
      }}
      className={styles.recommendationCard}
    >
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>
            {name}
            <i>{country.name}</i> {country.emoji_flag}
          </h2>
          <span className={styles.date}>
            {formatAsMonthDay(startDate)}
            {startDate !== endDate
              ? ` - ${formatAsMonthDay(endDate)}` : ''}
          </span>
        </div>
        <button
          className={wishlisted ? styles.heartFilled : styles.heart}
          onClick={() => toggleWishlist({
            query,
            recommendation,
            recommendationId
          })}
        >
          {
            <img
              className={wishlisted ? styles.heartFilled : styles.heart}
              alt=""
            />
          }
        </button>
      </div>
      <div className={styles.content}>
        {(events && events.length > 0) && (
          <>
            <div className={styles.sectionTitle}>Events & Festivals</div>
            <HorizontalScroll className={styles.slide} settings={
              {
                responsive: undefined,
                slidesToShow: Math.min(events.length, 3),
                slidesToScroll: 2
              }
            } items={events.map(event => (
              <div key={`${sid}-poi-${event.id}`}
                   className={styles.slide}
              >
                <Image
                  src={(event.images && event.images.length > 1)
                  && event.images[0]}
                  className={styles.slideImage}
                  containerClassName={styles.slideImageContainer}
                  width={100}
                  height={100}
                  shadowBlur={30}
                  alt={event.title}
                  key={event.eid}
                />
                <div className="flex center">
                  <div className={styles.slideText}>
                    {event.title}
                  </div>
                </div>
              </div>
            ))}
            />

          </>
        )
        }
        <div className={styles.stats}>
          {(fastestFlightCost || cheapestFlightCost || bestFlightCost) && (
            <div className={styles.statRow}>
              <div className={styles.statImage}>
                <Plane/>
              </div>
              <div className={styles.statContent}>
                {fastestFlightCost && (
                  <div className={styles.statContentCell}>
                    <div className={styles.statName}>
                      Fastest
                    </div>
                    <div className={styles.statValue}>{fastestFlightCost}</div>
                  </div>
                )}
                {cheapestFlightCost && (
                  <div className={styles.statContentCell}>
                    <div className={styles.statName}>
                      Cheapest
                    </div>
                    <div className={styles.statValue}>{cheapestFlightCost}</div>
                  </div>
                )}
                {bestFlightCost && (
                  <div className={styles.statContentCell}>
                    <div className={styles.statName}>Best</div>
                    <div className={styles.statValue}>{bestFlightCost}</div>
                  </div>

                )}
              </div>
            </div>
          )}
          {(hotelPrice || hostelPrice || rentalPrice) &&
          < div className={styles.statRow}>
            <div className={styles.statImage}>
              <Home/>
            </div>
            <div className={styles.statContent}>
              {hotelPrice && (
                <div className={styles.statContentCell}>
                  <div className={styles.statName}>
                    Hotel
                  </div>
                  <div className={styles.statValue}>{hotelPrice}</div>
                </div>
              )}
              {hostelPrice && (
                <div className={styles.statContentCell}>
                  <div className={styles.statName}>
                    Hostel
                  </div>
                  <div
                    className={styles.statValue}
                  >{hostelPrice}</div>
                </div>
              )}
              {rentalPrice && (
                <div className={styles.statContentCell}>
                  <div className={styles.statName}>
                    Airbnb
                  </div>
                  <div className={styles.statValue}>{rentalPrice}</div>
                </div>
              )}
            </div>
          </div>
          }
          <div className={styles.statRow}>
            <div className={styles.statImage}>
              <Passport/>
            </div>
            <div className={styles.statContent}>
              <div className={styles.statContentCell}>
                <div className={styles.statName}>
                  Visa free for you.
                </div>
                <div className={styles.statValue}>
                  PCR test is necessary.
                </div>
              </div>
            </div>
          </div>
          {(minTemperature != null && maxTemperature != null) && (
            <div className={styles.statRow}>
              <div className={styles.statImage}>
                <Cloud/>
              </div>
              <div className={styles.statContent}>
                <div className={styles.statContentCell}>
                  <div className={styles.statName}>
                    min {minTemperature}°C, max {maxTemperature}°C
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {(topPois && topPois.length > 0) && (
          <>
            <div className={styles.sectionTitle}>What to See</div>
            <HorizontalScroll className={styles.slide} settings={
              {
                responsive: undefined,
                slidesToShow: 3,
                slidesToScroll: 2
              }
            } items={topPois.map(poi => (
              <div key={`${sid}-poi-${poi.id}`}
                   className={styles.slide}
              >
                <Image
                  src={poi.imageLink}
                  className={styles.slideImage}
                  width={100}
                  height={100}
                  shadowBlur={30}
                  alt={poi.name}
                  key={poi.id}
                />
                <div className={styles.slideText}>
                  {poi.name}
                </div>
              </div>
            ))}
            />

          </>
        )
        }
      </div>
    </div>
  )
}

export default Recommendation
