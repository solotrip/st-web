import React from 'react'
import PropTypes from 'prop-types'
import styles from './card.module.scss'
import cn from 'classnames'

const Card = ({ children, className, title, type, subTitle }) => (
  <div
    className={cn(styles.card, className)}
  >
    <div className={styles.colorStrip}/>
    <div className={styles.cardContent}>
      <div className={styles.header}>
        <div className={styles.row}>
          <div className={styles.type}>{type}</div>
          {' '}
        </div>
        <div className={styles.row}>
          <div className={styles.headerTitle}>{title}</div>
          <div className={styles.subTitle}>
            {subTitle}
          </div>
        </div>
        <hr className={styles.hr}/>
      </div>

      <div className={styles.content}>
        {children}
      </div>
    </div>
  </div>
)

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Card
