import React from 'react'
import PropTypes from 'prop-types'
import styles from './card.module.scss'
import cn from 'classnames'

const Card = ({ children, className }) => (
  <div className={cn(styles.card, className)}>
    {children}
  </div>
)

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Card
