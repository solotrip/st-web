import React from 'react'
import styles from './detailTag.module.scss'

import { useTranslation } from 'react-i18next'

const DetailTag = ({ value = '' }) => {
  const { t, i18n } = useTranslation(['tags'])
  return (
    <div className={styles.wrapper}>
      <div className={styles.activity}>{t(`tags:${value}`)}</div>
    </div>
  )
}

export default DetailTag
