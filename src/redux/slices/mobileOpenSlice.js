import { createSlice } from '@reduxjs/toolkit'

export const mobileOpenSlice = createSlice({
  name: 'mobileOpen',
  initialState: {
    value: false,
  },
  reducers: {
    setMobileOpen: (state) => {
      state.value = true
    },
  },
})

export const { setMobileOpen } = mobileOpenSlice.actions

export default mobileOpenSlice.reducer
