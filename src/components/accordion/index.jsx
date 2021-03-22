import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { MdChevronRight } from 'react-icons/md'
import styles from './accordion.module.scss'

const Accordion = ({ children, name, expandedDefault }) => {
  const [expanded, setExpanded] = useState(expandedDefault)
  const expand = () => {
    setExpanded(!expanded)
  }
  return (
    <div className={cn(styles.accordion, { [styles.expanded]: expanded })}>
      <button
        // role='button' aria-pressed={expanded}
        className={styles.header}
        tabIndex={0}
        onKeyDown={expand}
        onClick={() => expand()}
      >
        <span className={styles.name}>{name}</span>
        <span className={styles.icon}>
          <MdChevronRight fontSize='default'/>
        </span>
      </button>
      <div className={styles.content} aria-expanded={expanded}>
        {children}
      </div>
      <hr className={styles.sepator}/>
    </div>
  )
}

Accordion.propTypes = {
  expandedDefault: false
}

Accordion.propTypes = {
  children: PropTypes.node,
  expandedDefault: PropTypes.bool,
  name: PropTypes.string
}

export default Accordion
