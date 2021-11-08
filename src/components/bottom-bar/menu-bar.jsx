import React from 'react'
import MenuItem from './menu-item'

import {
  Alert28Regular,
  CircleEdit24Regular,
  Heart28Regular,
  Star28Regular
} from '@fluentui/react-icons'

import styles from './menu-bar.module.scss'
import { useLocation } from 'react-router-dom'

function MenuBar() {
  const location = useLocation()

  return (
    <div className={styles.menuBar}>
      <MenuItem
        to={{ pathname: '/recommendations', search: location.search }}
        icon={<Star28Regular/>}
      />

      <MenuItem
        to={{ pathname: '/wishlist', search: location.search }}
        icon={<Heart28Regular/>}
      />
      <MenuItem
        to={{ pathname: '/notifications', search: location.search }}
        icon={<Alert28Regular/>}
      />
      <MenuItem
        to={{
          pathname: '/recommendations/preferences',
          search: location.search
        }}
        icon={<CircleEdit24Regular/>}
      />
    </div>
  )
}

export default MenuBar
