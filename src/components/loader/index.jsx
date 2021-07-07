import React from 'react'
import logo from 'assets/pulfy.svg'
import styles from './loader.module.scss'

const Loader = ({ loading = true, children }) => {
  return loading ? (
    <div className={styles.loader}>
      <div className={styles.logo}>
        <img src={logo} alt="Loading"/>
        <span className={styles.logoShadow}/>
      </div>
    </div>
  ) : <>{children}</>
}


export default Loader
