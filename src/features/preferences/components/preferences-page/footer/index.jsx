import React from 'react'
import styles from './footer.module.scss'
import { useParams } from 'react-router-dom'
import { Button } from 'components'

const Footer = ({ onNext, nextEnabled }) => {
  const { index } = useParams()

  const handleNext = () => {
    if (onNext) {
      onNext(index)
    }
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
