import React from 'react'
import styles from './footer.module.scss'
import { useParams } from 'react-router-dom'
import { Button } from 'components'
import { useDispatch, useSelector } from 'react-redux'

import { updateProfile, profileSelector } from '../../../../profile/slice'
const Footer = ({ onNext, nextEnabled }) => {
  const { index } = useParams()
  const { data } = useSelector(profileSelector)
  const dispatch = useDispatch()

  let dataToBeUpdated = {
    currency: data.currency || 'USD',
    distance: data.distance || 'km',
    temperature: data.temperature || '°C',
    vaccinated: data.vaccinated || false
  }

  const handleNext = () => {
    if (onNext) {
      console.log('inside')
      onNext(index)
    }
    console.log('outside and data is:', data)
    dispatch(updateProfile(dataToBeUpdated))
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Button
          className={styles.next}
          onClick={handleNext}
          disabled={!nextEnabled}
          text="Save"
        />
      </div>
    </div>
  )
}

export default Footer
