import React from 'react'
import styles from './detailButton.module.scss'

import { useTranslation } from 'react-i18next'

const DetailButton = ({ objectKey, value }) => {
  const { t, i18n } = useTranslation(['translation'])
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={() => {
          console.log('https://')
        }}
      >
        {t('translation:Visit Site')}
      </button>
    </div>
  )
}

export default DetailButton
