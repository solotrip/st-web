import React from 'react'
import styles from './detailCell.module.scss'

import { useTranslation } from 'react-i18next'

const DetailCell = ({ objectKey, value, i, rowAt }) => {
  const { t, i18n } = useTranslation(['cell'])
  return (
    <div className={styles.cell}>
      <div className={styles.title}> {t(`cell:${objectKey}`)}</div>{' '}
      <div className={styles.value}>{value}</div>
      <div className={styles.subtitle}>
        <div className={styles.subtitleValue}>+10 </div>
        compared to {i} row {rowAt}
        <div className={styles.comparedTo}>Eskisehir</div>
      </div>
    </div>
  )
}

export default DetailCell
