/* eslint-disable */
import React from 'react'
import styles from './detailCell.module.scss'
import Tooltip from '../tooltip/Tooltip'

import { useTranslation } from 'react-i18next'

const DetailCell = ({ objectKey, value, i, rowAt }) => {
  const { t, i18n } = useTranslation(['cell'])
  return (
    <div className={styles.cellOuter}>
      <Tooltip
        className={styles.toolTip}
        content='Score is calculated based on the fact that the globe is spherical. '
        direction='bottom'
      >
        <div className={styles.cell}>
          <div className={styles.title}>{t(`cell:${objectKey}`)}</div>{' '}
          <div className={styles.value}>{value}</div>
          <div className={styles.subtitle}>
            <div className={styles.subtitleValue}>+10 </div>
            compared to {i} row {rowAt}
            <div className={styles.comparedTo}>Eskisehir</div>
          </div>
        </div>
      </Tooltip>
    </div>
  )
}

export default DetailCell
