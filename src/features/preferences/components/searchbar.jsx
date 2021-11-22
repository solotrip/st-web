import React from 'react'
import styles from './searchbar.module.scss'

const SearchBar = ({ input: keyword, onChange: setKeyword, placeHolder }) => {
  return (
    <input
      className={styles.wrapper}
      value={keyword}
      placeholder={placeHolder}
      onChange={e => setKeyword(e.target.value)}
    />
  )
}

export default SearchBar
