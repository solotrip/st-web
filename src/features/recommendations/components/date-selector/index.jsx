import React from 'react'
import styles from './date-selector.module.scss'
import { SegmentedControl } from 'segmented-control'
import { Calendar, MonthPicker } from 'components'
import { getMonthAbbreviation } from 'utils/date'
import { DATE_QUERY_TYPE, FLEXIBLE_DATE_CONFIG } from 'constants/index'

const DateSelector = ({ holidays, onUpdate, data }) => {
  return (

    <div className={styles.wrapper}>
      <SegmentedControl
        name="oneDisabled"
        options={[
          {
            label: 'Calendar',
            value: DATE_QUERY_TYPE.calendar,
            default: data.type === DATE_QUERY_TYPE.calendar
          },
          {
            label: 'Flexible',
            value: DATE_QUERY_TYPE.flexible,
            default: data.type === DATE_QUERY_TYPE.flexible
          },
          {
            label: 'Recent Queries',
            value: DATE_QUERY_TYPE.recentQueries,
            default: data.type === DATE_QUERY_TYPE.recentQueries
          }
        ]}
        setValue={type => {
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
            payload.months = [new Date().getMonth() + 1]
          }
          onUpdate(payload)
        }}
        style={{ width: '100%', color: '#3cafeb' }}
      />
      {data.type === DATE_QUERY_TYPE.calendar && <Calendar
        onUpdate={onUpdate}
        holidays={holidays}
      />}
      {data.type === DATE_QUERY_TYPE.flexible && (
        <>
          <div className={styles.center}>
            <div className={styles.howLong}>
              How long would you like to travel?
            </div>
            <SegmentedControl
              name="travelLengthSelector"
              options={Object.values(FLEXIBLE_DATE_CONFIG).map((c, i) => ({
                label: c.label,
                value: c.value,
                default: data.duration === c.payload.duration
              }))}
              setValue={newValue => {
                onUpdate({ ...FLEXIBLE_DATE_CONFIG[newValue].payload })
              }}
              style={{ width: '100%', color: '#3cafeb', fontSize: '16px' }}
            />
          </div>
          <div className={styles.center}>
            <div className={styles.howLong}>
              {(data.months && data.months.length > 0) ?
                <span>{'Selected months '}
                  <b>{
                    data.months.slice(0, 3)
                      .map(m => getMonthAbbreviation(m - 1)).join(', ')
                  } {data.months.length > 3 ? '...' : ''}
                </b></span> : 'Select months...'}
            </div>
            <MonthPicker
              selected={data.months}
              onSelect={selected => onUpdate({ months: selected })}
            />
          </div>
        </>
      )}
      {/*TODO: Add it after implementing saved query logic*/}
      {/*{data.type === DATE_QUERY_TYPE.recentQueries && <SavedContainer />}*/}
    </div>
  )
}

export default DateSelector
