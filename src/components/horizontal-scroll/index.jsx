import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import cn from 'classnames'
import styles from './horizontal-scroll.module.scss'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const PrevArrow = ({ className, style, onClick }) => {
  return (
    <button
      className={cn(className, styles.arrow)}
      style={style}
      onClick={onClick}
    >
      <FaChevronLeft/>
    </button>)
}


const NextArrow = ({ className, style, onClick }) => {
  return (
    <button
      className={cn(className, styles.arrow)}
      style={style}
      onClick={onClick}
    >
      <FaChevronRight/>
    </button>)
}

const HorizontalScroll = ({
  items,
  settings,
  className
}) => {
  const defaultOptions = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 300,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  }
  return (
    <div className={cn(styles.horizontalScroll, { [className]: !!className })}>
      <Slider {...defaultOptions} {...settings}>
        {items}
      </Slider>
    </div>

  )
}

HorizontalScroll.defaultProps = {
  settings: {}
}

HorizontalScroll.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node),
  settings: PropTypes.object,
  className: PropTypes.string
}


export default HorizontalScroll
