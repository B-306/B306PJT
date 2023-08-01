// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  refreshToken: null,
  userName: null,
  // userEmail: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      // console.dir(action.payload);
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setUserData: (state, action) => {
      // console.dir(action.payload);
      state.userName = action.payload.userName;
      // state.userEmail = action.payload.userEmail;
    },
    clearAuthData: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.userName = null;
      // state.userEmail = null;
    },
  },
});

export const { setTokens, setUserData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;