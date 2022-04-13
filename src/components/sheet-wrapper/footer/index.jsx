import React from 'react'
import styles from './footer.module.scss'
import { Button } from 'components'

const Footer = ({ onClick, disabled, text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Button
          className={styles.next}
          onClick={onClick}
          disabled={disabled}
          text={text}
        />
      </div>
    </div>
  )
}

export default Footer
