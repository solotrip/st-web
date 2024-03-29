import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './text.module.scss'

const Text = React.forwardRef(
  ({
    placeholder,
    onChange,
    className,
    type,
    filled,
    error,
    beforeComponent: BeforeComponent,
    afterComponent: AfterComponent,
    ...props
  }, ref) => {
    return (
      <>
        <div
          className={cn(
            styles.inputContainer,
            {
              [styles.filled]: filled,
              [styles.error]: !!error
            },
            className
          )}
        >
          {BeforeComponent && <BeforeComponent/>}
          <input
            className={styles.input}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            ref={ref}
            {...props}
          />
          {AfterComponent && <AfterComponent/>}
        </div>
        {error && <div className={styles.errorText}>{error}</div>}
      </>
    )
  }
)

Text.defaultValues =  {
  type: 'text'
}

Text.propTypes =  {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  filled: PropTypes.bool
}


export default Text
