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

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ body, channelId, username }, { rejectWithValue }) => {
    try {
      const newMessage = await messages.add(body, channelId, username)
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
  reducers: {
    addMessage(state, action) {
      state.items.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Ошибка загрузки сообщений'
      })
      .addCase(sendMessage.pending, (state) => {
        state.sendStatus = 'loading'
        state.sendError = null
      })

      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sendStatus = 'succeeded'
        state.items.push(action.payload)
      })

      .addCase(sendMessage.rejected, (state, action) => {
        state.sendStatus = 'failed'
        state.sendError = action.payload || 'Ошибка отправки сообщения'
      })
  },
})

export const { addMessage } = messagesSlice.actions

export default messagesSlice.reducer