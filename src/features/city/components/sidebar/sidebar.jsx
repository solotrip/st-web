import React from 'react'
import styles from './sidebar.module.scss'
import { NavLink } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

const Sidebar = ({ items, city }) => {
  const { t } = useTranslation(['translation'])

  const toc = items.map(item => (
      <NavLink
        key={`sb-link-${item}`}
        className={styles.item}
        to={`/cities/${city}/${item}`}
        activeClassName={styles.selected}>
        {t(`translation:${item}`)}
      </NavLink>
    )
  )
  return (
    <div className='card no-padding'>
      <div className={styles.toc}>
        {toc}
      </div>
    </div>
  )
}

export default Sidebar
