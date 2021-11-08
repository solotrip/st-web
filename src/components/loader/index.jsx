import React from 'react'
import { ReactComponent as Logo } from 'assets/images/logo.svg'
import styles from './loader.module.scss'

const Loader = ({ loading = true, children }) => {
  return loading ? (
    <div className={styles.loader}>
      <div className={styles.logo}>
        <Logo/>
        <span className={styles.logoShadow}/>
      </div>
    </div>
  ) : (
    <>{children}</>
  )
}

export default Loader
