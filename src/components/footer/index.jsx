import React from 'react'

import styles from './footer.module.scss'
import { isBrowser, isIOS, isAndroid } from 'react-device-detect'

//Change it later
const appStoreLink = 'https://apps.apple.com/us/app/slack/id618783545'
const playStoreLink =
  'https://play.google.com/store/apps/details?id=com.Slack&hl=en&gl=US'

const appLink = isIOS ? appStoreLink : isAndroid ? playStoreLink : null

const appDownloader = () => {
  if (appLink !== null) {
    window.open(appLink)
  }
  //else show error : App download is mobile-only.
}

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <button onClick={appDownloader} className={styles.element}>
        Download the App
      </button>
      <button className={styles.element}>Pulfy for Business</button>
      <button className={styles.element}>About Pulfy</button>
      <button className={styles.element}>Privacy & Terms</button>
    </div>
  )
}

export default Footer
