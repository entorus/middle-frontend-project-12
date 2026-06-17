import { createSlice } from '@reduxjs/toolkit'

const tokenFromStorage = localStorage.getItem('access_token')

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: localStorage.getItem('user'), 
    token: localStorage.getItem('token'),
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
      localStorage.setItem('user', user)
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuth = false
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    }
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer

export const checkUserAuthenticated = (state) => state.auth.isAuth
