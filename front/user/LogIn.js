// //LogIn.js
// import React, { useState } from 'react';
// import Input from './Input';

// /*생략*/
// const [id, setId] = React.useState("");
// const [pwd, setPwd] = React.useState("");

// /*생략*/

// const login = () => {
// //입력 값 정합성 체크 후 login API 요청
//     if (id === "" || pwd === "") {
//       window.alert("아이디와 비밀번호를 입력해주세요.");
//       return;
//     }
//     if (!emailCheck(id)) {
//       window.alert("이메일 형식이 맞지 않습니다.");
//     }
//     dispatch(userActions.loginDB(id, pwd));
//   };

// /*생략*/

//  <Input
//             _onChange={(e) => {
//               setId(e.target.value);
//             }}
//             width="380px"
//             height="45px"
//             placeholder="아이디"
//           />
//           <Input
//             _onChange={(e) => {
//               setPwd(e.target.value);
//             }}
//             width="380px"
//             height="45px"
//             placeholder="비밀번호"
//             type="password"
//           />

//  <Input
//             _onChange={(e) => {
//               setId(e.target.value);
//             }}
//             width="380px"
//             height="45px"
//             placeholder="아이디"
//           />
//           <Input
//             _onChange={(e) => {
//               setPwd(e.target.value);
//             }}
//             width="380px"
//             height="45px"
//             placeholder="비밀번호"
//             type="password"
//           />

import React, { useState } from 'react';
import Signup from './signUp';
import axios from 'axios';
import AuthForm from '../components/auth/AuthForm';
import AuthTemplate from '../components/auth/AuthTemplate';

const LoginPage = () => {
  return (
    <AuthTemplate>
      <AuthForm type="login" />
    </AuthTemplate>
  )
}



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });

      console.log(response.data); // Handle the response data

      // Reset the form
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p>
          계정이 없으신가요?{' '}
          <button type="button" onClick={() => <Signup/>}>
               회원가입
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;