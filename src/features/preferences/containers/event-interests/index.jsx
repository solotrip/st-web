import React, { useCallback, useEffect, useState } from 'react'
import SearchBar from '../../components/searchbar'
import InterestList from '../../components/interestlist'
import { Loader } from 'components'
import styles from './interests.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  eventInterestsSelector,
  fetchInterests,
  updateInterestsSelected
} from './slice'

const EventInterestsContainer = () => {
  const {
    interests,
    loadingInterests,
    interestsSelected
  } = useSelector(eventInterestsSelector)
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchInterests())
  }, [dispatch])

  const updateInput = useCallback(async input => {
    setInput(input)
  }, [setInput])


  const selectInterest = useCallback((iid, value, currentValue) => {
    dispatch(updateInterestsSelected({ iid, value, currentValue }))
  }, [dispatch])


  return (
    <div className={styles.wrapper}>
      <SearchBar
        input={input}
        onChange={updateInput}
        placeHolder="Movies, Rock, Jazz, Football etc."
      />
      <Loader loading={loadingInterests}>
        <InterestList
          interests={
            interests.filter(interest => {
              return interest.name.toLowerCase().includes(input.toLowerCase())
            })
          }
          onSelect={selectInterest}
          interestsSelected={interestsSelected}
        />
      </Loader>
    </div>
  )
}

export default EventInterestsContainer
