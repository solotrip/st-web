import React, { useMemo } from 'react'
import Layout from './layout'
import { Search } from '../../../components/input'
import Header from './header'
import Filters from './filters'
import cn from 'classnames'
import styles from './search-page.module.scss'
import { SearchOutlined } from '@material-ui/icons'

const SearchPage = ({
  filters,
  filterValues,
  updateFilter,
  updateQuery,
  results,
  resetFilters,
  error,
  loading
}) => {
  const tags = useMemo(
    () => {
      const filterIds = Object.keys(filterValues)
      return filters.filter(
        f => filterIds.includes(f.uuid)
      ).map(f => ({
        ...f,
        onRemove: () => updateFilter(f.uuid, false)
      }))
    }, [filterValues, filters, updateFilter]
  )


  const handleSearch = value => {
    updateQuery(value)
  }

  const sidebar = filters &&
    <Filters
      filters={filters}
      filterValues={filterValues}
      updateFilter={updateFilter}
    />
  const header = props => (
    <Header {...props}>
      <div className={cn('card', styles.search)}>
        <Search
          placeholder="Search"
          onChange={handleSearch}
          tags={tags}
          maxLength={100}
          onReset={resetFilters}
          filled
        />
      </div>
    </Header>
  )

  const resultCards = results.map(r => (
    <div key={`card-${r._id}`}>
      {r._id}
    </div>
  ))

  return (
    <Layout header={header} sidebar={sidebar}>
      {resultCards}
    </Layout>
  )
}

SearchPage.propTypes = {}

export default SearchPage
