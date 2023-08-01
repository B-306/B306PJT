import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if you have any
  },
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;