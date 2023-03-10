import { configureStore } from '@reduxjs/toolkit';

import mobileOpenReducer from './slices/mobileOpenSlice';
import openEditUsertDialogReducer from './slices/openEditUserDialogSlice';
import openEditFieldWorkerDialogReducer from './slices/openEditFieldWorkerDialogSlice';

export const store = configureStore({
  reducer: {
    mobileOpenReducer: mobileOpenReducer,
    openEditUsertDialogReducer: openEditUsertDialogReducer,
    openEditFieldWorkerDialogReducer: openEditFieldWorkerDialogReducer,
  },
});
