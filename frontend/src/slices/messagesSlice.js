import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { messages } from '../api/queries/messages'

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      return await messages.get()
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Ошибка загрузки сообщений'
      )
    }
  }
)

export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ body, channelId, username }, { rejectWithValue }) => {
    try {
      const newMessage = await messages.add( body, channelId, username)
      return newMessage
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Ошибка отправки сообщения'
      )
    }
  }
)

const initialState = {
  items: [],
  isLoading: false,
  error: null,
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
        console.log(333, state.items)
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Ошибка загрузки сообщений'
      })
      .addCase(addMessage.pending, (state) => {
        state.sendStatus = 'loading'
        state.sendError = null
      })

      .addCase(addMessage.fulfilled, (state, action) => {
        state.sendStatus = 'succeeded'
        state.items.push(action.payload)
      })

      .addCase(addMessage.rejected, (state, action) => {
        state.sendStatus = 'failed'
        state.sendError = action.payload || 'Ошибка отправки сообщения'
      })
  },
})

export default messagesSlice.reducer