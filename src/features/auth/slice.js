import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import history from 'history/browser'
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

const initialState = {
  error: null
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
    [login.pending]: state => {
      state.error = null
    },
    [login.fulfilled]: (state, action) => {
      state.accessToken = action.payload.accessToken
    },
    [login.rejected]: (state, action) => {
      state.error = _.get(action.error, 'data', action.error.message)
    },
    [register.pending]: state => {
      state.error = null
    },
    [register.fulfilled]: (state, action) => {
      state.accessToken = action.payload.accessToken
    },
    [register.rejected]: (state, action) => {
      state.error = _.get(action.error, 'data', action.error.message)
    }
  }
})

export const { reset } = authSlice.actions

export default authSlice.reducer
