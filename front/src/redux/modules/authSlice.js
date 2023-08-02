// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { encodeState } from '../../components/common/CodedState'

const initialState = {
  accessToken: null,
  refreshToken: null,
  userName: null,
  userEmail: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      // console.dir(action.payload);
      state.accessToken = encodeState(action.payload.accessToken);
      state.refreshToken = encodeState(action.payload.refreshToken);
    },
    setUserData: (state, action) => {
      // console.dir(action.payload);
      state.userName = encodeState(action.payload.userName);
      state.userEmail = encodeState(action.payload.userEmail);
    },
    clearAuthData: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.userName = null;
      state.userEmail = null;
    },
  },
});

export const { setTokens, setUserData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;