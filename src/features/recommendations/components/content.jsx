import React from 'react'
import styles from './content.module.scss'
import Recommendation from './recommendation'

const Content = ({
  recommendations, user
}) => {
  return (
    <div className={styles.outerWrapperCentered}>
      <div className={styles.wrapperCentered}>
        {recommendations.map(recommendation => {
          return (
            <Recommendation
              key={`rec-${recommendation.sid}`}
              recommendation={recommendation}
              user={user}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Content
