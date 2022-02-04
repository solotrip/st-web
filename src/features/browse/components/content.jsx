import React from 'react'
import PropTypes from 'prop-types'
import styles from './content.module.scss'
import { HorizontalList, Image, Query } from 'components'
import {
  ReactComponent as EventsIcon
} from 'assets/images/new-icons/events.svg'
import {
  ReactComponent as Calendar
} from 'assets/images/new-icons/calendar.svg'
import { formatAsMonthDay } from '../../../utils/date'
import {
  ReactComponent as Location
} from 'assets/images/new-icons/location.svg'
import { Link } from 'react-router-dom'
import qs from 'qs'

const ListItem = ({ name, location, startDate, endDate, link, image }) => (
  <>
    {image &&
    <Image
      src={image}
      containerClassName={styles.image}
      width={300}
      height={150}
      alt={name}
    />
    }
    {name && (
      <div className={styles.info}>
        <div className={styles.icon}>
          <EventsIcon/>
        </div>
        <div>{name}</div>
      </div>)
    }
    {(startDate || endDate) &&
    <div className={styles.info}>
      <div className={styles.icon}>
        {' '}
        <Calendar/>
      </div>
      <div>
        {formatAsMonthDay(startDate)}
        {startDate !== endDate
          ? ` - ${formatAsMonthDay(endDate)}`
          : ''}
      </div>
    </div>}
    {location && <div className={styles.info}>
      <div className={styles.icon}>
        <Location/>
      </div>
      <div>{location}</div>
    </div>}

    <Link to={link}>
      <button className={styles.showDetails}>Discover</button>
    </Link>
  </>)


const Content = ({
  items,
  recentQueries,
  filtersDict,
  locations
}) => {

  return (
    <div className={styles.page}>
      {recentQueries.length > 0 && (<div className={styles.queries}>
        <h2>Recent</h2>
        {recentQueries.map((q, i) => <Link
            className={styles.queryLink}
            key={`rec-q-${i}`}
            to={`recommendations?${qs.stringify(q)}`}
        >
            <Query
              className={styles.query}
              enableClick={false}
              maxFiltersDisplayed={4}
              query={q}
              filtersDict={filtersDict}
              locations={locations}
            />
          </Link>
        )}
      </div>)
      }
      {items.map(group => (
        <HorizontalList
          key={`hl-group-${group[0].category}`}
          title={group[0].category}
          items={group.map(g => <ListItem {...g} />)}
          itemClassName={styles.card}
        />
      ))}
    </div>
  )
}

Content.defaultProps = {}

Content.propTypes = {
  items: PropTypes.array
}

export default Content
