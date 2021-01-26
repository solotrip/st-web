import React from 'react'
import styles from './detailHighlight.module.scss'

const DetailHighlight = ({ value }) => {
  const highlights = value.map((v, index) => (
    <li key={`hl-${index}`} className={styles.highlight}>⚈ {v.value}</li>))
  return (
    <ul className={styles.list}>
      {highlights}
    </ul>
  )
}

export default DetailHighlight
