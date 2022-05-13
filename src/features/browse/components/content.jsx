import React from 'react'
import PropTypes from 'prop-types'
import styles from './content.module.scss'
import { Query } from 'components'
import { Link } from 'react-router-dom'
import qs from 'qs'
import { getImagePath, SUPPORTED_SIZES } from 'utils/image'
import cn from 'classnames'

const Content = ({ items, recentQueries, filtersDict, locations }) => {
  const bgs = [
    'linear-gradient(to right , rgba(99,193,176,1) 0%,rgba(78,125,214,1) 50%,#4BC0C8 100%)',
    'linear-gradient(to right , #FEAC5E 0%, #C779D0 50%,#4BC0C8 100%)',
    'linear-gradient(to right , #FF5F6D 0%, #FFC371 100%)',

    'linear-gradient(to right , #59C173 0%, #A17fE0 50%, #5D26C1 100%)'
  ]

  return (
    <div className={styles.page}>
      {recentQueries.length > 0 && (
        <div className={cn(styles.list, styles.recent)}>
          {recentQueries.map((q, i) => (
            <Link className={styles.card} to={`recommendations?${qs.stringify(q)}`}>
              <div
                className={styles.image}
                style={{
                  background: bgs[i % bgs.length]
                }}
              />
              <div className={styles.content}>
                <div className={styles.title}>
                  <span>Recent Search</span>
                </div>
                <Query
                  className={styles.query}
                  enableClick={false}
                  maxFiltersDisplayed={4}
                  query={q}
                  filtersDict={filtersDict}
                  locations={locations}
                  browseQuery={true}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className={styles.list}>
        {items.flat().map((item, i) => (
          <Link className={styles.card} to={item.link}>
            <div
              className={styles.image}
              style={
                item.image_hash
                  ? {
                    backgroundImage: `url(${getImagePath(
                      item.image_hash,
                      SUPPORTED_SIZES['1080']
                    )})`
                  }
                  : {
                    background: bgs[i % bgs.length]
                  }
              }
            />
            <div className={styles.content}>
              <div className={styles.title}>
                <span>{item.name}</span>
              </div>
              <Query
                className={styles.query}
                enableClick={false}
                maxFiltersDisplayed={10}
                query={qs.parse(item.link)}
                filtersDict={filtersDict}
                locations={locations}
                browseQuery={true}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

Content.defaultProps = {}

Content.propTypes = {
  items: PropTypes.array
}

export default Content
