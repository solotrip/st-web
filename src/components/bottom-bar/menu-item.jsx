import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './menu-item.module.scss'

function MenuItem({ to, icon }) {
  return (
    <NavLink to={to} className={styles.menuItem} activeClassName={styles.active}>
      {icon}
    </NavLink>
  )
}

export default MenuItem
