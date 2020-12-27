import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useWindowWidth } from '@react-hook/window-size'
import cn from 'classnames'
import styles from './layout.module.scss'
import ThemeMode from '../../../theme/ThemeChanger'

const Layout = ({ children, header, sidebar }) => {
  const [shrink, setShrink] = useState(false)
  const windowWidth = useWindowWidth()
  const shrinkThreshold = windowWidth > 1024 ? -408 : -76
  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y <= shrinkThreshold) {
      setShrink(true)
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
      <div className={styles.header}>{header({ shrink })}</div>
      <div className={styles.main}>
        <div className={styles.sidebar}>{sidebar}</div>
        <div className={cn(styles.content, { [styles.shrink]: shrink })}>
          <ThemeMode page='home' />
          {children}
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  infoText: PropTypes.string
}

export default Layout
