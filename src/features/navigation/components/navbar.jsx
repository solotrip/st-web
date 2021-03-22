import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import styles from './navbar.module.scss'
import { MenuButton } from 'components'
import ThemeSwitch from './theme-switch'

const Navbar = ({ isLoggedIn, loading, children }) => {

  const menuItems = [<ThemeSwitch key='nav-theme-switch'/>]
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <Link to='/' className={styles.logo}>
          <div className={styles.icon}/>
          <div className={styles.text}/>
        </Link>
        {children && <div className={styles.content}>{children}</div>}
        <div className={styles.actions}>
          {!isLoggedIn && !loading &&
          <div className={styles.signupLogin}>
            <Link className={styles.login} to='/login'>
              <span role='img' aria-label='login'>🔑</span>
              Login
            </Link>
            <Link className={cn(styles.signup, 'glow-on-hover')} to='/signup'>
              <span role='img' aria-label='sign up'>➥</span>
              Sign Up
            </Link>
          </div>
          }
          {
            isLoggedIn && !loading &&
            <div className={styles.profile}>
              Profile
            </div>
          }
          <MenuButton items={menuItems}/>
        </div>
      </div>
    </div>
  )
}

Navbar.defaultProps = {}

export default Navbar
