import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../recommendations/components/header'
import Content from '../components/content'
import { useDispatch, useSelector } from 'react-redux'
import { browseSelector, fetchBrowseItems } from '../slice'
import { Loader } from 'components'
import { recentQueriesSelector } from 'reducers/recentQueriesSlice'
import { filtersSelector }
  from 'features/recommendations/containers/filters/slice'
import { locationSelector }
  from 'features/recommendations/containers/location/slice'

const BrowseContainer = () => {
  const { loading, browseItems } = useSelector(browseSelector)
  const { items: recentQueries } = useSelector(recentQueriesSelector)
  const { filtersDict } = useSelector(filtersSelector)
  const { locations } = useSelector(locationSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBrowseItems())
  }, [dispatch])

  return (
    <>
      <div className="flex-col">
        <Link to="/recommendations">
          <Header backIsVisible={false} trackIsVisible={false}/>
        </Link>

        <Loader loading={loading}>
          <Content
            items={browseItems}
            recentQueries={recentQueries}
            filtersDict={filtersDict}
            locations={locations}
          />
        </Loader>
      </div>
    </>
  )
}

export default BrowseContainer
