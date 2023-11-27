import React from 'react';
import LoginPage from './page/LoginPage';
import SignupPage from './page/SignupPage';
import MainPage from './page/MainPage';
import MyPage from './page/MyPage';
import GameCreate from './page/GameCreate';
import { Route, Routes, Navigate } from 'react-router-dom';
import VideoRoomComponent from './components/VideoRoomComponent';

const App = () => {
  const accessToken = localStorage.getItem('accessToken');

  return (
    <Routes>
      <Route path="/login" element={accessToken ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/signup" element={accessToken ? <Navigate to="/" /> : <SignupPage />} />
      <Route path="/game/:string" element={<VideoRoomComponent />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/:useremail/mypage" element={accessToken ? <MyPage /> : <Navigate to="/login" />} />
      <Route path="/:useremail/gamecreate" element={accessToken ? <GameCreate /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;