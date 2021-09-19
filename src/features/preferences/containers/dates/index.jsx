import React, { useState } from 'react'
import styles from './dates.module.scss'
import { Link } from 'react-router-dom'
import NewDate from '../../components/newdate'

import AvailabilityContainer from '../availabilities'

const DatesContainer = () => {
  //availabilities, newDate
  const [activeView, setActiveView] = useState('newDate')
  return (
    <div className={styles.wrapper}>
      {activeView === 'availabilities' ? (
        //availabilities.map((availability) => <Date data={availability} />)
        <AvailabilityContainer />
      ) : (
        <NewDate />
      )}
      {activeView === 'availabilities' && (
        <div className={styles.dateAdder}>
          Didn't find the available dates you were looking for? Add a new one.
          <Link>
            <button
              className={styles.actionButton}
              onClick={() => {
                setActiveView('newDate')
              }}
            >
              Add New Date
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default DatesContainer
