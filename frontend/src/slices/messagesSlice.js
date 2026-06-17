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
          error.message
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
          error.message
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
    addMessageToState(state, action) {
      state.items.push(action.payload)
    },
    removeMessagesById(state, action) {
      state.items = state.items.filter(item => item.channelId != action.payload.id)
    }
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
        state.error = action.payload
      })
  },
})

export const { addMessageToState, removeMessagesById } = messagesSlice.actions

export default messagesSlice.reducer
