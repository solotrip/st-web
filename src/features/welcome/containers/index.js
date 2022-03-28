import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Welcome.module.scss'
import { ReactComponent as Logo } from 'assets/images/logo.svg'

const WelcomeContainer = () => {

  return (
    <div className={styles.container}>
      <Logo/>
      <h1>Welcome to Pulfy</h1>
      <Link className="primaryButton" to="/signup">Sign Up</Link>
      <Link className={styles.login} to="/login">
        <span>Do you have an account?</span> Login
      </Link>
      <Link className={styles.continue} to="/onboarding/1">Continue as
        Guest </Link>
    </div>
  )
}

export default WelcomeContainer
