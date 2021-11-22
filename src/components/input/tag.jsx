import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { MdClose } from 'react-icons/md'
import styles from './tag.module.scss'

const Tag = ({
  name,
  icon,
  onRemove
}) => {
  return (
    <div
      className={cn(styles.tag, { [styles.removable]: onRemove })}
      onClick={onRemove}
      onKeyDown={onRemove}
      role="button"
      tabIndex={-1}
    >
      {icon}
      <span className={styles.name}>{name}</span>
      {onRemove &&
      <MdClose
        className={styles.icon}
        fontSize="inherit"
      />}
    </div>
  )
}


Tag.defaultValues = {}

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onRemove: PropTypes.func
}


export default Tag
