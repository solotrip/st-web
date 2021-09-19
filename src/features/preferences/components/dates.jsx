import React from 'react'
import styles from './dates.module.scss'
import Date from './date'

const Dates = ({ handler, dateList = [] }) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.signup} onClick={handler}>
        <span role="img" aria-label="Add New" />
        Add New
      </button>
      {dateList.map((data, index) => {
        if (data) {
          return <Date data={data} handler={handler} />
        }
        return null
      })}
    </div>
  )
}

export default Dates
