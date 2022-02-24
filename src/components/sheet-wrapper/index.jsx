import React, { useCallback } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './sheet-wrapper.module.scss'
import Sheet from 'react-modal-sheet'
import { FiX as CloseIcon } from 'react-icons/fi'
import Footer from './footer'
import qs from 'qs'

import { useSelector } from 'react-redux'
import { recentQueriesSelector } from '../../reducers/recentQueriesSlice'

const SheetWrapper = ({ children, ...rest }) => {
  const { path } = useParams()
  const history = useHistory()
  const location = useLocation()
  const recentQueries = useSelector(recentQueriesSelector)

  const closeSheet = useCallback(
    () => {
      if (
        path &&
        !history.location.pathname.split('/').includes('preferences')
      ) {
        history.replace({ pathname: `/${path}`, search: location.search })
      } else if (
        path &&
        history.location.pathname.split('/').includes('preferences') &&
        recentQueries.items &&
        recentQueries.items.length > 0
      ) {
        history.replace({
          pathname: '/recommendations',
          search: qs.stringify(recentQueries.items[0])
        })
      } else if (history.location.pathname.split('/').includes('preferences')) {
        history.replace({
          pathname: location.pathname
            .split('/')
            .slice(0, -1)
            .join('/'),
          search: location.search
        })
      } else if (
        history.location &&
        history.location.search &&
        history.location.search !== ''
      ) {
        history.replace({
          pathname: '/recommendations',
          search: history.location.search
        })
      } else {
        history.replace({ pathname: '/browse', search: '' })
      }
    },
    [history, path, location]
  )

  return (
    <Sheet
      rootId="root"
      isOpen={true}
      onClose={closeSheet}
      springConfig={{
        stiffness: 300,
        damping: 20,
        mass: 0.2
      }}
      {...rest}
    >
      <div className={styles.container}>
        <Sheet.Container>
          <Sheet.Header className={styles.sheetHeader} />
          <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>
      </div>
      <button className={styles.closeSheet} onClick={closeSheet}>
        <CloseIcon />
      </button>
      <div className={styles.backdropWrapper}>
        <Sheet.Backdrop />
      </div>
    </Sheet>
  )
}

SheetWrapper.defaultProps = {
  title: ''
}

SheetWrapper.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}

SheetWrapper.Footer = Footer
SheetWrapper.Content = ({ children }) => (
  <div className={styles.content}>{children}</div>
)

export default SheetWrapper
