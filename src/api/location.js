import { axios } from '../utils/st-api-client'
import { SOLOTRIP_V1 } from '../constants/urls'

export async function searchLocation({ query }) {
  const url = SOLOTRIP_V1('location')
  const response = await axios.get(url, {
    params: {
      q: query
    }
  })
  return response.data
}

export async function geocodeLocation({  lon, lat }) {
  const url = SOLOTRIP_V1('location')
  const response = await axios.get(url, {
    params: {
      q: `${lon},${lat}`
    }
  })
  return response.data[0]
}
