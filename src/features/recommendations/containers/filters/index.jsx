import React, { useCallback, useMemo, useState } from 'react'
import _zipObject from 'lodash/zipObject'
import { SheetWrapper } from 'components'
import { useSelector, useDispatch } from 'react-redux'
import { filtersSelector } from './slice'
import qs from 'qs'
import { useQuery } from 'utils/hooks/use-query'
import { useHistory } from 'react-router-dom'
import Filters from '../../components/filters'
import { RECENT_FILTERS_CATEGORY, RECENT_FILTERS_COUNT } from 'constants/index'
import SettingsSection from 'components/settings-section'
import { fetchRecommendations, recommendationsSelector } from '../../slice'

const FiltersContainer = () => {
  const { loading, filters, recentFilters, filtersDict } = useSelector(filtersSelector)
  const query = useQuery()
  const history = useHistory()
  const dispatch = useDispatch()
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
    dispatch(fetchRecommendations(query))
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
      //history.go(0)
    }
  }

  const onBack = () => {
    history.push({
      pathname: '/recommendations/passport',
      search: qs.stringify(data)
    })
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
    <SheetWrapper snapPoints={[900]}>
      <SheetWrapper.Content>
        <SettingsSection
          title="Filters"
          // eslint-disable-next-line max-len
          description="You could add some filters to specify your search. Activities, Regions, Restrictions, you name it. You can select multiple filters."
        >
          <Filters
            filters={filtersWithRecent}
            loading={loading}
            updateFilter={onUpdate}
            filterValues={data.filters}
          />
        </SettingsSection>
      </SheetWrapper.Content>
      <SheetWrapper.Footer
        onClick={onSubmit}
        text="Search"
        disabled={false}
        previousEnabled={true}
        previousOnClick={onBack}
        previousText="< Passport"
      />
    </SheetWrapper>
  )
}

export default FiltersContainer
