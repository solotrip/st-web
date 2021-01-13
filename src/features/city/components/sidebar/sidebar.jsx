import React, { useState } from 'react'
import styles from './sidebar.module.scss'
//import { Link } from 'react-scroll'

import { Link } from 'react-router-dom'

import '../../../../theme/styles.scss'

import { useTranslation } from 'react-i18next'

const Sidebar = ({ items, city, page }) => {
  const [selected, setSelected] = useState(0)
  const { t, i18n } = useTranslation(['translation'])

  const handleClick = index => {
    setSelected(index)
    console.log('aha', items[index])
    console.log('sidebar active page is: ', page)
  }

  const handleLinkChange = () => {}

  console.log('sidebar active page is: ', page)
  console.log('selected index:', selected)
  console.log('sidebar city and page  is:', city, page)
  const toc = items.map((item, index) => {
    if (item !== 'Similar Cities') {
      let slugItem = (item && item.toLowerCase().replace(/\s/g, '-')) || ''
      return (
        <div
          className={
            selected === index
              ? styles.tocContent
              : styles.tocContentNotSelected
          }
        >
          <div className={styles.whiteItemBackground}>
            {/*<Link
            activeClass='active'
            to={items[index]}
            spy={true}
            smooth={true}
            offset={-100}
          >*/}
            <Link to={'/cities/' + city + '/' + slugItem}>
              <button
                className={
                  page === slugItem ? styles.selectedItem : styles.item
                }
              >
                {t(`translation:${item}`)}
              </button>
            </Link>
          </div>
        </div>
      )
    }
  })
  return (
    <div className={styles.sidebar}>
      <div className={styles.toc}> {toc}</div>
    </div>
  )
}

export default Sidebar
