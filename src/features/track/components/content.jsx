import React from 'react'
import styles from './content.module.scss'
import RecommendationList from './recommendation-list'

const Content = ({ saved, user }) => {
  return (
    <div className={styles.mostOuted}>
      <div className={styles.outerWrapperCentered}>
        <div className={styles.wrapperCentered}>
          <div className={styles.rowin}>
            {saved.map(savedElement => {
              return (
                <RecommendationList
                  key={`sav-${savedElement.id}`}
                  name={savedElement.name}
                  dateSring={savedElement.dateString}
                  recommendations={savedElement.recommendations}
                  user={user}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
