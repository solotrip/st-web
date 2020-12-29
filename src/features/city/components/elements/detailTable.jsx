/* eslint-disable */
import React from 'react'
import styles from './detailTable.module.scss'
import Tooltip from './Tooltip/Tooltip'

import { useTranslation } from 'react-i18next'

const DetailTable = ({ objectKey, value }) => {
  const { t, i18n } = useTranslation(['table'])
  return (
    <div className={styles.wrapper}>
      <Tooltip
        className={styles.toolTip}
        content='More table info '
        direction='bottom'
      >
        <div className={styles.sameRow}>
          <div className={styles.name}>{t(`table:${objectKey}`)}: </div>{' '}
          <div className={styles.value}>{t(`table:${value}`)}</div>
        </div>
      </Tooltip>
      <hr className={styles.line} />
    </div>
  )
}

export default DetailTable
