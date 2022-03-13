import axios from 'axios'
import { axios as authAxios } from '../utils/st-api-client'

import { SOLOTRIP_V1 } from '../constants/urls'

export async function login ({ email, password }) {
  const url = SOLOTRIP_V1('auth/login')
  const response = await axios.post(url, { email, password })
  return response.data
}

export async function loginWithGoogle ({ token }) {
  const url = SOLOTRIP_V1('auth/google/login')
  const response = await authAxios.post(url, { token })
  return response.data
}

export async function loginWithApple ({ token }) {
  const url = SOLOTRIP_V1('auth/apple/login')
  const response = await authAxios.post(url, { token })
  return response.data
}

export async function register ({ name, username, email, password }) {
  const url = SOLOTRIP_V1('auth/register')
  const response = await authAxios.post(url, {
    name,
    username,
    email,
    password
  })
  return response.data
}

export async function createGuestUser () {
  const url = SOLOTRIP_V1('auth/guest')
  const response = await axios.post(url)
  return response.data
}

export async function refresh ({ refreshToken, cancelToken }) {
  const url = SOLOTRIP_V1('auth/refresh')
  const response = await axios.post(url, { refreshToken }, { cancelToken })
  return response.data
}
