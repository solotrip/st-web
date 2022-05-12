import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Tag from '../input/tag'
import styles from './query.module.scss'
import { MdAdd, MdEditCalendar, MdMyLocation, MdFactCheck, MdCompareArrows } from 'react-icons/md'
import { coordsToQuery } from 'features/recommendations/containers/location/slice'
import { formatAsMonthDay, formatDuration, getMonthAbbreviation } from 'utils/date'
import _get from 'lodash/get'
import _truncate from 'lodash/truncate'
import countries from 'assets/data/countries.json'

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
  maxFiltersDisplayed = 4,
  maxMonths = 3,
  locationNameMaxLength = 15,
  browseQuery = false
}) => {
  const navigate = path => {
    history.push({ pathname: path, search: location.search })
  }

  function extractCountry(ISO) {
    return countries.find(country => country.ISO === ISO)
  }

  const passes =
    query.passports && query.passports.length > 0
      ? query.passports.map(pass => {
        const country = extractCountry(pass)
        return {
          value: 'passport: ' + country.flag + ' ' + country.name,
          onClick: () => navigate('/recommendations/passport')
        }
      })
      : []

  const tags = [
    /*
    {
      value:
        'from:' +
        _truncate(
          _get(
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
    */ {
      prefix: 'Compare ',
      value: query.show && query.show.replaceAll('-', ' '),
      onClick: () => navigate('/recommendations/date'),
      icon: MdCompareArrows
    },
    {
      value:
        (query.duration || query.weekendOnly) && formatDuration(query.duration, query.weekendOnly),
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
          : `${formatAsMonthDay(query.start)} - ${formatAsMonthDay(query.end)}`),
      onClick: () => navigate('/recommendations/date'),
      icon: MdEditCalendar
    },
    ...passes,

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
                  : f.id === 't' && f.variables && f.variables.tags && f.variables.tags[0]
                    ? f.variables.tags[0].charAt(0).toUpperCase() + f.variables.tags[0].slice(1)
                    : f.id === 'c' && f.variables && f.variables.countryCodes
                      ? f.variables.countryCodes.map(
                        code => '   ' + extractCountry(code).flag + '   '
                      )
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
      {tags.filter(t => t.value).map(t => (
          <Tag
            key={`search-tag-${t.value}`}
            icon={t.icon}
            onClick={enableClick ? t.onClick : undefined}
            name={
              <span className={styles.text}>
                <span className={cn(styles.prefix, prefixClassName)}>{t.prefix || ''}</span>
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
