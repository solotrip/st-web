import React from 'react'
import cn from 'classnames'
import styles from './header.module.scss'
import { Link, useParams } from 'react-router-dom'

const Header = ({ isGuest }) => {
  const links = [
    {
      name: 'Dates',
      link: '/recommendations/query/1'
    },
    {
      name: 'Filters',
      link: '/recommendations/query/2'
    },
    {
      name: 'Register',
      link: '/recommendations/signup',
      className: styles.signup,
      hidden: !isGuest
    }
  ]

  const { index } = useParams()
  const indexNumber = parseInt(index)

  const items = links.filter(l => !l.hidden).map((item, i) => (
    <div
      key={`r-h-${item.name}`}
      className={cn(styles.item, {
        [styles.active]: i === indexNumber - 1,
        [item.className]: item.className
      })}
    >
      <Link to={item.link} className={styles.name}>
        {item.name}
      </Link>
    </div>
  ))

  return <div className={styles.container}>{items}</div>
}

export default Header
