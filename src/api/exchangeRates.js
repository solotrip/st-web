import { axios } from '../utils/st-api-client'
import { SOLOTRIP_V1 } from '../constants/urls'

export async function getExchangeRates () {
  const url = SOLOTRIP_V1('exchangeRates')
  const response = await axios.get(url)
  return response.data[0]
}
