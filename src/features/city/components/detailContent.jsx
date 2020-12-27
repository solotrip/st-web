import React from 'react'
import styles from './detailContent.module.scss'
import DetailSection from './detailSection'
import ThemeMode from '../ThemeChanger'

var titles = []

const DetailContent = ({ detailsparam }) => {
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
            SectionTitle={item.SectionTitle}
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
      <ThemeMode page='city' />
    </>
  )
}

export default DetailContent
