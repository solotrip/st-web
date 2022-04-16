import React from 'react'

import styles from './footer.module.scss'
import { isIOS, isAndroid } from 'react-device-detect'

//Change it later
const appStoreLink = 'https://apps.apple.com/us/app/slack/id618783545'
const playStoreLink = 'https://play.google.com/store/apps/details?id=com.Slack&hl=en&gl=US'

const appLink = isIOS ? appStoreLink : isAndroid ? playStoreLink : null

const appDownloader = () => {
  if (appLink !== null) {
    window.open(appLink)
  }
  //else show error : App download is mobile-only.
}

const Footer = ({ isStatic = false }) => {
  return (
    <div className={isStatic === true ? styles.staticWrapper : styles.wrapper}>
      <button onClick={appDownloader} className={styles.element}>
        Download the App
      </button>
      <a href="https://www.pulfy.com/pulfy-for-business/" className={styles.element}>
        Pulfy for Business
      </a>
      <button className={styles.element}>About Pulfy</button>
      <a href=" https://www.pulfy.com/privacy-and-terms" className={styles.element}>
        Privacy & Terms
      </a>
    </div>
  )
}

export default Footer
