import { configureStore } from '@reduxjs/toolkit';

import openAddUserReducer from './slices/openAddUserSlice';
import mobileOpenReducer from './slices/mobileOpenSlice';

export const store = configureStore({
  reducer: {
    openAddUserReducer: openAddUserReducer,
    mobileOpenReducer: mobileOpenReducer,
  },
});
