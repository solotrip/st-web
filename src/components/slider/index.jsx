import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'react-responsive-carousel'
import { Image } from 'components'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import styles from './slider.module.scss'


const Slider = ({ items }) => {

  const slides = items.map((i, index) => (
    <div key={`slide-${index}`}>{
      React.isValidElement(i) ? i :
        (<Image className={styles.image} {...i} alt={i.alt}/>)}
    </div>
  ))
  return (
    <Carousel className={styles.carousel} showStatus={false} infiniteLoop>
      {slides}
    </Carousel>
  )
}

Slider.defaultProps = {
  settings: {}
}

Slider.propTypes = {
  /**
   * Slide contents
   * You can provide either react components or an object with image data
   */
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.object
    ])
  ).isRequired,
  /**
   * Swiper params. See https://swiperjs.com/api/#parameters
   */
  settings: PropTypes.object
}

export default Slider
