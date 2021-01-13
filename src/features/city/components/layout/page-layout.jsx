import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useWindowWidth } from '@react-hook/window-size'
import cn from 'classnames'
import styles from './layout.module.scss'
import DetailContent from '../content/detailContent'
import Sidebar from '../sidebar/sidebar'
import { Link } from 'react-router-dom'

//for testing purpose
import DetailMedia from '../elements/media/detailMedia'
import DetailFlight from '../elements/flight/detailFlight'
import DetailChart from '../elements/chart/detailChart'
import DetailTable from '../elements/table/detailTable'
import DetailTag from '../elements/tag/detailTag'

import detailFetcher from '../detailFetcher'

import '../../../../theme/styles.scss'
import ThemeMode from '../../../../theme/ThemeChanger'
import { useTranslation } from 'react-i18next'

var titles = []
var code = true

var fetched = detailFetcher()
console.log('detail fetcher works!', fetched)

var sections = fetched

for (var section in sections) {
  titles.push(sections[section].SectionTitle)
}

const Layout = ({
  children,
  header,
  sidebar,
  content,
  fetchedContent,
  page,
  city
}) => {
  const { t, i18n } = useTranslation(['translation'])
  const [shrink, setShrink] = useState(false)
  const [faded, setFaded] = useState(styles.tabBar)

  //let slugPage = (page && page.toLowerCase().replace(/\s/g, '-')) || ''

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
  const shrinkThreshold = -450
  const offset = window.scrollY
  //const shrinkThreshold = windowWidth > 1024 ? -668 : -270
  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y <= shrinkThreshold) {
      //that was faded.
      setFaded(styles.tabBarFaded)
      setShrink(false)

      //} else if (currPos.y <= shrinkThreshold && currPos.y < prevPos.y) {
      //  setShrink(false)
    } else {
      setFaded(styles.tabBar)
      setShrink(false)
    }
  })

  return (
    <div className={styles.layout}>
      <div className={faded}>
        <div className={styles.flexBox}>
          <Link className={styles.tabBarLogo} to='/' />
          <Link className={styles.tabBarText} to='/' />
        </div>
      </div>
      <div className={styles.switches}>
        <div className={styles.header}>
          <div className={styles.headerHolder}>{header({ shrink })}</div>
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
        </div>
      </div>
      <div className='main'>
        <Sidebar
          className={styles.sidebar}
          items={titles}
          page={page}
          city={city}
        ></Sidebar>

        {<DetailContent detailsparam={fetchedContent} />}

        <div>{content}</div>
      </div>
    </div>
  )
}

export default Layout
