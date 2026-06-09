import axiosInstance from '../axiosInstance'

export const messages = {
  get: async () => {
    const response = await axiosInstance.get('/messages')
    return response.data
  },
  add: async (body, channelId, username) => {
    const response = await axiosInstance.post('/messages', { body, channelId, username })
    return response.data
  },
  edit: async (messageId, body) => {
    const response = await axiosInstance.patch(`/messages/${messageId}`, { body })
    return response.data
  },
  remove: async (messageId) => {
    const response = await axiosInstance.delete(`/messages/${messageId}`)
    return response.data
  },
}