import React from 'react'
import styles from './detailHighlight.module.scss'

const DetailHighlight = ({ value }) => {
  return (
    <div className={styles.wrapper}>
      <ul>
        <div className={styles.highlight}>⚈ {value}</div>
      </ul>
    </div>
  )
}

export default DetailHighlight
