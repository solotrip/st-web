import React, { useState, useEffect } from 'react'
import styles from './recommendation-list.module.scss'
import _interesection from 'lodash/intersection'
import useThemeState from 'utils/hooks/use-theme-state'
import { useDispatch, useSelector } from 'react-redux'

import { Bookmark28Filled, Bookmark28Regular } from '@fluentui/react-icons'

const RecommendationList = ({
  name,
  dateSring,
  recommendations,
  user,
  size = 1024
}) => {
  const dispatch = useDispatch()

  const [appTheme] = useThemeState()

  return (
    <button className={styles.wrapper}>
      {/*<div className={styles.bookmark}>
       <Bookmark28Regular className={styles.bookmarkIcon } primaryFill={"#3cafeb"}/>
  </div> */}
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
