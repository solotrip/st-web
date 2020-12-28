import React from 'react'
import styles from './detailContent.module.scss'
import DetailSection from './detailSection'
import ThemeMode from '../../../theme/ThemeChanger'

import { useTranslation } from 'react-i18next'

var titles = []
var code = true

const DetailContent = ({ detailsparam }) => {
  const { t, i18n } = useTranslation(['translation'])

  const changeLanguage = () => {
    if (code) {
      i18n.changeLanguage('tr')
      console.log('changed to tr')
      code = false
    } else {
      i18n.changeLanguage('en')
      console.log('changed to en')
      code = true
    }
  }

  const details = detailsparam.map((item, i) => {
    if (titles.includes(item.SectionTitle)) {
    } else {
      titles.push(item.SectionTitle)
    }

    console.log('Titles are ', titles)
    return (
      <>
        <div id={item.SectionTitle}>
          <DetailSection
            SectionTitle={t(`translation:${item.SectionTitle}`)}
            SectionContent={item.SectionContent}
            SectionType={item.SectionType}
            key={i}
            SectionIndex={i}
          />
          <div>
            {/*items: {Object.keys(item.SectionContent).length}, rows:{' '}
            {Math.ceil(Object.keys(item.SectionContent).length / 4)} section no:
            {i} */}
          </div>
        </div>
      </>
    )
  })

  return (
    <>
      <div className={styles.wrapper}>{details}</div>
      <div className={styles.switches}>
        <ThemeMode page='city' />
        <button
          className={styles.switchRight}
          type='button'
          onClick={() => changeLanguage()}
        >
          {t('translation:Change Language')}
        </button>
      </div>
    </>
  )
}

export default DetailContent
