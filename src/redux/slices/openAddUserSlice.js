import { createSlice } from '@reduxjs/toolkit'

export const openAddUserSlice = createSlice({
  name: 'openAddUser',
  initialState: {
    value: false,
  },
  reducers: {
    setOpenAddUser: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setOpenAddUser } = openAddUserSlice.actions

export default openAddUserSlice.reducer
