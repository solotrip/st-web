import React, { useCallback } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './sheet-wrapper.module.scss'
import Sheet from 'react-modal-sheet'
import { FiX as CloseIcon } from 'react-icons/fi'
import Footer from './footer'

const SheetWrapper = ({ children, ...rest }) => {
  const { path } = useParams()
  const history = useHistory()
  const location = useLocation()

  const closeSheet = useCallback(() => {
    if (path) {
      history.replace({ pathname: `/${path}`, search: location.search })
    } else {
      history.replace({
        pathname: location.pathname.split('/').slice(0, -1).join('/'),
        search: location.search
      })
    }

  }, [history, path, location])

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
          <Sheet.Header className={styles.sheetHeader}/>
          <Sheet.Content>
            {children}
          </Sheet.Content>
        </Sheet.Container>
      </div>
      <button
        className={styles.closeSheet}
        onClick={closeSheet}
      >
        <CloseIcon/>
      </button>
      <div className={styles.backdropWrapper}>
        <Sheet.Backdrop/>
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
  <div className={styles.content}>{children}</div>)

export default SheetWrapper