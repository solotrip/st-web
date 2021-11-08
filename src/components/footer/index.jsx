import React from 'react'

import styles from './footer.module.scss'

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.element}>Help Center</button>
      <button className={styles.element}>Pulfy for Business</button>
      <button className={styles.element}>About Pulfy</button>
      <button className={styles.element}>Privacy & Terms</button>

    </div>
  )
}

export default Footer
