import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './preferences-page.module.scss'
import Footer from './footer'
import Header from './header'
import { SheetWrapper } from 'components'

const PreferencesPage = ({ children, onNext, nextEnabled, isGuest }) => {

  return (
    <SheetWrapper>
      <div className={cn(styles.container)}>
        <Header isGuest={isGuest}/>
        <div className={styles.content}>
          {children}
        </div>
      </div>
      <Footer onNext={onNext} nextEnabled={nextEnabled}/>
    </SheetWrapper>
  )
}

PreferencesPage.propTypes = {
  children: PropTypes.node.isRequired,
  infoText: PropTypes.string
}

export default PreferencesPage
