import React from 'react'
import logo from 'assets/images/logo.svg'
import styles from './loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.logo}>
        <img src={logo} alt='Loading'/>
        <span className={styles.logoShadow}/>
      </div>
    </div>
  )
}


export default Loader
