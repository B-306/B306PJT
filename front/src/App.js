// // import logo from './logo.svg';
// // import './App.css';

// import { useState } from 'react';
// import axios from 'axios';


// export default function App() {
  
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [mode, setMode] = useState('LOGIN'); // 초기 모드는 로그인

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/login', {
//         username,
//         password,
//       });
//       console.log(response.data);
//       setUsername('');
//       setPassword('');
//       // 로그인 성공 시 모드 변경
//       setMode('WELCOME');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
    
//     // 이메일 유효성 검사
//     const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,3}$/;
//     if (!emailRegex.test(email)) {
//       alert('유효한 이메일 주소를 입력해주세요.');
//       return;
//     }

//     // 비밀번호 유효성 검사
//     const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
//     if (!passwordRegex.test(password)) {
//       alert('유효한 비밀번호(영문, 숫자, 특수기호 조합으로 8자리 이상)를 입력해주세요.');
//       return;
//     }
    
//     try {
//       const response = await axios.post('http://localhost:3000/signup', {
//         email,
//         username,
//         password,
//       });
//       console.log(response.data);
//       setEmail('');
//       setUsername('');
//       setPassword('');
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   const renderForm = () => {
//     if (mode === 'LOGIN') {
//       return (
//         <form onSubmit={handleLogin}>
//           <h2>로그인</h2>
//           <div>
//             <label htmlFor="username">아이디:</label>
//             <input
//               type="text"
//               id="username"
//               placeholder="아이디"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="password">비밀번호:</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="비밀번호"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button type="submit">로그인</button>
//           <p>
//             계정이 없으신가요?{' '}
//             <button type="button" onClick={() => setMode('SIGNUP')}>
//               회원가입
//             </button>
//           </p>
//         </form>
//       );
//     } else if (mode === 'SIGNUP') {
//       return (
//         <form onSubmit={handleSignup}>
//           <h2>회원가입</h2>
//           <div>
//             <label htmlFor="email">E-mail : </label>
//             <input
//               type="text"
//               placeholder="E-mail"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="password">비밀번호 : </label>
//             <input
//               type="password"
//               placeholder="비밀번호"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="username">사용자명 : </label>
//             <input
//               type="text"
//               placeholder="이름"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <button type="submit">회원가입</button>
//           <p>
//             이미 계정이 있으신가요?{' '}
//             <button type="button" onClick={() => setMode('LOGIN')}>
//               로그인
//             </button>
//           </p>
//         </form>
//       );
//     }
//     // welcome 모드
//       return (
//         <div>
//           <h2>환영합니다!</h2>
//           <p>로그인에 성공하셨습니다.</p>
//           <button type="button" onClick={() => setMode('LOGIN')}>
//             로그아웃
//           </button>
//         </div>
//       );
//   };
    
//   return (
//     <div className="App">
//       {renderForm()}
//     </div>
//   );
// }



import React from 'react';
import LoginPage from './page/LoginPage';
import SignupPage from './page/SignupPage';
import MainPage from './page/MainPage';
import MyPage from './page/MyPage';
// import MyPage from './user/MyPage';
// import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/@:username" element={<MainPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/@:username/:mypage" element={<MyPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
};

export default App;