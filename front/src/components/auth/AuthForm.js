import React from "react";
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Button from '../common/Button';
import Input from "../common/Input";
import palette from "../../lib/styles/palette";


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
    return (
      <AuthFormBlock>
        <h3>{text}</h3>
        <form>
          <StyledInput autoComplete="username" name="username" placeholder="이메일" />
          <StyledInput 
            autoComplete="new-password" 
            name="password"
            placeholder="비밀번호"
            type="password" 
            />
            {type === 'signup' && (
                <StyledInput
                    autoComplete="new-password"
                    name="passwordConfirm"
                    placeholder="비밀번호 확인"
                    type="password"
                />
            )}
            <ButtonWithMarginTop cyan fullWidth style={{ marginTop: '1rem' }}>
              {text}
            </ButtonWithMarginTop>
          </form>
          <Footer>
            {type === 'login' ? (
                <Link to="/signup">회원가입</Link>
            ) : (
                <Link to="/login">로그인</Link>
            )}
          </Footer>
        </AuthFormBlock>
      );
    };

export default AuthForm;