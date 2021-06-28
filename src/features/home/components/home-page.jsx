import React from 'react'
import cn from 'classnames'
import styles from './home-page.module.scss'
import { ReactComponent as PulfyIcon } from '../../../assets/pold.svg'
import { Link } from 'react-router-dom'
import Combined from 'assets/combined.mp4'

const HomePage = ({}) => {

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.videoHolder}>
          <div className={styles.headerHolder}>
            <video
              autoPlay
              src={Combined}
              playsInline
              loop="loop"
              muted
              preload="auto"
              id="myVideo"
              className={styles.videoHolder}
            >
              your browser does not support video tag.
            </video>
            <div className={styles.logo}>
              <Link to="/">
                <PulfyIcon className={styles.pulfyIcon}/>
              </Link>
              <button className={styles.pulfy}>Pulfy</button>
            </div>
          </div>
          <div className={styles.headerMotto}>
            {/* Track concerts, events, activities, destinations, accommodations
                and flights.*/}{' '}
            <div> Track everything you want to do.</div>
            <div>Get personalized recommendations.</div>
            {/*  All combined. */}
            <div className={styles.headerSubtitle}>
              {/*  Set your preferences to get recommendations. */}
              <div className={styles.headerSubtitleElement}>
                Concerts, events, activities, destinations,
                accommodations and flights. All trackable.
              </div>

              <div className={styles.headerSubtitleElement}>
                Start tracking by setting your preferences.
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
            <Link
              className={cn(styles.startButton, 'glow-on-hover')}
              to="/onboarding/1"
            >
              Get Started
            </Link>
          </div>
          <Link
            className={styles.loginButton}
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>

    </div>
  )
}

HomePage.propTypes = {}

export default HomePage
