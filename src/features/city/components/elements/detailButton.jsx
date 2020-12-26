import React from 'react'
import styles from './detailButton.module.scss'
const DetailButton = ({ objectKey, value }) => {
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={() => {
          console.log('https://')
        }}
      >
        Visit Site
      </button>
    </div>
  )
}

export default DetailButton
