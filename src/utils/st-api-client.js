import axiosOriginal from 'axios'
import { refresh } from '../api/auth'
import jwt from 'jsonwebtoken'
import qs from 'qs'
import history from 'history/browser'

let refreshPromise
let token
const axios = axiosOriginal.create({
  paramsSerializer: params => {
    return qs.stringify(params)
  }
})

const refreshTokenAsync = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  const { accessToken } = await refresh({
    refreshToken
  })
  token = accessToken
  localStorage.setItem('accessToken', accessToken)
}

// Add a request interceptor
axios.interceptors.request.use(async function(config) {
  if (!token) {
    token = localStorage.getItem('accessToken')
  }
  if (token) {
    var decodedToken = jwt.decode(token, { complete: true })
    var dateNow = new Date()
    // If there is 1 minute left for expiry, refresh
    if (
      decodedToken.payload.exp < Math.floor(dateNow.getTime() / 1000) + 60
    ) {
      try {
        if (!refreshPromise) {
          refreshPromise = refreshTokenAsync()
        }
        await refreshPromise
        refreshPromise = null
      } catch (e) {
        history.replace('/login')
        console.error(e.toString())
      }
    }
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add a response interceptor
axios.interceptors.response.use(function(response) {
  return response
}, function(error) {
  return Promise.reject(error)
})


export { axios }
