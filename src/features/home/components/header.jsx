import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import cn from 'classnames'
import styles from './header.module.scss'

const Header = ({ children, shrink }) => {
  return (
    <div className={cn(styles.wrapper, { [styles.shrink]: shrink })}>
      <div className={styles.header}>
        <Link className={styles.logo} to="/" tabIndex={-1}/>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}


Header.propTypes = {
  children: PropTypes.node
}

export default Header
