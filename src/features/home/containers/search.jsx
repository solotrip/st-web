import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchPage from '../components/search-page'
import { fetchFilters, resetFilters, updateFilter, updateQuery } from '../slice'

const SearchContainer = () => {
  const dispatch = useDispatch()
  const { filters, filterValues, results, loading, error } = useSelector(
    state => state.home
  )
  useEffect(() => {
    dispatch(fetchFilters())
  }, [dispatch])

  const updateFilterCallback = useCallback(
    (filterId, variables) => dispatch(updateFilter(filterId, variables)),
    [dispatch])

  const resetFiltersCallback = useCallback(
    () => dispatch(resetFilters()),
    [dispatch])

  const updateQueryCallback = useCallback(
    value => dispatch(updateQuery(value)),
    [dispatch])

  return (
    <SearchPage
      results={results}
      updateQuery={updateQueryCallback}
      updateFilter={updateFilterCallback}
      filters={filters}
      resetFilters={resetFiltersCallback}
      filterValues={filterValues}
      loading={loading}
      error={error}
    />
  )
}

export default SearchContainer
