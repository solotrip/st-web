import React from 'react'
import styles from './detailSection.module.scss'
import DetailClassifier from '../classifier/detailClassifier'

//i18n
import { useTranslation } from 'react-i18next'

const DetailSection = ({
  title,
  content
}) => {
  const { t } = useTranslation(['translation'])

  const sectionContent = Object.keys(content).map((key, i) => {
    return (
      <DetailClassifier
        name={content[key].name}
        value={content[key].value}
        type={content[key].type}
        i={i}
        key={i}
        rowAt={Math.ceil((i + 1) / 4)}
      />
    )
  })

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>
        {title === 'Intro' || title === 'Keşif'
          ? ''
          : t(`translation:${title}`)}
      </h2>
      <div className={styles.content}>{sectionContent}</div>
    </div>
  )
}

export default DetailSection
