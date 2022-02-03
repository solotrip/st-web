import { axios } from '../utils/st-api-client'
import { SOLOTRIP_V1 } from '../constants/urls'

export async function getBrowseItems() {
  const url = SOLOTRIP_V1('browse')
  const response = await axios.get(url)
  return response.data
}
