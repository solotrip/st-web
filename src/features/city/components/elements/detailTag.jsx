/* eslint-disable */
import React from 'react'
import styles from './detailTag.module.scss'
import Tooltip from './Tooltip/Tooltip'

import { useTranslation } from 'react-i18next'

const DetailTag = ({ value = '' }) => {
  const { t, i18n } = useTranslation(['tags'])
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.wrapper}>
        <Tooltip
          className={styles.toolTip}
          content='That is a simple activity, you know.. '
          direction='bottom'
        >
          <div className={styles.wrapper2}>
            <div className={styles.activity}>{t(`tags:${value}`)}</div>
          </div>
        </Tooltip>
      </div>
    </div>
  )
}

export default DetailTag
