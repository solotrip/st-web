import React, { useState } from 'react'
import styles from './newdate.module.scss'
import { SegmentedControl } from 'segmented-control'
import CalendarAlt from './calendarAlt'

import SavedContainer from '../../saved/containers/saved'

const NewDate = ({}) => {
  const [activeTab, setActiveTab] = useState('calendar')
  const [travelLength, setTravelLength] = useState('weekend')
  const [season, setSeason] = useState('summer')

  return (
    <div className={styles.wrapper}>
      <SegmentedControl
        name="oneDisabled"
        options={[
          { label: 'Calendar', value: 'calendar', default: true },
          { label: 'Flexible', value: 'flexible' },
          { label: 'Recent Queries', value: 'recent-queries' }
        ]}
        setValue={newValue => {
          setActiveTab(newValue)
        }}
        style={{ width: '100%', color: '#3cafeb' }}
      />
      {activeTab === 'calendar' && <CalendarAlt />}
      {activeTab === 'flexible' && (
        <>
          <div className={styles.center}>
            <div className={styles.howLong}>
              How long would you like to travel?
            </div>
            <SegmentedControl
              name="travelLengthSelector"
              options={[
                { label: 'Weekend', value: 'weekend', default: true },
                { label: 'Week', value: 'week' },
                { label: 'Month', value: 'month' }
              ]}
              setValue={newValue => {
                setTravelLength(newValue)
              }}
              style={{ width: '100%', color: '#3cafeb', fontSize: '16px' }}
            />
          </div>
          <div className={styles.center}>
            <div className={styles.howLong}>
              Which season do you want to go?{' '}
            </div>
            <SegmentedControl
              name="seasonSelector"
              options={[
                { label: 'Winter', value: 'winter' },
                { label: 'Spring', value: 'spring' },
                { label: 'Summer', value: 'summer', default: true },
                { label: 'Fall', value: 'fall' }
              ]}
              setValue={newValue => {
                setSeason(newValue)
              }}
              style={{ width: '100%', color: '#3cafeb', fontSize: '16px' }}
            />
          </div>
        </>
      )}
      {activeTab === 'recent-queries' && <SavedContainer />}
      {<div className={styles.center} />}
    </div>
  )
}

export default NewDate
