import React from 'react'
import styles from './detailSection.module.scss'
import DetailClassifier from './detailClassifier'

const DetailSection = ({
  SectionTitle,
  SectionContent,
  SectionType,
  SectionIndex
}) => {
  var itemCount = SectionContent ? Object.keys(SectionContent).length : 0
  var rows = Math.ceil(itemCount / 4)

  for (var row in rows) {
    return <div className={styles.row}> row is {row}</div>
  }

  if (SectionContent == undefined || null) {
    SectionContent = {
      any: {
        name: '',
        type: 'score',
        value: ''
      }
    }
  }

  const sectionContent = Object.keys(SectionContent).map((key, i) => {
    console.log('HERE; objectKey: ', key, 'value:', SectionContent[key])
    return (
      <DetailClassifier
        className={styles.anycon}
        objectKey={SectionContent[key].name}
        value={SectionContent[key].value}
        type={SectionContent[key].type}
        i={i}
        key={i}
        rowAt={Math.ceil((i + 1) / 4)}
      ></DetailClassifier>
    )
  })

  return (
    <>
      <h2 className={styles.sectionTitle}>
        {SectionTitle === 'Intro' ? '' : SectionTitle}
      </h2>
      <div className={styles.sectionWrapper}>
        <div className={styles.holder}>
          <div className={styles.content}>{sectionContent}</div>
        </div>
      </div>
    </>
  )
}

export default DetailSection
