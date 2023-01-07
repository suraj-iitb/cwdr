import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './redux';

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
