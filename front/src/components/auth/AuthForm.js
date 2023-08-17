import React, { useState } from "react";
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import Input from "../common/Input";
import palette from "../../lib/styles/palette";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setTokens, setUserData } from '../../redux/modules/authSlice';
import { setPhoto } from '../../redux/modules/photoSlice';
// import tokenHttp from '../api/tokenHttp';

const AuthFormBlock = styled.div`
    h3 {
        margin: 0;
        // color: ${palette.gray[8]};
        color : white;
        margin-bottom: 1rem;
    }
`;

const StyledInput = styled(Input)``;

const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
        // color: $'#868e96';
        color: white;
        text-decoration: underline;
        &:hover {
            color: $'#212529';
        }
    }
`;

const ButtonWithMarginTop = styled(Button)`
  display: flex;
  font-size: 12px;      
  padding: 6px 6px;
  text-align: center;
  justify-content: center;
  font-family: 'Ftstardust';
  width : 90px;
  hight : 70px;
`;

const textMap = {
  signup: '회원가입',
  login: '로그인',
  modify: '',
};


const AuthForm = ({ type}) => {

  const text = textMap[type];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [emailConfirm, setEmailConfirm] = useState(false);
  const [view, setView] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log('handleSubmit 실행 \n')

    try {
      if (type === 'signup') {
        try {
          if (!name) {
            console.error('이름을 입력하지 않았습니다.');
            alert('이름을 입력해 주세요.');
            return; // 일치하지 않으면 함수 종료
          }
          // 회원가입 시 비밀번호와 비밀번호 확인이 일치하는지 확인
          if (password !== passwordConfirm) {
            console.error('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            alert('비밀번호 일치 확인해주세요');
            return; // 일치하지 않으면 함수 종료
          }
          const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,3}$/;
          if (!emailRegex.test(email)) {
            alert('유효한 이메일 주소를 입력해주세요.');
            return;
          }
          const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
          if (!passwordRegex.test(password)) {
            alert('유효한 비밀번호(영문, 숫자, 특수기호 조합으로 8자리 이상)를 입력해주세요.');
            return;
          }

          if (!emailConfirm) {
            alert('email 인증을 해주세요!');
            return;
          }

          // 회원가입 요청 보내기
          const response = await axios.post('https://i9b306.q.ssafy.io/api1/user/signup', {
            userName: name,
            userPassword: password,
            userEmail: email,
            // emailConfirm: emailConfirm
          });

          // 회원가입이 성공하면 로그인 페이지로 이동하거나 다른 동작 수행
          // 예시: 페이지 리디렉션
          console.log(response.data)
          console.log('회원가입 성공')
          setTimeout(function () {
            const url = `/login`;
            navigate(url);
            console.log('로그인 페이지 리다이렉트');
          }, 1);
        } catch (error) {
          console.error('실패:', error);
          alert('이미 가입된 이메일입니다.')
          // 회원가입 실패 처리를 원하는 경우 적절한 방법으로 처리
        }
      }
      else if (type === 'login') {
        try {
          // 로그인 요청 보내기
          const response = await axios.post('https://i9b306.q.ssafy.io/api1/user/login', {
            userEmail: email,
            userPassword: password,
          });
          console.dir(response.data);
          // 로그인 성공 시 accessToken을 localStorage에 저장
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          // localStorage.setItem("userName", response.data.userName);
          // localStorage.setItem("userEmail", email);
          dispatch(setTokens({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }));
          dispatch(setUserData({ userName: response.data.userName, userEmail: email }));
          const photoUrl = response.data.userProfile
          dispatch(setPhoto(photoUrl));
          // 로그인 성공 시 처리 로직
          console.log("로그인 성공!");


          // 로그인이 성공하면 메인 페이지로 이동하거나 다른 동작 수행
          // 예시: 페이지 리디렉션
          window.location.href = '/'; // 메인 페이지로 리디렉션

        } catch (error) {
          console.error('실패:', error);
          alert('이메일과 비밀번호를 확인해 주세요.')
          // 로그인 실패 처리를 원하는 경우 적절한 방법으로 처리
        }
      }
    } catch (error) {

    }
  };


  const handleButtonClick = (e) => {
    e.preventDefault(); // 이벤트 객체를 받아온 후 preventDefault 호출
    console.log('handleButtonClick 실행 \n')
    // type에 따라서 다른 동작 수행
    handleSubmit();
  };

  const emailSubmit = async () => {
    // e.preventDefault();
    console.log('eamilSubmit 실행 \n')
    console.log(email)

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,3}$/;
    if (!emailRegex.test(email)) {
      alert('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    try {
      // e메일 인증보내기
      const response = await axios.post('https://i9b306.q.ssafy.io/api1/user/email', {
        email: email,
      });
      console.log(response.data)
      setView(true)
      alert('email 인증 코드를 보냈습니다. 5분 안에 인증코드를 입력해주세요!')
    } catch (error) {
      console.error('실패:', error);
      alert('잘 못된 이메일입니다. 확인해 주세요.')
      // 로그인 실패 처리를 원하는 경우 적절한 방법으로 처리
    }
  }


  const emailButtonClick = (e) => {
    e.preventDefault(); // 이벤트 객체를 받아온 후 preventDefault 호출
    console.log('emailButtonClick 실행 \n')
    // type에 따라서 다른 동작 수행
    emailSubmit();
  };

  const emailCheck = async () => {
    // e.preventDefault();
    console.log('eamilCheck 실행 \n')
    try {
      // e메일 검증
      const response = await axios.post('https://i9b306.q.ssafy.io/api1/user/email/auth', {
        authCode: authCode,
        email: email,
      });
      console.log(response.data)
      alert('Email 검증이 완료되었습니다.')
      setEmailConfirm(true);
    } catch (error) {
      console.error('실패:', error);
      alert('잘 못된 인증코드 입니다. 확인해 주세요.')
      // 로그인 실패 처리를 원하는 경우 적절한 방법으로 처리
    }
  }


  const emailCheckClick = (e) => {
    e.preventDefault(); // 이벤트 객체를 받아온 후 preventDefault 호출
    console.log('emailcheckButtonClick 실행 \n')
    // type에 따라서 다른 동작 수행
    emailCheck();
  };

  return (

    <AuthFormBlock style={{ display: "flex", flexDirection: "column" }}>
      <h3>{text}</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'space-between', flexDirection: "column" }}>
        {/* <EmailForm> */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {type !== 'modify' && (
            <StyledInput
              autoComplete="username"
              name="username"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginRight: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center' }} // 이메일 입력(input) 칸 오른쪽 여백
            />
          )}
          {type !== 'login' && type !== 'modify' && (
            <ButtonWithMarginTop onClick={(e) => emailButtonClick(e)} style={{ marginRight: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}
            >
              인증
            </ButtonWithMarginTop>
          )}
        </div>
        {type !== 'login' && type !== 'modify' && view && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StyledInput
              name="authCode"
              placeholder="이메일 인증번호 입력"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)
              }
              style={{ marginRight: '10px', marginBottom: '10px' }} // 오른쪽 여백
            />
            <ButtonWithMarginTop onClick={(e) => emailCheckClick(e)} style={{ marginRight: '10px', marginBottom: '10px' }}
            >
              인증 확인
            </ButtonWithMarginTop>
          </div>
        )}
        {/* </EmailForm> */}
        <div style={{ display: 'flex' }}>
          {type !== 'login' && (
            <StyledInput
              // autoComplete="newname"
              name="name"
              placeholder="이름"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginRight: '10px', marginBottom: '10px' }}
            />
          )}
        </div>
        <div style={{ display: 'flex' }}>
          <StyledInput
            autoComplete="new-password"
            name="password"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginRight: '10px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ display: 'flex' }}>
          {type !== 'login' && (
            <StyledInput
              autoComplete="new-password"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)
              }
              style={{ marginRight: '10px', marginBottom: '10px' }}

            />
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ButtonWithMarginTop cyan fullWidth onClick={(e) => handleButtonClick(e)}>
            {text}
          </ButtonWithMarginTop>
        </div>

      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="/signup">아직 회원이 아니신가요?</Link>
        ) : type === 'signup' ? (
          <Link to="/login">이미 가입하셨나요?</Link>
        ) : null}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;