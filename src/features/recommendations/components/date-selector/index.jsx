import React from 'react'
import styles from './date-selector.module.scss'
import _ from 'lodash'
import { Calendar, MonthPicker, RadioInput } from 'components'
import {
  formatAsMonthDay,
  formatDuration,
  getMonthAbbreviation,
  isExpired
} from 'utils/date'
import { DATE_QUERY_TYPE, FLEXIBLE_DATE_CONFIG } from 'constants/index'

const DateSelector = ({
  holidays,
  onUpdate,
  data,
  recentDateRanges,
  recentMonths
}) => {
  const recentRangeItems = recentDateRanges
    .filter(d => !isExpired(d.start))
    .map(d => (
    <button onClick={() => onUpdate(d)
    }
    >
      {formatAsMonthDay(d.start)
      + (d.start !== d.end ? ` - ${formatAsMonthDay(d.end)}` : '')}
    </button>
    ))

  const monthItems = recentMonths.map(m => (
    <button onClick={() => onUpdate({
      weekendOnly: undefined,
      duration: undefined,
      ...m
    })}
    >
      <b>{formatDuration(m.duration, m.weekendOnly)}</b>{' in '}
      <b>
        {m.months.map(month => getMonthAbbreviation(month - 1))
          .join(', ')}
      </b>
    </button>
  ))
  return (

    <div className={styles.wrapper}>
      <RadioInput
        name="oneDisabled"
        options={[
          {
            label: 'Calendar',
            value: DATE_QUERY_TYPE.calendar
          },
          {
            label: 'Flexible',
            value: DATE_QUERY_TYPE.flexible
          }
        ]}
        value={data.type}
        onChange={type => {
          if (data.type === type) return
          const payload = { type }
          if (type === DATE_QUERY_TYPE.calendar) {
            payload.duration = undefined
            payload.weekendOnly = undefined
            payload.months = undefined
          } else if (type === DATE_QUERY_TYPE.flexible) {
            payload.start = undefined
            payload.end = undefined
            payload.duration = undefined
            payload.weekendOnly = true
            payload.months = undefined
          }
          onUpdate(payload)
        }}
        style={{ width: '100%', color: '#3cafeb' }}
      />
      {data.type === DATE_QUERY_TYPE.calendar && (
        <>
          <div className={styles.recentList}>
            {recentRangeItems}
          </div>
          <Calendar
            data={data}
            onUpdate={onUpdate}
            holidays={holidays}
          />
        </>
      )}
      {data.type === DATE_QUERY_TYPE.flexible && (
        <>
          <div className={styles.center}>
            <div className={styles.recentList}>
              {monthItems}
            </div>
            <div className={styles.howLong}>
              How long would you like to travel?
            </div>
            <RadioInput
              options={Object.values(FLEXIBLE_DATE_CONFIG).map((c, i) => ({
                label: c.label,
                value: c.value
              }))}
              value={(_.find(
                Object.values(FLEXIBLE_DATE_CONFIG)
                , o => (o.payload.duration
                  && o.payload.duration === data.duration) ||
                  (data.weekendOnly && o.payload.weekendOnly)
              ) || FLEXIBLE_DATE_CONFIG.weekend).value}
              onChange={newValue => {
                onUpdate({
                  duration: undefined,
                  weekendOnly: undefined,
                  ...FLEXIBLE_DATE_CONFIG[newValue].payload
                })
              }}
            />
          </div>
          <div className={styles.center}>
            <div className={styles.howLong}>
              {(data.months && data.months.length > 0) ? (
                <span>{'In '}
                  <b>{
                    data.months.slice(0, 3)
                      .map(m => getMonthAbbreviation(m - 1)).join(', ')
                  } {data.months.length > 3 ? '...' : ''}
                </b></span>) : 'When do you want to travel?'}
            </div>
            <MonthPicker
              selected={data.months}
              onSelect={selected => onUpdate({ months: selected })}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default DateSelector
