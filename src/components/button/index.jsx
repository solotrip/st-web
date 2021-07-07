import React from 'react'
import PropTypes from 'prop-types'
import styles from './button.module.scss'
import { MdCached } from 'react-icons/md'
import cn from 'classnames'

const Button = ({
  text,
  onClick,
  icon: Icon,
  className,
  loading,
  disabled,
  children,
  isSecondary
}) => (
  <button
    className={cn(styles.button, className, {
      [styles.secondary]: isSecondary
    })}
    onClick={onClick}
    disabled={disabled}
  >
    {loading ? (
      <MdCached className={cn(styles.loading, 'spin')}/>
    ) : (
      <>
        <span className={styles.buttonText}>{text}{children}</span>
        {Icon && <Icon className={styles.icon}/>}
      </>
    )
    }

  </button>
)

Button.defaultProps = {
  loading: false,
  disabled: false
}

Button.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool
}


export default Button
