import { createSlice } from "@reduxjs/toolkit";

export const openEditFieldWorkerDialogSlice = createSlice({
  name: "openEditFieldWorkerDialog",
  initialState: {
    value: false,
  },
  reducers: {
    setOpenEditFieldWorkerDialog: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setOpenEditFieldWorkerDialog } =
  openEditFieldWorkerDialogSlice.actions;

export default openEditFieldWorkerDialogSlice.reducer;
