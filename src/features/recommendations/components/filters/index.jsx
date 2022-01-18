import React, { useMemo } from 'react'
import _ from 'lodash'
import Filter from './filter'
import { Accordion } from 'components'
import styles from './filters.module.scss'
import { RECENT_FILTERS_CATEGORY } from 'constants/index'

const Filters = ({
  filters,
  filterValues,
  error,
  loading,
  updateFilter
}) => {
  const filtersByCategory = useMemo(
    () => _.groupBy(filters, 'category'),
    [filters])
  return (
    <div className={styles.filters}>
      {
        Object.keys(filtersByCategory)
          .map(category => (
          <Accordion
            name={category}
            key={`category-${category}`}
            expandedDefault={category === RECENT_FILTERS_CATEGORY}
          >
            {
              filtersByCategory[category].map(filter => (
                <Filter
                  filter={filter}
                  value={filterValues[filter.uuid]}
                  key={`f-${filter.uuid}`}
                  updateFilter={updateFilter}
                />))
            }
          </Accordion>
          ))}</div>)

}

export default Filters
