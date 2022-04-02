/* eslint-disable max-len */
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Welcome.module.scss'
import { ReactComponent as Logo } from 'assets/images/logowithtext2.svg'

const WelcomeContainer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <video
          autoPlay
          src={
            'https://res.cloudinary.com/dtp5yitjt/video/upload/v1629817028/combined2_pqra8s.mp4'
          }
          playsInline
          loop='loop'
          muted
          preload='auto'
          id='myVideo'
          className={styles.videoContainer}
        >
          your browser does not support video tag.
        </video>
      </div>
      <div className={styles.upperContainer}>
        {' '}
        <Logo className={styles.logo} />
        <div className={styles.lowerContainer}>
          <h1 className={styles.motto}>
            Get personalized travel recommendations, updates, restrictions and
            much more.
          </h1>
          <Link className={styles.actionButton} to='/signup'>
            Signup
          </Link>
          <Link className={styles.actionButton2} to='/onboarding/1'>
            Continue as Guest{' '}
          </Link>
          <Link className={styles.login2} to='/login'>
            <span>Do you have an account?</span> Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WelcomeContainer
