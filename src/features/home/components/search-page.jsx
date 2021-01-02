import React, { useMemo } from 'react'
import Layout from './layout'
import { Search } from '../../../components/input'
import Header from './header'
import Filters from './filters'
import cn from 'classnames'
import styles from './search-page.module.scss'
import { SearchOutlined } from '@material-ui/icons'

import CityCard from './city-card/city-card'

import image from '../../../assets/images/forest.jpg'
import image1 from '../../../assets/images/random1.jpg'
import image2 from '../../../assets/images/random2.jpg'
import image3 from '../../../assets/images/random3.jpg'
import image4 from '../../../assets/images/random4.jpg'

let images = [image1, image, image2, image3, image4]

let cities = [
  'Barcelona',
  'Amsterdam',
  'San Fransisco',
  'Yozgat',
  'Bodrum',
  'Gümüşhane',
  'Gotham',
  'Arkansas',
  'Ankara',
  'Oslo',
  'Nur-Sultan'
]

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
    return filters
      .filter(f => filterIds.includes(f.uuid))
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
  const header = props => (
    <Header {...props}>
      <div className={cn('card', styles.search)}>
        <Search
          placeholder='Search'
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
    <CityCard
      id={r._id}
      key={`card-${r._id}`}
      imgsr={images[Math.floor(Math.random() * 4)]}
    >
      {r._id}
    </CityCard>
  ))

  const suggestedCities = cities.map(city => (
    <CityCard
      id={city}
      key={`card-${city}`}
      imgsr={images[Math.floor(Math.random() * 4)]}
    >
      {city}
    </CityCard>
  ))

  return (
    <Layout header={header} sidebar={sidebar}>
      <div className={styles.results}>
        {resultCards.length !== 0 ? resultCards : suggestedCities}
      </div>
    </Layout>
  )
}

SearchPage.propTypes = {}

export default SearchPage
