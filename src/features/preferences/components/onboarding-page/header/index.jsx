import React from 'react'
import cn from 'classnames'
import styles from './header.module.scss'
import { useParams } from 'react-router-dom'

const Header = () => {

  const links = [
  
    {
      name: 'Dates',
      link: '/onboarding/1'
    },
    {
      name: 'Places',
      link: '/onboarding/2'
    }
  ]
  const { index } = useParams()
  const indexNumber = parseInt(index)

  const items = links.map((item, i) => (
    <div key={`o-h-${item.name}`} className={cn(styles.item, {
      [styles.active]: i === indexNumber - 1,
      [styles.filled]: i < indexNumber - 1,
      [styles.last]: i === links.length - 1
    })}>
      <span className={styles.index}>{i + 1}</span>
      <span className={styles.name}>{item.name}</span>
    </div>
  ))

  return (
    <div className={styles.container}>
      {items}
    </div>
  )
}

export default Header
