import React, {useState} from "react";
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Button from '../common/Button';
import Input from "../common/Input";
import palette from "../../lib/styles/palette";
import axios from "axios";


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
  };

  
  const AuthForm = ({ type }) => {
    const text = textMap[type];
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmit = async (e) => {
      // e.preventDefault();
      console.log('handleSubmit 실행 \n')
  
      try {
        if (type === 'signup') {
          // 회원가입 시 비밀번호와 비밀번호 확인이 일치하는지 확인
          if (password !== passwordConfirm) {
            console.error('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
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
        } else if (type === 'login') {
          // 로그인 요청 보내기
          const response = await axios.post('/user/login', {
            userEmail : email,
            userPassword : password,
          });
  
          const jwtToken = response.data.token;
          // 예시: localStorage에 JWT 저장
          localStorage.setItem("jwtToken", jwtToken);

          // 로그인 성공 시 처리 로직
          console.log("로그인 성공!");
  
          // 로그인이 성공하면 메인 페이지로 이동하거나 다른 동작 수행
          // 예시: 페이지 리디렉션
          window.location.href = '/'; // 메인 페이지로 리디렉션
        }
      } catch (error) {
        console.error('실패:', error);
        // 회원가입 실패 처리를 원하는 경우 적절한 방법으로 처리
      }
    };

    // const handleButtonClick = () => {
    //   // type에 따라서 다른 동작 수행
    //   if (type === 'login') {
    //     handleSubmit(); // 로그인 요청 보내기
    //   } else if (type === 'signup') {
    //     handleSubmit(); // 회원가입 요청 보내기
    //   }
    // };

    const handleButtonClick = (e) => {
      e.preventDefault(); // 이벤트 객체를 받아온 후 preventDefault 호출
      console.log('handleButtonClick 실행 \n')
      // type에 따라서 다른 동작 수행
      if (type === 'login') {
        handleSubmit(); // 로그인 요청 보내기
      } else if (type === 'signup') {
        handleSubmit(); // 회원가입 요청 보내기
      }
    };

    return (
      <AuthFormBlock>
        <h3>{text}</h3>
        <form onSubmit={handleSubmit}>
          <StyledInput 
            autoComplete="username"
            name="username" 
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           />
          {type === 'signup' && (
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
            {type === 'signup' && (
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
            ) : (
                <Link to="/login">이미 가입하셨나요?</Link>
            )}
          </Footer>
        </AuthFormBlock>
      );
    };

export default AuthForm;