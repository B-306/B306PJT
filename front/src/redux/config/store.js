import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../modules/authSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';


// config 작성
const persistConfig = {
  key: "root", // localStorage key 
  storage, // localStorage
  whitelist: ["auth"], // target (reducer name)
}

const reducers = combineReducers({
  auth: authReducer
});

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  // {
  //   auth: authReducer,
  //   // Add other reducers here if you have any
  // },
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const persistor = persistStore(store);

export default store;