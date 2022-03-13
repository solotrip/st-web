import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Tag from '../input/tag'
import styles from './query.module.scss'
import { MdAdd, MdEditCalendar, MdMyLocation } from 'react-icons/md'
import { coordsToQuery } from 'features/recommendations/containers/location/slice'
import {
  formatAsMonthDay,
  formatDuration,
  getMonthAbbreviation
} from 'utils/date'
import _ from 'lodash'

const Query = ({
  query,
  filtersDict,
  locations,
  location,
  history,
  onReset,
  enableClick = true,
  className,
  prefixClassName,
  maxFiltersDisplayed = 2,
  maxMonths = 2,
  locationNameMaxLength = 10
}) => {
  const navigate = path => {
    history.push({ pathname: path, search: location.search })
  }

  const tags = [
    {
      value: _.truncate(
        _.get(
          locations[
            coordsToQuery({
              latitude: query.lat,
              longitude: query.lon
            })
          ],
          'name_en'
        ),
        { length: locationNameMaxLength }
      ),
      onClick: () => navigate('/recommendations/location'),
      icon: MdMyLocation
    },
    {
      // prefix: 'For ',
      value:
        (query.duration || query.weekendOnly) &&
        formatDuration(query.duration, query.weekendOnly),
      onClick: () => navigate('/recommendations/date'),
      icon: MdEditCalendar
    },
    {
      value:
        query.months &&
        `${query.months
          .map(m => getMonthAbbreviation(m - 1))
          .slice(0, maxMonths)
          .join(', ')}${query.months.length > maxMonths ? '...' : ''}`,
      onClick: () => navigate('/recommendations/date'),
      icon: MdEditCalendar
    },
    {
      value:
        query.start &&
        (query.start === query.end
          ? formatAsMonthDay(query.start)
          : `${formatAsMonthDay(query.start)} - ${formatAsMonthDay(
            query.end
          )}`),
      onClick: () => navigate('/recommendations/date'),
      icon: MdEditCalendar
    },

    ...(query.filters
      ? query.filters.length > maxFiltersDisplayed
        ? [
          {
            value: `${query.filters.length} filters`,
            onClick: () => navigate('/recommendations/filters')
          }
        ]
        : query.filters.map(f => ({
          value:
            filtersDict && filtersDict[f.id]
              ? f.id === 'a'
                ? f.variables.areaSids[0].charAt(0).toUpperCase() +
              f.variables.areaSids[0].slice(1)
                : filtersDict[f.id].name
              : null,
          onClick: () => navigate('/recommendations/filters')
        }))
      : [
        {
          value: enableClick && <b>Add filters</b>,
          icon: MdAdd,
          onClick: () => navigate('/recommendations/filters')
        }
      ])
  ]

  return (
    <div className={cn(styles.container, className)}>
      {tags &&
      tags.filter(t => t.value).map(t => (
        <Tag
          key={`search-tag-${t.value}`}
          icon={t.icon}
          onClick={enableClick ? t.onClick : undefined}
          name={
            <span className={styles.text}>
                <b className={cn(styles.prefix, prefixClassName)}>
                  {t.prefix || ''}
                </b>
              {t.value}
              </span>
          }
        />
      ))}
    </div>
  )
}

Query.propTypes = {
  className: PropTypes.string,
  onReset: PropTypes.func
}

export default Query
