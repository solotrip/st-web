import React, { useCallback, useState } from 'react'
import _zipObject from 'lodash/zipObject'
import { SheetWrapper } from 'components'
import {  useSelector } from 'react-redux'
import { filtersSelector } from './slice'
import qs from 'qs'
import { useQuery } from 'utils/hooks/use-query'
import { useHistory } from 'react-router-dom'
import Filters from '../../components/filters'

const FiltersContainer = () => {
  const {
    loading,
    filters
  } = useSelector(filtersSelector)
  const query = useQuery()
  const history = useHistory()
  const [data, setData] = useState({
    ...query,
    filters: query.filters ?
      _zipObject(
        query.filters.map(q => q.id),
        query.filters.map(q => q.variables || true)
      ) :
      {}
  })

  const onUpdate = useCallback((filterId, value) => {
    setData(prevData => ({
      ...prevData,
      filters: {
        ...prevData.filters,
        [filterId]: value === false ? undefined : value
      }
    }))
  }, [setData])

  const onSubmit = () => {
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
  }

  return (
    <SheetWrapper>
      <SheetWrapper.Content>
        <Filters filters={filters} loading={loading} updateFilter={onUpdate}
                 filterValues={data.filters}
        />
      </SheetWrapper.Content>
      <SheetWrapper.Footer onClick={onSubmit} text="Search"
                           disabled={false}
      />
    </SheetWrapper>
  )
}

export default FiltersContainer
