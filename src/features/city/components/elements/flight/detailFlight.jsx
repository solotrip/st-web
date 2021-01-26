import React from 'react'
import styles from './detailFlight.module.scss'
import flightLogo from '../../../../../assets/images/flight.png'

const DetailFlight = () => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.flightImage} src={flightLogo} alt='flight'/>
    </div>
  )
}

export default DetailFlight
