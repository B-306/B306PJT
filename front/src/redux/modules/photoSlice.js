// photoSlice.js
import { createSlice } from '@reduxjs/toolkit';
// import { encodeState } from '../../components/common/CodedState'

const initialState = {
  photoUrl: null,
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    setPhoto: (state, action) => {
      // console.dir(action.payload);
      // state.photoUrl = encodeState(action.payload.photoUrl);
      // console.log(action);
      state.photoUrl = action.payload;
      // alert("test")
    },
    clearPhotoData: (state) => {
      state.photoUrl = null;
    },
  },
});

export const { setPhoto, clearPhotoData } = photoSlice.actions;
export default photoSlice.reducer;