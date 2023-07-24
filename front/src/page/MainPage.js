// import AuthTemplate from '../components/auth/AuthTemplate';
// import AuthForm from '../components/auth/AuthForm';
import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import Button from '../components/common/Button';
import Input from "../components/common/Input";
import styled from 'styled-components';

function Dropdown() {

  return (
    <>
      <div><Link to="/mypage">마이페이지</Link></div>
      {/* <li>마이페이지</li> */}
      <div><Link to="/login">로그아웃</Link></div>
      {/* <li>로그아웃</li> */}
    </>
  );
}

const GameCreateButton = styled(Button)`
  margin-top: 1rem;
`;

const StyledInput = styled(Input)``;


const MainPage = (props) => {
  const [view, setView] = useState(false); 

  return (
    <>
      <ul onClick={() => {setView(!view)}}>
        닉네임 {" "}
        {view && <Dropdown />}
      </ul>
      <h1>두뇌 풀 가동 메인 페이지</h1>
      <form>
          <StyledInput autoComplete="code" name="code" placeholder="입장 코드" />
          <GameCreateButton>방 만들기</GameCreateButton>
      </form>
    </>
    
  );
};

export default MainPage;