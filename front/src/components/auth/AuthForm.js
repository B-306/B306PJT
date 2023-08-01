import React, {useState} from "react";
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Button from '../common/Button';
import Input from "../common/Input";
import palette from "../../lib/styles/palette";
import axios from "axios";
import Logout from "./Logout";
import { useDispatch } from 'react-redux';
import { setTokens, setUserData } from '../../redux/modules/authSlice';

const AuthFormBlock = styled.div`
    h3 {
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    }
`;

const StyledInput = styled(Input)``;

const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
        color: $'#868e96';
        text-decoration: underline;
        &:hover {
            color: $'#212529';
        }
    }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
    signup: '회원가입',
    login: '로그인',
    modify: '회원정보 수정',
  };

  
  const AuthForm = ({ type }) => {
    const text = textMap[type];
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    
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
          // 회원가입 요청 보내기
          const response = await axios.post('/user/signup', {
            userName : name,
            userPassword : password,
            userEmail : email,
          });
          
          // 회원가입이 성공하면 로그인 페이지로 이동하거나 다른 동작 수행
          // 예시: 페이지 리디렉션
          console.log(response.data)
          console.log('회원가입 성공')
          window.location.href = '/login'; // 로그인 페이지로 리디렉션
          
        } catch (error) {
          console.error('실패:', error);
          alert('이미 가입된 이메일입니다.')
          // 회원가입 실패 처리를 원하는 경우 적절한 방법으로 처리
        }} else if (type === 'login') {
          try {
          // 로그인 요청 보내기
          const response = await axios.post('/user/login', {
            userEmail : email,
            userPassword : password,
          });
          console.dir(response.data);
          // 로그인 성공 시 accessToken을 localStorage에 저장
          localStorage.setItem("accessToken", response.data.accessToken);
          // localStorage.setItem("refreshToken", response.data.refreshToken);
          // localStorage.setItem("userName", response.data.userName);
          // localStorage.setItem("userEmail", email);
          dispatch(setTokens({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }));
          dispatch(setUserData({ userName: response.data.userName, userEmail: email }));
          
          // 로그인 성공 시 처리 로직
          console.log("로그인 성공!");
          // 07.27 오전 10:41분 작성 이름 확
          console.log(name);
  
          // 로그인이 성공하면 메인 페이지로 이동하거나 다른 동작 수행
          // 예시: 페이지 리디렉션
          window.location.href = '/'; // 메인 페이지로 리디렉션
          // console.log("저장된 토큰:", localStorage.getItem("jwtToken"));
        } catch (error) {
          console.error('실패:', error);
          alert('이메일과 비밀번호를 확인해 주세요.')
          // 로그인 실패 처리를 원하는 경우 적절한 방법으로 처리
        }} else if (type === 'modify') {
          // 비밀번호와 비밀번호 확인이 일치하는지 확인
          if (password !== passwordConfirm) {
            console.error('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            alert('비밀번호 일치 확인해주세요');
            return; // 일치하지 않으면 함수 종료
          }
          const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
          if (!passwordRegex.test(password)) {
            alert('유효한 비밀번호(영문, 숫자, 특수기호 조합으로 8자리 이상)를 입력해주세요.');
            return;
          }
          // 회원가입 요청 보내기
          try {
            // 회원정보 수정 요청 보내기
            const response = await axios.patch('/user/modify', {
              userName: name,
              userPassword: password,
              userProfile: null,
            }, {
              headers: {
                'accessToken': `${localStorage.getItem("accessToken")}`, // JWT 토큰을 헤더에 포함하여 보냅니다.
              },
            });
        
            // 회원정보 수정이 성공하면 메인 페이지로 이동하거나 다른 동작 수행
            // 예시: 페이지 리디렉션
            console.log(response.data);
            console.log("회원정보 수정 성공!");
            // window.location.href = '/'; // 메인 페이지로 리디렉션
            Logout();
            alert('회원정보 수정이 완료되었습니다. 다시 로그인해 주세요.');
          } catch (error) {
            console.error('회원정보 수정 실패:', error);
            // 회원정보 수정 실패 처리를 원하는 경우 적절한 방법으로 처리
          }
        }
      } catch (error) {
        console.error('실패:', error);
        alert('예상치 못한 오류가 발생하였습니다.')
        // 회원가입 실패 처리를 원하는 경우 적절한 방법으로 처리
      }
    };


    const handleButtonClick = (e) => {
      e.preventDefault(); // 이벤트 객체를 받아온 후 preventDefault 호출
      console.log('handleButtonClick 실행 \n')
      // type에 따라서 다른 동작 수행
      handleSubmit();
    };

    return (
      <AuthFormBlock>
        <h3>{text}</h3>
        <form onSubmit={handleSubmit}>
          {type !== 'modify' && (
            <StyledInput 
              autoComplete="username"
              name="username" 
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          {type !== 'login' && (
            <StyledInput
              // autoComplete="newname"
              name="name"
              placeholder="이름"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <StyledInput 
            autoComplete="new-password" 
            name="password"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            />
            {type !== 'login' && (
                <StyledInput
                    autoComplete="new-password"
                    name="passwordConfirm"
                    placeholder="비밀번호 확인"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)
                    }
                />
            )}
            <ButtonWithMarginTop cyan fullWidth style={{ marginTop: '1rem' }} onClick={(e) => handleButtonClick(e)}>
              {text}
            </ButtonWithMarginTop>
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