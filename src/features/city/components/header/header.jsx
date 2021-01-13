import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import cn from 'classnames'
import styles from './header.module.scss'

import ImageSlider from '../image-slider/image-slider'
import { SliderData } from '../image-slider/slider-data'

import DetailMedia from '../elements/media/detailMedia'

const Header = ({ children, shrink }) => {
  return (
    <div className={styles.tabBar}>
      <div className={cn(styles.wrapper, { [styles.shrink]: shrink })}>
        <div className={styles.header}>
          {shrink ? (
            <>
              <div className={styles.flexBox}>
                <Link className={styles.tabBarLogo} to='/' tabIndex={-1} />
                <Link className={styles.tabBarText} to='/' tabIndex={-1} />
              </div>
            </>
          ) : (
            <>
              <Link className={styles.noLogo} to='/' tabIndex={-1} />
            </>
          )}
          <ImageSlider slides={SliderData} />

          {/*<DetailMedia showTitle={false} showCarousels={!shrink} />*/}
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
