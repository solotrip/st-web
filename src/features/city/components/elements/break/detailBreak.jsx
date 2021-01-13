import React from 'react'
import styles from './detailBreak.module.scss'

import { useTranslation } from 'react-i18next'

const DetailBreak = ({ objectKey, value }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <br />
        <br />
      </div>
    </>
  )
}

export default DetailBreak
