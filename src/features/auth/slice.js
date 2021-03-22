import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import history from 'history/browser'
import { initializeAuthentication } from 'utils/auth'
import * as AuthApi from '../../api/auth'
import _ from 'lodash'


export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const { accessToken, refreshToken } = await AuthApi.login({
      email,
      password
    })
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    history.replace('/')
    return { accessToken }
  })

export const register = createAsyncThunk(
  'auth/register', async ({
    name, username, email, password
  }) => {
    const { accessToken, refreshToken } = await AuthApi.register({
      name,
      username,
      email,
      password
    })
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    history.replace('/')
    return { accessToken }
  })

export const initialize = createAsyncThunk(
  'auth/init', async () => {
    return await initializeAuthentication()
  }
)

const initialState = {
  error: null,
  loading: true,
  loggedIn: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset(state) {
      state = initialState
    }
  },
  extraReducers: {
    [initialize.pending]: state => {
      state.error = null
      state.loading = true
      state.loggedIn = false
    },
    [initialize.fulfilled]: (state, action) => {
      state.loggedIn = action.payload
      state.loading = false
    },
    [initialize.error]: (state, action) => {
      state.loggedIn = false
      state.loading = true
      state.error = _.get(action.error, 'data', action.error.message)
    },
    [login.pending]: state => {
      state.error = null
    },
    [login.fulfilled]: state => {
      state.loggedIn = true
    },
    [login.rejected]: (state, action) => {
      state.error = _.get(action.error, 'data', action.error.message)
    },
    [register.pending]: state => {
      state.error = null
    },
    [register.fulfilled]: state => {
      state.loggedIn = true
    },
    [register.rejected]: (state, action) => {
      state.error = _.get(action.error, 'data', action.error.message)
    }
  }
})

export const { reset } = authSlice.actions

export default authSlice.reducer
