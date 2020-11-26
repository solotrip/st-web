import React from 'react'
import PropTypes from 'prop-types'
import styles from './layout.module.scss'

const Layout = ({ children, infoText }) => {
  return (
    <div className={styles.layout}>
      {infoText && <span className={styles.infoText}>{infoText}</span>}
      <div className={styles.card}>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  infoText: PropTypes.string
}

export default Layout
