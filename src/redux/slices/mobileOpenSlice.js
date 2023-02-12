import { createSlice } from '@reduxjs/toolkit'

export const mobileOpenSlice = createSlice({
  name: 'mobileOpen',
  initialState: {
    value: false,
  },
  reducers: {
    setMobileOpen: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setMobileOpen } = mobileOpenSlice.actions

export default mobileOpenSlice.reducer
