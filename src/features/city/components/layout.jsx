import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useWindowWidth } from '@react-hook/window-size'
import cn from 'classnames'
import styles from './layout.module.scss'
import DetailContent from './detailContent'
import Sidebar from './sidebar'

//for testing purpose
import DetailMedia from './elements/detailMedia'
import DetailFlight from './elements/detailFlight'
import DetailChart from './elements/detailChart'
import DetailTable from './elements/detailTable'
import DetailTag from './elements/detailTag'

import detailFetcher from './detailFetcher'

var titles = []

var fetched = detailFetcher()
console.log('detail fetcher works!', fetched)

var sections = fetched

for (var section in sections) {
  titles.push(sections[section].SectionTitle)
}

const Layout = ({ children, header, sidebar, content }) => {
  const [shrink, setShrink] = useState(true)

  const windowWidth = useWindowWidth()
  const shrinkThreshold = windowWidth > 1024 ? -408 : -76
  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y <= shrinkThreshold) {
      setShrink(true)
    } else {
      setShrink(true)
    }
  })

  return (
    <div className={styles.layout}>
      <div className={styles.tabBar}></div>
      <div className={styles.header}>{header({ shrink })}</div>
      <div className={styles.main}>
        <Sidebar className={styles.sidebar} items={titles}></Sidebar>

        {<DetailContent detailsparam={fetched} />}
        <div>{content}</div>
      </div>
    </div>
  )
}

export default Layout
