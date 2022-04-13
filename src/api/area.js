import { axios } from '../utils/st-api-client'
import { SOLOTRIP_V1 } from '../constants/urls'

export async function getFilters() {
  const url = SOLOTRIP_V1('areas/filters')
  const response = await axios.get(url)
  return response.data
}

export async function searchAreas({ filters, query, sortBy, sortOrder }) {
  const url = SOLOTRIP_V1('areas')
  const response = await axios.get(url, {
    params: {
      filters,
      query: query || undefined,
      sortBy,
      sortOrder
    }
  })
  return response.data.items
}
