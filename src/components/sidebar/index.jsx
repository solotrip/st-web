import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import styles from './Sidebar.module.scss'
import { IconContext } from 'react-icons'
import { Footer } from 'components'

function SideBar() {
  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className={styles.sidebar}>
        <Link to="/browse">
          {' '}
          <div className={styles.logo} />
        </Link>

        <nav className={styles.navMenu}>
          {SidebarData.map((item, index) => {
            return (
              <NavLink
                to={{ pathname: item.path }}
                className={styles.item}
                activeClassName={styles.active}
                key={`sidebar-${item.title}`}
              >
                {item.icon}
                <span className={styles.title}>{item.title}</span>
              </NavLink>
            )
          })}
        </nav>

        <Footer />
      </div>
    </IconContext.Provider>
  )
}

export default SideBar
