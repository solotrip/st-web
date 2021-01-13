/* eslint-disable */
import React, { useState } from 'react'
import { SliderData } from './slider-data'
import { RiArrowDropRightLine, RiArrowDropLeftLine } from 'react-icons/ri'

import styles from './image-slider.module.scss'

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0)
  const length = slides.length

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null
  }

  return (
    <section className={styles.slider}>
      <div className={styles.cityNameHolder}>
        <div className={styles.cityName}>Eskisehir</div>
      </div>

      <RiArrowDropLeftLine className={styles.leftArrow} onClick={prevSlide} />
      <RiArrowDropRightLine className={styles.rightArrow} onClick={nextSlide} />
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? styles.slideActive : styles.slide}
            key={index}
          >
            {index === current && (
              <img
                src={slide.image}
                alt='travel image'
                className={styles.image}
              />
            )}
          </div>
        )
      })}
    </section>
  )
}

export default ImageSlider
