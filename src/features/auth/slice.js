import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  clearTokens,
  initializeAuthentication,
  updateAccessToken,
  updateRefreshToken
} from 'utils/auth'
import { fetchProfile } from 'features/profile/slice'
import * as AuthApi from 'api/auth'
import _ from 'lodash'
import { registerDevice } from 'utils/notification'
import { fetchTracked, trackSelector } from 'features/track/slice'
import { fetchWishlist, wishlistSelector } from 'features/wishlist/slice'

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, history }, { dispatch }) => {
    const { accessToken, refreshToken } = await AuthApi.login({
      email,
      password
    })
    await updateAccessToken(accessToken)
    await updateRefreshToken(refreshToken)
    dispatch(fetchProfile())
    history.replace('/browse')
  }
)

export const logout = createAsyncThunk(
  '' + 'auth/logout',
  async ({ history }, { dispatch }) => {
    await clearTokens()
    dispatch({ type: 'store/reset' })
    history.replace('/')
  }
)

export const createGuest = createAsyncThunk(
  'auth/createGuest',
  async (_, { dispatch }) => {
    const { accessToken, refreshToken } = await AuthApi.createGuestUser()
    await updateAccessToken(accessToken)
    await updateRefreshToken(refreshToken)
    dispatch(fetchProfile())
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, username, email, password, history }, { dispatch }) => {
    const { accessToken, refreshToken } = await AuthApi.register({
      name,
      username,
      email,
      password
    })
    await updateAccessToken(accessToken)
    await updateRefreshToken(refreshToken)
    dispatch(fetchProfile())
    history.replace('/browse')
  }
)

/**
 * If called with ensureAuth=true,
 * it will create a guest user if user has not authenticated before.
 */
export const initialize = createAsyncThunk(
  'auth/init',
  async ({ ensureAuth, history } = false, { dispatch, getState }) => {
    const {
      isAuthenticated,
      isGuest,
      username
    } = await initializeAuthentication()

    if (!isAuthenticated && ensureAuth) {
      dispatch(createGuest())
    } else {
      // Fetch profile only once to prevent unnecessary calls
      if (isAuthenticated) {
        if (getState().profile.data === null) {
          dispatch(fetchProfile())
        }
        if (!trackSelector(getState()).initialized) {
          dispatch(fetchTracked())
        }
        if (!wishlistSelector(getState()).initialized) {
          dispatch(fetchWishlist())
        }
        await registerDevice(history)
      }

      return {
        isAuthenticated,
        isGuest,
        username
      }
    }
  }
)

const initialState = {
  error: null,
  loading: true,
  isAuthenticated: false,
  isGuest: false,
  username: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset(state) {
      state = { ...initialState }
    }
  },
  extraReducers: {
    [initialize.pending]: state => {
      state.error = null
      if (!state.isAuthenticated) {
        state.loading = true
      }
    },
    [initialize.fulfilled]: (state, action) => {
      if (action.payload) {
        state.isAuthenticated = action.payload.isAuthenticated
        if (state.isAuthenticated) {
          state.username = action.payload.username
          state.isGuest = action.payload.isGuest
        }
        state.loading = false
      }
    },
    [initialize.error]: (state, action) => {
      state.isAuthenticated = false
      state.loading = true
      state.error = _.get(action.error, 'data', JSON.stringify(action.error))
    },
    [createGuest.pending]: state => {
      state.error = null
      state.loading = true
      state.isAuthenticated = false
    },
    [createGuest.fulfilled]: state => {
      state.isAuthenticated = true
      state.username = 'Guest'
      state.isGuest = true
      state.loading = false
    },
    [createGuest.error]: (state, action) => {
      state.isAuthenticated = false
      state.loading = true
      state.error = _.get(action.error, 'data', action.error.message)
    },
    [login.pending]: state => {
      state.error = null
    },
    [login.fulfilled]: state => {
      state.isAuthenticated = true
    },
    [login.rejected]: (state, action) => {
      state.error = _.get(action.error, 'data', action.error.message)
    },
    [register.pending]: state => {
      state.error = null
    },
    [register.fulfilled]: state => {
      state.isAuthenticated = true
    },
    [register.rejected]: (state, action) => {
      state.error = _.get(action.error, 'data', action.error.message)
    },
    [logout.fulfilled]: state => {
      state = { ...initialState }
    }
  }
})

export const { reset } = authSlice.actions

export default authSlice.reducer
