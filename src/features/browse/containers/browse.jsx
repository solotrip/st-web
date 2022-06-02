import React, { useEffect } from 'react'
import BrowseHeader from '../../recommendations/components/browseHeader'
import Content from '../components/content'
import { useDispatch, useSelector } from 'react-redux'
import { browseSelector, fetchBrowseItems } from '../slice'
import { Loader } from 'components'
import { recentQueriesSelector } from 'reducers/recentQueriesSlice'
import { filtersSelector } from 'features/recommendations/containers/filters/slice'
import { locationSelector } from 'features/recommendations/containers/location/slice'

import styles from './browse.module.scss'
const BrowseContainer = () => {
  const { loading, browseItems } = useSelector(browseSelector)
  const recentQueries = useSelector(recentQueriesSelector)
  const { filtersDict } = useSelector(filtersSelector)
  const { locations } = useSelector(locationSelector)
  const dispatch = useDispatch()
  useEffect(
    () => {
      dispatch(fetchBrowseItems())
    },
    [dispatch]
  )

  return (
    <div className={styles.page}>
      <BrowseHeader backIsVisible={false} trackIsVisible={false} className={styles.header} />

      <Loader loading={loading}>
        <Content
          items={browseItems}
          recentQueries={recentQueries}
          filtersDict={filtersDict}
          locations={locations}
        />
      </Loader>
    </div>
  )
}

export default BrowseContainer
