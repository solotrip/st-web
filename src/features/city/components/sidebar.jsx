import React, { useState } from 'react'
import styles from './sidebar.module.scss'
import { Link } from 'react-scroll'

import '../styles.scss'

const Sidebar = ({ items }) => {
  const [selected, setSelected] = useState(0)

  const handleClick = index => {
    setSelected(index)
    console.log('aha', items[index])

    //window.scrollTo({ top: 1000, behavior: 'smooth' })
  }

  console.log('selected index:', selected)
  const toc = items.map((item, index) => {
    return (
      <div
        className={
          selected === index ? styles.tocContent : styles.tocContentNotSelected
        }
      >
        <div className={styles.whiteItemBackground}>
          <Link
            activeClass='active'
            to={items[index]}
            spy={true}
            smooth={true}
            offset={-100}
          >
            <button
              className={selected === index ? styles.selectedItem : styles.item}
              onClick={() => {
                handleClick(index)
              }}
            >
              {item}
            </button>
          </Link>
        </div>
      </div>
    )
  })
  return (
    <div className={styles.sidebar}>
      <div className={styles.toc}> {toc}</div>
    </div>
  )
}

export default Sidebar
