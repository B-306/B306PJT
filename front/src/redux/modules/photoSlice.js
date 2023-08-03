// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { encodeState } from '../../components/common/CodedState'

const initialState = {
  photoUrl: null,
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    setPhoto: (state, action) => {
      // console.dir(action.payload);
      state.photoUrl = encodeState(action.payload.photoUrl);
    },
    clearAuthData: (state) => {
      state.photoUrl = null;
    },
  },
});

export const { setPhoto, clearAuthData } = photoSlice.actions;
export default photoSlice.reducer;