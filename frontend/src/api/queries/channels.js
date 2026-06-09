import axiosInstance from '../axiosInstance'

export const channels = {
  get: async () => {
    const response = await axiosInstance.get('/channels')
    return response.data
  },
  add: async (name) => {
    const response = await axiosInstance.post('/channels', { name })
    return response.data
  },
  edit: async (channelId, name) => {
    const response = await axiosInstance.patch(`/channels/${channelId}`, { name })
    return response.data
  },
  remove: async (channelId) => {
    const response = await axiosInstance.delete(`/channels/${channelId}`)
    return response.data
  },
}