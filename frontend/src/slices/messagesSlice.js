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
  },
})

export const { addMessage } = messagesSlice.actions

export default messagesSlice.reducer