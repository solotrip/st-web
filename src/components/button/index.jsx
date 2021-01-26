import React from 'react'
import PropTypes from 'prop-types'
import styles from './button.module.scss'
import cn from 'classnames'

const Button = ({ text, onClick, icon: Icon, className }) => (
  <button className={cn(styles.button, className)} onClick={onClick}>
    <span className={styles.buttonText}>{text}</span>
    {Icon && <Icon/>}
  </button>
)

Button.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.shape({})
}


export default Button
