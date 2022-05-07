import React, { useMemo } from 'react'
import _groupBy from 'lodash/groupBy'
import Filter from './filter'
import { Accordion } from 'components'
import styles from './filters.module.scss'
import { RECENT_FILTERS_CATEGORY } from 'constants/index'

const Filters = ({ filters, filterValues, error, loading, updateFilter }) => {
  const filtersByCategory = useMemo(() => _groupBy(filters, 'category'), [filters])
  return (
    <div className={styles.filters}>
      {Object.keys(filtersByCategory).map(category => (
        <Accordion
          className={styles.accordionHolder}
          name={category}
          key={`category-${category}`}
          expandedDefault={category === RECENT_FILTERS_CATEGORY}
        >
          <div className={styles.inside}>
            {filtersByCategory[category].map(filter => (
              <div className={styles.insideElement}>
                <Filter
                  filter={filter}
                  value={filterValues[filter.uuid]}
                  key={`f-${filter.uuid}`}
                  updateFilter={updateFilter}
                  className={styles.filter}
                />
              </div>
            ))}
          </div>
        </Accordion>
      ))}
    </div>
  )
}

export default Filters
