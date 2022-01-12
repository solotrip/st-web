import React from 'react'
import cn from 'classnames'
import { MdEdit } from 'react-icons/md'
import styles from './tag.module.scss'

const Tag = ({
  name,
  icon: Icon,
  onClick
}) => {
  return (
    <div
      className={cn(styles.tag, { [styles.removable]: onClick })}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={-1}
    >
      {!Icon && onClick &&
      <MdEdit
        className={styles.icon}
        fontSize="inherit"
      />}
      { Icon &&
        <Icon
          className={styles.icon}
          fontSize="inherit"
        />
      }
      <span className={styles.name}>{name}</span>
    </div>
  )
}


export default Tag
