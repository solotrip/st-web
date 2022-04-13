import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import _debounce from 'lodash/debounce'
import Tag from './tag'
import styles from './search.module.scss'
import { MdClose, MdSearch } from 'react-icons/md'

const Search = ({
  defaultValue,
  placeholder,
  onChange,
  onReset,
  className,
  tags,
  filled, beforeComponent: BeforeComponent, afterComponent: AfterComponent,
  ...props
}) => {
  const [value, setValue] = useState(defaultValue)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeHandler = useCallback(
    _debounce(
      value => {
        onChange(value)
      },
      500,
      { trailing: true, leading: false }),
    []
  )
  const changeHandler = e => {
    setValue(e.target.value)
    debouncedChangeHandler(e.target.value)
  }
  const handleReset = useCallback(() => {
    setValue('')
    onReset()
  }, [setValue, onReset])

  return (
    <div
      className={cn(
        styles.inputContainer,
        { [styles.filled]: filled },
        className
      )}
    >
      <MdSearch className={styles.searchIcon}/>
      <div className={styles.innerContainer}>
        {tags &&
        tags.map(t => (
          <Tag
            key={`search-tag-${t.name}`}
            onClick={t.onRemove}
            name={t.name}
            icon={t.icon &&
            <span role="img" aria-label={t.icon}>{t.icon}</span>}
          />
        ))
        }
        <input
          {...props}
          className={styles.input}
          onChange={changeHandler}
          value={value}
          placeholder={placeholder}
        />
      </div>
      {
        ((tags && tags.length > 0) || value) &&
        <MdClose
          className={styles.resetButton}
          onClick={handleReset}
          onKeyDown={handleReset}
          role="button"
        />
      }

    </div>
  )
}

Search.defaultValues = {
  type: 'text',
  defaultValue: '',
  tags: []
}

Search.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  tags: PropTypes.array,
  onReset: PropTypes.func
}

export default Search
