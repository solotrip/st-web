import { axios } from '../utils/st-api-client'
import { SOLOTRIP_V1 } from '../constants/urls'

export async function getFlightCosts () {
  const url = SOLOTRIP_V1('flightCosts')
  const response = await axios.get(url)
  return response.data
}
