import React from 'react'
import cn from 'classnames'
import styles from './footer.module.scss'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Button } from 'components'

const Footer = ({ onNext, nextEnabled }) => {
  const { index } = useParams()
  const history = useHistory()
  const indexNumber = parseInt(index)

  const handleNext = () => {
    if (onNext) {
      onNext(index)
    }
    if (indexNumber < 5) {
      history.push(`/onboarding/${indexNumber + 1}`)
    } else {
      history.push('/recommendations')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link to={`/onboarding/${indexNumber - 1}`}
              className={cn(
                styles.back, { [styles.hidden]: indexNumber === 1 }
              )}
        >
          Back
        </Link>
        <Button
          className={styles.next}
          onClick={handleNext}
          disabled={!nextEnabled}
          text="Next"
        />
      </div>
    </div>
  )
}

export default Footer
