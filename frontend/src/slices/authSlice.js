import { createSlice } from '@reduxjs/toolkit'

const tokenFromStorage = localStorage.getItem('access_token')

const slice = createSlice({
  name: 'auth',
  initialState: { 
    user: null, 
    token: null,
    isAuth: Boolean(tokenFromStorage)
  },
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      },
    ) => {
      state.user = user
      state.token = token
      state.isAuth = true
      localStorage.setItem('access_token', token)
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuth = false
      localStorage.removeItem('access_token')
    }
  },
})

export const { setCredentials, logout } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state) => state.auth.user

export const checkUserAuthenticated = (state) => state.auth.isAuth
