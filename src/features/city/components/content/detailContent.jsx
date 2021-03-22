import React from 'react'
import styles from './detailContent.module.scss'
import DetailSection from '../section/detailSection'
import { useTranslation } from 'react-i18next'


const DetailContent = ({ details }) => {
  const { t } = useTranslation(['translation'])
  const sections = details.map((item, index) => {
    return (
      <div id={item.title} key={`dc-${index}`}>
        <DetailSection
          title={t(`translation:${item.title}`)}
          content={item.content}
        />
      </div>
    )
  })

  return (
    <div className={styles.wrapper}>{sections}</div>
  )
}

export default DetailContent
