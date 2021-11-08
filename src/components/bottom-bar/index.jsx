import React from 'react'
import styles from './bottom-bar.module.scss'
import MenuBar from './menu-bar'

export default function BottomBar() {
  return (
    <div className={styles.holder}>
      <MenuBar />
    </div>
  )
}
