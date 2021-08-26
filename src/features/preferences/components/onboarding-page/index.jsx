import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './onboarding-page.module.scss'
import Header from './header'
import Footer from './footer'

const OnboardingPage = ({ children, onNext, nextEnabled }) => {

  return (
    <div className={styles.page}>
      <Header/>
      <div className={cn(styles.container, 'card')}>
        <div className={cn(styles.content)}>
          {children}
        </div>
      </div>
      <Footer onNext={onNext} nextEnabled={nextEnabled}/>
    </div>
  )
}

OnboardingPage.propTypes = {
  children: PropTypes.node.isRequired,
  infoText: PropTypes.string
}

export default OnboardingPage
