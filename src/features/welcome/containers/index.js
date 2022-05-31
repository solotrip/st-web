/* eslint-disable max-len */
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Welcome.module.scss'
import { isBrowser } from 'react-device-detect'
import { useHistory } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { authSelector } from 'features/auth/slice'

const WelcomeContainer = () => {
  const history = useHistory()

  const { error, isAuthenticated, loading } = useSelector(authSelector)

  function autoRedirect() {
    if (!loading && isAuthenticated && !error) {
      history.push('/browse')
    } else if (isBrowser && !loading) {
      history.push('/login')
    }
  }
  return (
    <div className={styles.container}>
      {autoRedirect()}
      <div className={styles.videoContainer}>
        <video
          autoPlay
          src={'https://res.cloudinary.com/dtp5yitjt/video/upload/v1629817028/combined2_pqra8s.mp4'}
          playsInline
          loop="loop"
          muted
          preload="auto"
          id="myVideo"
          className={styles.videoContainer}
        >
          your browser does not support video tag.
        </video>
      </div>
      <div className={styles.upperContainer}>
        {' '}
        <div className={styles.logo} />
        <div className={styles.lowerContainer}>
          <h1 className={styles.motto}>
            Get personalized travel recommendations, updates, restrictions and much more.
          </h1>
          <Link className={styles.actionButton} to="/signup">
            Signup
          </Link>
          <Link className={styles.actionButton2} to="/browse">
            Continue as Guest{' '}
          </Link>
          <Link className={styles.login2} to="/login">
            <span>Do you have an account?</span> Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WelcomeContainer
