import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './horizontal-list.module.scss'
import {
  IosArrowLtr24Regular,
  IosArrowRtl24Regular
} from '@fluentui/react-icons'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react/swiper-react'

const ControlButton = ({ children, isNext }) => {
  const swiper = useSwiper()
  const onClick = () => {
    isNext ? swiper.slideNext(1000) : swiper.slidePrev(1000)
  }
  return <button onClick={onClick}>
    {children}
  </button>
}

const HorizontalList = ({
  items,
  title,
  className,
  itemClassName,
  slidesPerView = 'auto',
  ...rest
}) => {

  const hideControls = (slidesPerView !== 'auto'
    && items.length <= slidesPerView) || items.length <= 1
  return (
    <Swiper
      spaceBetween={16}
      className={cn(styles.container, { [className]: !!className })}
      slidesPerView={slidesPerView}
      rewind
      {...rest}
    >

      <div className={styles.header} slot="container-start">
        <h2 className={styles.title}>{title}</h2>
        <div
          className={cn(styles.arrows, { [styles.hidden]: hideControls })}
        >
          <ControlButton>
            <IosArrowLtr24Regular className={styles.arrow}/>
          </ControlButton>
          <ControlButton isNext>
            <IosArrowRtl24Regular className={styles.arrow}/>
          </ControlButton>
        </div>
      </div>


      {items.map(item => (
        <SwiperSlide
          className={itemClassName}
          key={`swiper-${title}-${item.props.name}`}
        >
          {item}
        </SwiperSlide>))}
    </Swiper>

  )
}

HorizontalList.defaultProps = {}

HorizontalList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  className: PropTypes.string,
  itemClassName: PropTypes.string
}


export default HorizontalList
