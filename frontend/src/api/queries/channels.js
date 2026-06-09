import axiosInstance from '../axiosInstance'

export const channels = {
  get: async () => {
    const response = await axiosInstance.get('/channels')
    return response.data
  }
}