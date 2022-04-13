import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './onboarding-page.module.scss'
import Header from './header'
import Footer from './footer'
import { Capacitor } from '@capacitor/core'

const OnboardingPage = ({ children, onNext, nextEnabled }) => {
  return (
    <>
      <div
        className={cn(Capacitor.getPlatform() === 'ios' ? styles.containerIos : styles.container)}
      >
        <Header />
        <div className={styles.content}>{children}</div>
      </div>
      <Footer onNext={onNext} nextEnabled={nextEnabled} />
    </>
  )
}

OnboardingPage.propTypes = {
  children: PropTypes.node.isRequired,
  infoText: PropTypes.string
}

export default OnboardingPage
