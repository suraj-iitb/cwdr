import { createSlice } from '@reduxjs/toolkit'

export const openEditDialogSlice = createSlice({
  name: 'openEditDialog',
  initialState: {
    value: false,
  },
  reducers: {
    setOpenEditDialog: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setOpenEditDialog } = openEditDialogSlice.actions

export default openEditDialogSlice.reducer
