import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import cn from 'classnames'
import styles from './header.module.scss'

const Header = ({ children, shrink, wrapperMode = 'true' }) => {
  return (
    <div className={styles.tabBar}>
      <div
        className={
          wrapperMode
            ? cn(styles.wrapper, { [styles.shrink]: shrink })
            : cn(styles.nowrapper, { [styles.shrink]: shrink })
        }
      >
        <div className={styles.header}>
          {shrink ? (
            <div className={styles.flexBox}>
              <Link className={styles.tabBarLogo} to='/' tabIndex={-1} />
              <Link className={styles.tabBarText} to='/' tabIndex={-1} />
            </div>
          ) : (
            <Link className={styles.noLogo} tabIndex={-1} />
          )}

          <div className={styles.content}>{children}</div>
          {shrink && (
            <div className={styles.signupLogin}>
              <Link to='/login'>
                <button className={styles.signup}>
                  <span role='img' aria-labelledby='panda1'>
                    🔑
                  </span>
                </button>
              </Link>
              <Link className={styles.loginHolder} to='/signup'>
                <button className={styles.login}>➥</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.node
}

export default Header
