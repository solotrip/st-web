import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/searchbar'
import InterestList from '../../components/interestlist'
import { Loader } from 'components'
import styles from './interests.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInterests } from '../../slice'

const InterestsContainer = () => {
  const {
    interests,
    loadingInterests,
    errorInterests
  } = useSelector((state) => state.preferences)
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  useEffect(async () => {
    dispatch(fetchInterests())
  }, [])

  const updateInput = async (input) => {
    setInput(input)
  }

  return (
    <div className={styles.wrapper}>
      <SearchBar
        input={input}
        onChange={updateInput}
        placeHolder="Hiking, swimming etc."
      />
      <Loader loading={loadingInterests}>
        <InterestList interests={
          interests.filter((interest) => {
            return interest.name.toLowerCase().includes(input.toLowerCase())
          })
        }/>
      </Loader>
    </div>
  )
}

export default InterestsContainer
