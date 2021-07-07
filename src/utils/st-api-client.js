import axiosOriginal from 'axios'
import { clearTokens, getValidAccessToken } from 'utils/auth'
import qs from 'qs'
import history from 'history/browser'

const axios = axiosOriginal.create({
  paramsSerializer: params => {
    return qs.stringify(params)
  }
})

// Add a request interceptor
axios.interceptors.request.use(async function(config) {
  try {
    const token = await getValidAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (e) {
    clearTokens()
    history.replace('/login')
    console.error(e.toString())
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
