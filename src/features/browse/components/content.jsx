import React from 'react'
import PropTypes from 'prop-types'
import styles from './content.module.scss'
import { HorizontalList, Image, Query } from 'components'
import { ReactComponent as EventsIcon } from 'assets/images/new-icons/events.svg'
import { ReactComponent as Calendar } from 'assets/images/new-icons/calendar.svg'
import { formatAsMonthDay } from '../../../utils/date'
import { ReactComponent as Location } from 'assets/images/new-icons/location.svg'
import { Link } from 'react-router-dom'
import qs from 'qs'

const ListItem = ({ name, location, startDate, endDate, link, image, image_hash }) => (
  <Link className={styles.wrapper} to={link}>
    {image_hash && (
      <Image
        src={'https://ik.imagekit.io/stmedia/browse/' + image_hash + '?tr=w-612,h-664'}
        srcsetProvided={true}
        srcset={`https://ik.imagekit.io/stmedia/browse/${image_hash}?tr=w-612,h-664,
                             https://ik.imagekit.io/stmedia/browse/${image_hash}?tr=w-1224,h-1328 2x,
                             https://ik.imagekit.io/stmedia/browse/${image_hash}?tr=w-1836,h-1992 3x`}
        className={styles.image}
        width={306}
        height={332}
        alt={name}
        alwaysRounded={true}
      />
    )}
    <div className={styles.lower}>
      {name && (
        <div className={styles.info}>
          <div>{name}</div>
        </div>
      )}
    </div>
  </Link>
)

const Content = ({ items, recentQueries, filtersDict, locations }) => {
  return (
    <div className={styles.page}>
      {recentQueries.length > 0 && (
        <div className={styles.queries}>
          <h2>Recent</h2>
          {recentQueries.map((q, i) => (
            <Link
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
          ))}
        </div>
      )}
      {items.map(group => (
        <HorizontalList
          key={`hl-group-${group[0].category}`}
          title={group[0].category}
          items={group.map(g => <ListItem {...g} />)}
          itemClassName={styles.wrapper}
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
