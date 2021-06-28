import React from 'react'
import _get from 'lodash/get'
import styles from './interestlist.module.scss'
import Interest from './interest'

const InterestList = ({ interests = [], onSelect, interestsSelected }) => {
  return (
    <div className={styles.wrapper}>
      {interests.map(interest => (
        <Interest
          key={interest.id}
          id={interest.id}
          name={interest.name}
          onSelect={value => onSelect(interest.id, value, interest.selected)}
          selected={_get(interestsSelected, interest.id, interest.selected)}
        />
      ))}
    </div>
  )
}

export default InterestList
