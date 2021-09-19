import React from 'react'
import styles from './bottom-bar.module.scss'
import MenuBar from './MenuBar'
import { useSelector } from 'react-redux'

export default function BottomBar() {
  const activeTab = useSelector(state => state.navigation.activeTab)
  return (
    <div className={styles.holder}>
      <MenuBar active={activeTab} />
    </div>
  )
}
