import React, { useState } from 'react'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import cn from 'classnames'
import styles from './layout.module.scss'
import DetailContent from '../content/detailContent'
import Sidebar from '../sidebar/sidebar'
import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

const Layout = ({
  header,
  content,
  fetchedContent,
  page,
  city
}) => {
  const { t } = useTranslation(['translation'])
  const [shrink, setShrink] = useState(false)
  const [faded, setFaded] = useState(false)

  const shrinkThreshold = -450
  //const shrinkThreshold = windowWidth > 1024 ? -668 : -270
  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y <= shrinkThreshold) {
      //that was faded.
      setFaded(true)
      setShrink(false)
    } else {
      setFaded(false)
      setShrink(false)
    }
  })

  return (
    <div className={styles.layout}>
      <div className={cn({
        [styles.tabBarFaded]: faded,
        [styles.tabBar]: !faded
      })}>
      </div>
      <div className={styles.switches}>
        <div className={styles.header}>
          <div className={styles.headerHolder}>{header({ shrink })}</div>
        </div>
      </div>
      <div className='main'>
        <Sidebar
          className={styles.sidebar}
          items={['overview', 'budget']}
          page={page}
          city={city}
        />

        {}

        <div>{content}</div>
      </div>
    </div>
  )
}

export default Layout
