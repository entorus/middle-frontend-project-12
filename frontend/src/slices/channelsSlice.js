import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { channels } from '../api/queries/channels'

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { rejectWithValue }) => {
    try {
      const data = await channels.get()
      return data
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
  channels: [],
  currentChannelId: 1,
  isLoading: false,
  error: null,
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId(state, action) {
      state.currentChannelId = action.payload
    },
    clearChannels(state) {
      state.channels = []
      state.error = null
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.isLoading = true
        state.error = null
      })

      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.isLoading = false
        state.channels = action.payload
      })

      .addCase(fetchChannels.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Ошибка загрузки каналов'
      })
  },
})

export const { clearChannels, setCurrentChannelId } = channelsSlice.actions

export default channelsSlice.reducer