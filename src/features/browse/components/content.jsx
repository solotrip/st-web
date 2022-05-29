import React from 'react'
import PropTypes from 'prop-types'
import styles from './content.module.scss'
import { Query } from 'components'
import { Link } from 'react-router-dom'
import qs from 'qs'
import { getImagePath, SUPPORTED_SIZES } from 'utils/image'
import cn from 'classnames'
import { Icon } from '@iconify/react'
import { NavLink } from 'react-router-dom'

const Content = ({ items, recentQueries, filtersDict, locations }) => {
  const bgs = [
    'linear-gradient(to right , rgba(99,193,176,1) 0%,rgba(78,125,214,1) 50%,#4BC0C8 100%)',
    'linear-gradient(to right , #FEAC5E 0%, #C779D0 50%,#4BC0C8 100%)',
    'linear-gradient(to right , #FF5F6D 0%, #FFC371 100%)',
    'linear-gradient(to right , #59C173 0%, #A17fE0 50%, #5D26C1 100%)'
  ]

  const activeTab = 'Browse'

  const tabs = (
    <div className={styles.tabs}>
      <button
        className={cn(styles.tabItem, {
          [styles.active]: activeTab === 'Browse'
        })}
        // onClick={tabSelect}
      >
        <Icon icon="ant-design:search-outlined" height="30" className={styles.tabIcon} />

        <span className={styles.tabName}>Browse</span>
      </button>
      <NavLink
        to={{ pathname: '/recommendations' }}
        className={cn(styles.tabItem, {
          [styles.active]: activeTab === 'Recommendations'
        })}
        //onClick={tabSelect}
      >
        <Icon icon="fluent:beach-24-regular" height="30" className={styles.tabIcon} />

        <span className={styles.tabName}>Recommendations</span>
      </NavLink>
      <NavLink
        to={{ pathname: '/recommendations/destination', search: 'complete=true' }}
        className={styles.tabItem}
        //onClick={tabSelect}
      >
        <Icon icon="bx:map-pin" height="30" className={styles.tabIcon} />
        <span className={styles.tabName}>To Destination</span>
      </NavLink>
      <NavLink
        to={{ pathname: '/recommendations/destination', search: 'complete=true' }}
        className={styles.tabItem}
        //onClick={tabSelect}
      >
        <Icon icon="ic:round-compare-arrows" height="30" className={styles.tabIcon} />
        <span className={styles.tabName}>Compare</span>
      </NavLink>
      <NavLink
        to={{ pathname: '/recommendations' }}
        className={styles.tabItem}
        //onClick={tabSelect}
      >
        <Icon icon="fluent:data-histogram-24-regular" height="30" className={styles.tabIcon} />
        <span className={styles.tabName}>Analytics</span>
      </NavLink>
      <NavLink
        to={{ pathname: '/recommendations' }}
        className={cn(styles.tabItem, { [styles.active]: activeTab === 'Map' })}
        //onClick={tabSelect}
      >
        <Icon icon="fluent:map-24-regular" height="30" className={styles.tabIcon} />
        <span className={styles.tabName}>Map</span>
      </NavLink>
      <NavLink
        to={{ pathname: '/recommendations' }}
        className={cn(styles.tabItem, { [styles.active]: activeTab === 'Map' })}
        //onClick={tabSelect}
      >
        <Icon icon="fluent:calendar-edit-24-regular" height="30" className={styles.tabIcon} />
        <span className={styles.tabName}>Dates</span>
      </NavLink>
      <NavLink
        to={{ pathname: '/recommendations/passport' }}
        className={cn(styles.tabItem, { [styles.active]: activeTab === 'Map' })}
        //onClick={tabSelect}
      >
        <Icon icon="fluent:document-header-24-regular" height="30" className={styles.tabIcon} />
        <span className={styles.tabName}>Passport</span>
      </NavLink>
      <NavLink
        to={{ pathname: '/recommendations/filters' }}
        className={cn(styles.tabItemLast, { [styles.active]: activeTab === 'Map' })}
        //onClick={tabSelect}
      >
        <Icon icon="fluent:filter-24-regular" height="30" className={styles.tabIcon} />
        <span className={styles.tabName}>Filters</span>
      </NavLink>
    </div>
  )

  return (
    <div className={styles.page}>
      {tabs}
      {recentQueries.length > 0 && (
        <div className={cn(styles.list, styles.recent)}>
          {recentQueries.map((q, i) => (
            <Link className={styles.card} to={`recommendations?${qs.stringify(q)}`}>
              <div
                className={styles.image}
                style={
                  {
                    // background: bgs[i % bgs.length]
                  }
                }
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
                    // background: bgs[i % bgs.length]
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
