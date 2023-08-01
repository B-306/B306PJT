// authMiddleware.js
import { setTokens, setUserData, clearAuthData } from "../modules/authSlice";

export const checkLoginStatus = () => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.accessToken;
  const refreshToken= state.auth.refreshToken;
  const userEmail = state.auth.userEmail;
  const userName = state.auth.userName;
  console.dir(state.auth);
  if (!accessToken) {
    // 로그인 상태가 아니므로 리덕스 스토어 상태를 초기화합니다.
    console.log('1번 초기화')
    dispatch(clearAuthData());
  } else {
    try {
      // 서버에 토큰을 전송하여 유효성을 검사하는 대신, 여기서는 유효성 검사를 생략합니다.
      // 유효성 검사 로직이 필요한 경우 해당 부분을 추가하시면 됩니다.
      
      // 토큰이 유효한 경우 유저 데이터를 리덕스 스토어에 저장합니다.
      // dispatch(setUserData({ userEmail }));
      console.log('초기화 안함')
      dispatch(setTokens({ accessToken: accessToken, refreshToken: refreshToken }));
      dispatch(setUserData({ userName: userName, userEmail: userEmail }));
    } catch (error) {
      // 토큰이 유효하지 않은 경우 로그인 상태를 초기화합니다.
      console.log('2번 초기화')
      dispatch(clearAuthData());
    }
  }
};