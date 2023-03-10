import { createSlice } from "@reduxjs/toolkit";

export const openEditUserDialogSlice = createSlice({
  name: "openEditUserDialog",
  initialState: {
    value: false,
  },
  reducers: {
    setOpenEditUserDialog: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setOpenEditUserDialog } = openEditUserDialogSlice.actions;

export default openEditUserDialogSlice.reducer;
