import React from 'react'
import styles from './detailTable.module.scss'
const DetailTable = ({ objectKey, value }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sameRow}>
        <div className={styles.name}>{objectKey}: </div>{' '}
        <div className={styles.value}>{value}</div>
      </div>
      <hr className={styles.line} />
    </div>
  )
}

export default DetailTable
