import React, { useMemo } from 'react'
import { CityCardList, Layout, SearchInput } from 'components'
import Header from './header'
import Filters from './filters'
import cn from 'classnames'
import styles from './search-page.module.scss'

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
  const tags = useMemo(() => {
    const filterIds = Object.keys(filterValues)
    return filters.filter(f => filterIds.includes(f.uuid))
    .map(f => ({
      ...f,
      onRemove: () => updateFilter(f.uuid, false)
    }))
  }, [filterValues, filters, updateFilter])

  const handleSearch = value => {
    updateQuery(value)
  }

  const sidebar = filters && (
    <Filters
      filters={filters}
      filterValues={filterValues}
      updateFilter={updateFilter}
    />
  )
  const header = (
    <Header>
      <div className={cn('card', styles.search)}>
        <SearchInput
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

  return (
    <Layout header={header} sidebar={sidebar}>
      <div className={styles.results}>
        <CityCardList data={results} className={styles.results}/>
      </div>
    </Layout>
  )
}

SearchPage.propTypes = {}

export default SearchPage
