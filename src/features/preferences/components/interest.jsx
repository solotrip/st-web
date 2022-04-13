import React from 'react'
import styles from './interest.module.scss'
import cn from 'classnames'

const Interest = ({ name, onSelect, selected }) => {
  return (
    <div className={styles.listItem}>
      <div className={styles.itemName}>{name}</div>
      <button
        className={cn({
          [styles.addButton]: !selected,
          [styles.removeButton]: selected
        })}
        onClick={() => onSelect(!selected)}
      >
        {!selected ? 'Add' : 'Added'}
      </button>
    </div>
  )
}

export default Interest
