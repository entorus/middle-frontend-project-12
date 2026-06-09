import axiosInstance from '../axiosInstance'

export const messages = {
  get: async () => {
    const response = await axiosInstance.get('/messages')
    return response.data
  },
}