import React, { useCallback, useEffect, useState } from 'react'
import SearchBar from '../../components/searchbar'
import InterestList from '../../components/interestlist'
import { Loader } from 'components'
import styles from './interests.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  activityInterestsSelector,
  fetchInterests,
  updateInterestsSelected
} from './slice'

const ActivityInterestsContainer = () => {
  const {
    interests,
    loadingInterests,
    interestsSelected
  } = useSelector(activityInterestsSelector)
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchInterests())
  }, [dispatch])

  const updateInput = useCallback(input => {
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
        placeHolder="Hiking, Skiing, Swimming etc."
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


export const eventInterestsSelector = state => (
  state.preferences.activityInterests.interests
)

export const eventInterestsSelectedSelector = state => (
  state.preferences.activityInterests.interestsSelected
)


export default ActivityInterestsContainer
