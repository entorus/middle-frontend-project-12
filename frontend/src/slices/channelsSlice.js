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

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async ({ name }, { rejectWithValue }) => {
    try {
      const data = await channels.add(name)
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

export const editChannel = createAsyncThunk(
  'channels/editChannel',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const data = await channels.edit(id, name)
      console.log(11111, data)
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

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (id, { rejectWithValue }) => {
    try {
      const data = await channels.remove(id)
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
      state.currentChannelId = Number(action.payload)
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
      .addCase(addChannel.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      
      .addCase(addChannel.fulfilled, (state, action) => {
        state.isLoading = false
        state.channels.push(action.payload)
      })
      
      .addCase(addChannel.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Ошибка создания канала'
      })
      .addCase(editChannel.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      
      .addCase(editChannel.fulfilled, (state, action) => {
        state.isLoading = false
        const { id } = action.payload
        const elIndex = state.channels.findIndex(ch => ch.id === id)
        state.channels[elIndex] = action.payload
      })
      
      .addCase(editChannel.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Ошибка создания канала'
      })
      .addCase(removeChannel.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      
      .addCase(removeChannel.fulfilled, (state, action) => {
        const { id } = action.payload
        state.channels = state.channels.filter(ch => ch.id !== id)
        state.isLoading = true
        state.error = null
      })
      
      .addCase(removeChannel.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Ошибка удаления канала'
      })
  },
})

export const { clearChannels, setCurrentChannelId } = channelsSlice.actions

export default channelsSlice.reducer