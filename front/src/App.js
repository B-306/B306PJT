import React from 'react';
import LoginPage from './page/LoginPage';
import SignupPage from './page/SignupPage';
import MainPage from './page/MainPage';
import MyPage from './page/MyPage';
import GameCreate from './page/GameCreate';
// import MyPage from './user/MyPage';
// import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import VideoRoomComponent from './components/VideoRoomComponent';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/game/:roomId" element={<VideoRoomComponent />} />
      {/* <Route path="/game/1" element={<VideoRoomComponent />} />
      <Route path="/game/2" element={<VideoRoomComponent />} /> */}
      <Route path="/@:useremail" element={<MainPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/:useremail/mypage" element={<MyPage />} />
      {/* <Route path="/mypage" element={<MyPage />} /> */}
      {/* <Route path="/gamecreate" element={<GameCreate />} /> */}
      <Route path="/:useremail/gamecreate" element={<GameCreate />} />
    </Routes>
  );
};

export default App;