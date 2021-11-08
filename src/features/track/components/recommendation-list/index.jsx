import React from 'react'
import styles from './recommendation-list.module.scss'

const RecommendationList = ({
  name,
  dateSring,
  recommendations
}) => {

  return (
    <button className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.dateHolder}>{dateSring}</div>
        <div className={styles.title}>{name}</div>
        <div className={styles.subtitle}>
          <div className={styles.recommendationsRow}>
            {recommendations.map(recommendation => {
              return (
                <>
                  <span role="img" aria-label="flag">
                    {recommendation.country['emoji_flag']}
                  </span>
                  {recommendation.name}
                </>
              )
            })}
          </div>
        </div>
        <div className={styles.timeStamp}>saved on March 3, 2021</div>
      </div>
    </button>
  )
}

export default RecommendationList
