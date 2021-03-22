import React from 'react'
import PropTypes from 'prop-types'
import styles from './header.module.scss'

import { Slider } from 'components'
import data from '../image-slider/slider-data'

const Header = ({}) => {
  return (
    <div className={styles.header}>
      <Slider items={data.map(i => ({
        src: i.image,
        alt: i.alt || 'scenery',
        width: i.width,
        height: i.height,
        blurHash: i.blurhash
      }))}/>
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.node
}

export default Header
