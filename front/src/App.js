import React from 'react';
import LoginPage from './page/LoginPage';
import SignupPage from './page/SignupPage';
import MainPage from './page/MainPage';
import MyPage from './page/MyPage';
import GameCreate from './page/GameCreate';
// import MyPage from './user/MyPage';
// import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import VideoRoomComponent from './components/VideoRoomComponent';
import TemplateUploadPage from './page/TemplateUploadPage';

const App = () => {
  const accessToken = localStorage.getItem('accessToken');

  return (
    <Routes>
      <Route path="/login" element={accessToken ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/signup" element={accessToken ? <Navigate to="/" /> : <SignupPage />} />
      <Route path="/game/:string" element={<VideoRoomComponent />} />
      {/* <Route path="/game/1" element={<VideoRoomComponent />} /> */}
      {/* <Route path="/@:useremail" element={<MainPage />} /> */}
      <Route path="/" element={<MainPage />} />
      <Route path="/:useremail/mypage" eelement={accessToken ? <MyPage /> : <Navigate to="/login" />} />
      {/* <Route path="/mypage" element={<MyPage />} /> */}
      {/* <Route path="/gamecreate" element={<GameCreate />} /> */}
      <Route path="/:useremail/gamecreate" element={accessToken ? <GameCreate /> : <Navigate to="/login" />} />
      <Route path="/templatecreate" element={accessToken ? <TemplateUploadPage /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;