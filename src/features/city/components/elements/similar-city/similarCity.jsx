/* eslint-disable */
import React from 'react'
import styles from './similarCity.module.scss'
import CityCard from '../../../../home/components/city-card/city-card'

const imgTemp =
  'https://images.unsplash.com/photo-1536257104079-aa99c6460a5a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1420&q=80'

const SimilarCity = ({ value }) => {
  return (
    <div className={styles.wrapper}>
      <CityCard imgsr={imgTemp} id={value} />
    </div>
  )
}

export default SimilarCity
