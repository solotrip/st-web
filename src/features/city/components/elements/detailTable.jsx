import React from 'react'
import styles from './detailTable.module.scss'

import { useTranslation } from 'react-i18next'

const DetailTable = ({ objectKey, value }) => {
  const { t, i18n } = useTranslation(['table'])
  return (
    <div className={styles.wrapper}>
      <div className={styles.sameRow}>
        <div className={styles.name}>{t(`table:${objectKey}`)}: </div>{' '}
        <div className={styles.value}>{t(`table:${value}`)}</div>
      </div>
      <hr className={styles.line} />
    </div>
  )
}

export default DetailTable
