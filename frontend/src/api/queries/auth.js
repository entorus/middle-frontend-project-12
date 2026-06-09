import axiosInstance from '../axiosInstance'

export const auth = {
  login: async ({ username, password }) => {
    const response = await axiosInstance.post('/login', { username, password })
    return response.data
  },
  signup: async ({ username, password }) => {
    const response = await axiosInstance.post('/signup', { username, password })
    return response.data
  }
}