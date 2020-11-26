import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useWindowWidth } from '@react-hook/window-size'
import cn from 'classnames'
import styles from './layout.module.scss'

const Layout = ({ children, header, sidebar }) => {
  const [shrink, setShrink] = useState(false)
  const windowWidth = useWindowWidth()
  const shrinkThreshold = windowWidth > 1024 ? -328 : -76
  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y <= shrinkThreshold) {
      setShrink(true)
    } else {
      setShrink(false)
    }
  })

  return (
    <div className={styles.layout}>
      <div className={styles.header}>{header({ shrink })}</div>
      <div className={styles.main}>
        <div
          className={styles.sidebar}>
          {sidebar}</div>
        <div
          className={cn(styles.content, { [styles.shrink]: shrink })}
        >
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
