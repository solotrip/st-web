import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './browse-layout.module.scss'

const BrowseLayout = ({ children, header, bottomBar, sidebar }) => {
  return (
    <div className={styles.layout}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={cn(styles.main, { noHeader: !header })}>
        {/*sidebar*/}
        <div className={cn(styles.content)}>{children}</div>
        {bottomBar}
      </div>
    </div>
  )
}

BrowseLayout.propTypes = {
  children: PropTypes.node.isRequired,
  infoText: PropTypes.string
}

export default BrowseLayout
