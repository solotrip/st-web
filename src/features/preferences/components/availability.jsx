import React, { useState } from 'react'
import styles from './availability.module.scss'
import cn from 'classnames'

const Availability = ({ name, selected }) => {
  const [isSelected, setIsSelected] = useState(selected)
  return (
    <button
      className={isSelected ? styles.listItemSelected : styles.listItem}
      onClick={() => setIsSelected(!isSelected)}
    >
      <div className={styles.itemName}>{name}</div>
      <button
        className={cn({
          [styles.addButton]: !isSelected,
          [styles.removeButton]: isSelected
        })}
        onClick={() => setIsSelected(!isSelected)}
      >
        {!isSelected ? 'Select' : 'Selected'}
      </button>
    </button>
  )
}

export default Availability
