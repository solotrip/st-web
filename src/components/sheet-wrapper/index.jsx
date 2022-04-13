import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './sheet-wrapper.module.scss'
import Sheet from 'react-modal-sheet'
import { MdClose as CloseIcon } from 'react-icons/md'
import Footer from './footer'

const SheetWrapper = ({ children, disableDrag = false, closable = true, ...rest }) => {
  const history = useHistory()

  const closeSheet = useCallback(
    () => {
      if (closable) {
        if (history.length === 1) {
          history.replace('/browse')
        } else {
          history.goBack()
        }
      }
    },
    [history]
  )

  return (
    <Sheet
      rootId="root"
      disableDrag={disableDrag}
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
        {closable ? <CloseIcon /> : <div />}
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
SheetWrapper.Content = ({ children }) => <div className={styles.content}>{children}</div>

export default SheetWrapper
