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

  const closeSheet = useCallback(
    () => {
      console.log(' path is: ', path)
      if (path) {
        console.log('option1')
        history.replace({ pathname: `/${path}`, search: location.search })
      } else if (history.location.pathname.split('/').includes('preferences')) {
        console.log('option2')

        console.log('location here is this:', location)
        console.log('split: ', history.location.pathname)
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
        console.log('option3')
        history.replace({
          pathname: '/recommendations',
          search: history.location.search
        })
      } else {
        console.log('option4')

        console.log('split2: ', history.location.pathname)
        console.log('split2 location: ', history.location.search)
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
