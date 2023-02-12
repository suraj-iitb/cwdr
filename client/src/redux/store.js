import { configureStore } from '@reduxjs/toolkit';

import mobileOpenReducer from './slices/mobileOpenSlice';

export const store = configureStore({
  reducer: {
    mobileOpenReducer: mobileOpenReducer,
  },
});
