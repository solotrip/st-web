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
import countries from 'assets/data/countries.json'

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
      />
    )}{' '}
    {!image_hash &&
      image && (
        <Image
          src={image + '?tr=w-612,h-664'}
          srcsetProvided={true}
          srcset={`${image}?tr=w-612,h-664,
                               ${image}?tr=w-1224,h-1328 2x,
                               ${image}?tr=w-1836,h-1992 3x`}
          className={styles.image}
          width={306}
          height={332}
          alt={name}
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
      {console.log('recentq:', recentQueries)}
      {/*recentQueries.length > 0 && (
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
          )*/}

      {recentQueries.length > 0 && (
        <ul className={styles.browseCards}>
          {recentQueries.map((q, i) => (
            <li className={styles.browseCards__item}>
              <Link className={styles.browseCard} to={`recommendations?${qs.stringify(q)}`}>
                {' '}
                <div
                  className={styles.browseCard__image}
                  style={{
                    backgroundImage:
                      'url(https://ik.imagekit.io/stmedia/browse/54458236879c6d99974df7145403075b?tr=w-1360,h-1360)'
                  }}
                />
                <div className={styles.browseCard__content}>
                  <div className={styles.browseCard_title}>
                    Recent Search
                    {console.log('recent search query:', q)}
                    <Link
                      className={styles.queryLink}
                      key={`rec-q-${i}`}
                      to={`recommendations?${qs.stringify(q)}`}
                    >
                      <Query
                        className={styles.queryBrowse}
                        enableClick={false}
                        maxFiltersDisplayed={4}
                        query={q}
                        filtersDict={filtersDict}
                        locations={locations}
                        browseQuery={true}
                      />
                    </Link>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <ul className={styles.browseCards}>
        {items.flat().map(item => (
          <li className={styles.browseCards__item}>
            <Link className={styles.browseCard} to={item.link}>
              {' '}
              <div
                className={styles.browseCard__image}
                style={
                  item.image_hash
                    ? {
                      backgroundImage: `url(https://ik.imagekit.io/stmedia/browse/${
                        item.image_hash
                      }?tr=w-1360,h-1360)`
                    }
                    : {
                      backgroundImage: `url(${item.image}?tr=w-1360,h-1360s`
                    }
                }
              />
              <div className={styles.browseCard__content}>
                <div className={styles.browseCard_title}>
                  {item.name}
                  <Query
                    className={styles.queryBrowse2}
                    enableClick={false}
                    maxFiltersDisplayed={4}
                    query={qs.parse(item.link)}
                    filtersDict={filtersDict}
                    locations={locations}
                    browseQuery={true}
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/*items.map(group => (
        <HorizontalList
          key={`hl-group-${group[0].category}`}
          title={group[0].category}
          items={group.map(g => <ListItem {...g} />)}
          itemClassName={styles.card}
          isBrowse={true}
        />
      ))*/}
    </div>
  )
}

Content.defaultProps = {}

Content.propTypes = {
  items: PropTypes.array
}

export default Content
