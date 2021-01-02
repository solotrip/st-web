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

import '../../../theme/styles.scss'
import ThemeMode from '../../../theme/ThemeChanger'
import { useTranslation } from 'react-i18next'

var titles = []
var code = true

var fetched = detailFetcher()
console.log('detail fetcher works!', fetched)

var sections = fetched

for (var section in sections) {
  titles.push(sections[section].SectionTitle)
}

const Layout = ({ children, header, sidebar, content }) => {
  const { t, i18n } = useTranslation(['translation'])
  const [shrink, setShrink] = useState(false)

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

  const windowWidth = useWindowWidth()
  const shrinkThreshold = windowWidth > 1024 ? -58 : -76
  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y <= shrinkThreshold) {
      setShrink(false)
    } else {
      setShrink(false)
    }
  })

  return (
    <div className={styles.layout}>
      <div className={styles.tabBar}>
        <div className={styles.flexBox}>
          <div className={styles.tabBarLogo}></div>
          <div className={styles.tabBarText}></div>
        </div>
      </div>
      <div className={styles.switches}>
        <div className={styles.header}>
          <div className={styles.themeHolder}>
            <ThemeMode page='city' />
            <button
              className={styles.switchRight}
              onClick={() => changeLanguage()}
              type='button'
            >
              {t('translation:Change Language')}
            </button>
          </div>
          <div className={styles.headerHolder}>{header({ shrink })}</div>
        </div>
      </div>
      <div className='main'>
        <Sidebar className={styles.sidebar} items={titles}></Sidebar>

        {<DetailContent detailsparam={fetched} />}
        <div>{content}</div>
      </div>
    </div>
  )
}

export default Layout
