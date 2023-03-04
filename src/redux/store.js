import { configureStore } from '@reduxjs/toolkit';

import mobileOpenReducer from './slices/mobileOpenSlice';
import openEditDialogReducer from './slices/openEditDialogSlice';

export const store = configureStore({
  reducer: {
    mobileOpenReducer: mobileOpenReducer,
    openEditDialogReducer: openEditDialogReducer,
  },
});
