import React from 'react'
import styles from './detailTag.module.scss'
const DetailTag = ({ value = '' }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.activity}>{value}</div>
    </div>
  )
}

export default DetailTag
