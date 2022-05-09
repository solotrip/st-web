import React, { useCallback, useMemo, useState } from 'react'
import _zipObject from 'lodash/zipObject'
import { SheetWrapper } from 'components'
import { useSelector } from 'react-redux'
import { filtersSelector } from './slice'
import qs from 'qs'
import { useQuery } from 'utils/hooks/use-query'
import { useHistory } from 'react-router-dom'
import Filters from '../../components/filters'
import { RECENT_FILTERS_CATEGORY, RECENT_FILTERS_COUNT } from 'constants/index'

const FiltersContainer = () => {
  const { loading, filters, recentFilters, filtersDict } = useSelector(filtersSelector)
  const query = useQuery()
  const history = useHistory()
  const [data, setData] = useState({
    ...query,
    filters: query.filters
      ? _zipObject(query.filters.map(q => q.id), query.filters.map(q => q.variables || true))
      : {}
  })

  const onUpdate = useCallback(
    (filterId, value) => {
      setData(prevData => ({
        ...prevData,
        filters: {
          ...prevData.filters,
          [filterId]: value === false ? undefined : value
        }
      }))
    },
    [setData]
  )

  const onSubmit = () => {
    console.log(Object.keys(data.filters))

    console.log(
      'aha:',
      Object.keys(data.filters)
        .filter(k => data.filters[k] !== undefined)
        .map(k => ({
          id: k,
          variables: data.filters[k] === true ? undefined : data.filters[k]
        }))
    )
    history.push({
      pathname: '/recommendations',
      search: qs.stringify({
        ...data,
        filters: Object.keys(data.filters)
          .filter(k => data.filters[k] !== undefined)
          .map(k => ({
            id: k,
            variables: data.filters[k] === true ? undefined : data.filters[k]
          }))
      })
    })
    if (Object.keys(data.filters) === [] || Object.keys(data.filters).length === 0) {
      history.go(0)
    }
  }
  const filtersWithRecent = useMemo(
    () => [
      ...recentFilters.slice(0, RECENT_FILTERS_COUNT).map(f => ({
        ...filtersDict[f],
        category: RECENT_FILTERS_CATEGORY
      })),
      ...filters
    ],
    [recentFilters, filtersDict, filters]
  )
  return (
    <SheetWrapper>
      <SheetWrapper.Content>
        <Filters
          filters={filtersWithRecent}
          loading={loading}
          updateFilter={onUpdate}
          filterValues={data.filters}
        />
      </SheetWrapper.Content>
      <SheetWrapper.Footer onClick={onSubmit} text="Search" disabled={false} />
    </SheetWrapper>
  )
}

export default FiltersContainer
