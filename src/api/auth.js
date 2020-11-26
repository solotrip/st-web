import axios from 'axios'
import { SOLOTRIP_V1 } from '../constants/urls'

export async function login({ email, password }) {
  const url = SOLOTRIP_V1('auth/login')
  const response = await axios.post(url, { email, password })
  return response.data
}

export async function register({ name, username, email, password }) {
  const url = SOLOTRIP_V1('auth/register')
  const response = await axios.post(url, { name, username, email, password })
  return response.data
}


export async function refresh({ refreshToken }) {
  const url = SOLOTRIP_V1('auth/refresh')
  const response = await axios.post(url, { refreshToken })
  return response.data
}
