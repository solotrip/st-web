import React from 'react'
import PropTypes from 'prop-types'
import { CityCard } from 'components'
import cn from 'classnames'
import styles from './city-card-list.module.scss'
import image from 'assets/images/forest.jpg'
import image1 from 'assets/images/random1.jpg'
import image2 from 'assets/images/random2.jpg'
import image3 from 'assets/images/random3.jpg'
import image4 from 'assets/images/random4.jpg'

let images = [image1, image, image2, image3, image4]

const CityCardList = ({ data, className }) => {
  return (
    <div className={cn([styles.container, className])}>
      {
        data.map(r => (
          <div className={styles.card}>
            <CityCard
              id={r.sid}
              key={`card-${r.sid}`}
              name={r.name}
              image={images[Math.floor(Math.random() * 4)]}
            /></div>))
      }
    </div>
  )
}

CityCardList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string
}

export default CityCardList
