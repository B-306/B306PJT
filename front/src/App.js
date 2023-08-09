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
import TemplateUploadPage from './page/TemplateUploadPage';

const App = () => {
  return (
    <Routes>
      <Route path="/api3/login" element={<LoginPage />} />
      <Route path="/api3/signup" element={<SignupPage />} />
      <Route path="/game/:string" element={<VideoRoomComponent />} />
      {/* <Route path="/game/1" element={<VideoRoomComponent />} /> */}
      <Route path="/api3/@:useremail" element={<MainPage />} />
      <Route path="/api3/" element={<MainPage />} />
      <Route path="/api3/:useremail/mypage" element={<MyPage />} />
      {/* <Route path="/mypage" element={<MyPage />} /> */}
      {/* <Route path="/gamecreate" element={<GameCreate />} /> */}
      <Route path="/api3/:useremail/gamecreate" element={<GameCreate />} />
      <Route path="/api3/templatecreate" element={<TemplateUploadPage />} />
    </Routes>
  );
};

export default App;