import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import styles from './Sidebar.module.scss'
import { IconContext } from 'react-icons'
import { Footer } from 'components'

function SideBar() {
  const location = useLocation()
  return (

    <IconContext.Provider value={{ color: '#fff' }}>
      <div className={styles.sidebar}>
          <div className={styles.logo} />

        <nav className={styles.navMenu}>
          {SidebarData.map((item, index) => {
            return (
              <NavLink to={{ pathname: item.path, search: location.search }}
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

        <Footer/>
      </div>
    </IconContext.Provider>

  )
}

export default SideBar
