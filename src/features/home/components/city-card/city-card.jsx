/* eslint-disable */
//wow
import React from 'react'
import styles from './city-card.module.scss'
import { Link } from 'react-router-dom'

const CityCard = ({ key, id, imgsr }) => {
  return (
    <div className={styles.wrapper}>
      <Link to={{ pathname: `cities/${id}/overview` }}>
        <div className={styles.cardHolder}>
          <div className={styles.hover}>
            <img className={styles.image} src={imgsr} />
            <div className={styles.titleHolder}>
              <div className={styles.title}>Eskisehir</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CityCard
