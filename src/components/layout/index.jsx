import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './layout.module.scss'

const Layout = ({ children, header, sidebar }) => {

  return (
    <div className={styles.layout}>
      {header && <div className={styles.header}>
        {header}
      </div>}
      <div className={cn(styles.main, { noHeader: !header })}>
        <div className={styles.sidebar}>{sidebar}</div>
        <div className={cn(styles.content)}>
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
