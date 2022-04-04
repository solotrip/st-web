import React from 'react'
import cn from 'classnames'
import styles from './header.module.scss'
import { useParams } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'

const Header = () => {
  const links = [
    {
      name: 'Bucketlist',
      link: '/onboarding/1'
    },
    {
      name: 'Finish',
      link: '/onboarding/2'
    }
  ]
  const { index } = useParams()
  const indexNumber = parseInt(index)

  const items = links.map((item, i) => (
    <div
      key={`o-h-${item.name}`}
      className={cn(styles.item, {
        [styles.active]: i === indexNumber - 1,
        [styles.filled]: i < indexNumber - 1,
        [styles.last]: i === links.length - 1
      })}
    >
      <span className={styles.index}>{i + 1}</span>
      <span className={styles.name}>{item.name}</span>
    </div>
  ))

  return (
    <div className={Capacitor.getPlatform() === 'ios' ? styles.containerIos : styles.container}>
      {items}
    </div>
  )
}

export default Header
