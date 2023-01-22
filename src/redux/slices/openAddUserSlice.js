import { createSlice } from '@reduxjs/toolkit'

export const openAddUserSlice = createSlice({
  name: 'openAddUser',
  initialState: {
    value: false,
  },
  reducers: {
    setOpenAddUser: (state) => {
      state.value = true
    },
  },
})

export const { setOpenAddUser } = openAddUserSlice.actions

export default openAddUserSlice.reducer
