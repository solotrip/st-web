import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './header.module.scss'

const Header = ({ children }) => {
  return (
    <div className={cn(styles.wrapper)}>
      <div className={styles.header}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.node
}

export default Header
