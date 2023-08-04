// mainPage.js
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import Button from '../components/common/Button';
import Input from "../components/common/Input";
import styled from 'styled-components';
import Logout from '../components/auth/Logout';
// import UserInfo from '../components/auth/UserInfo'
import { checkLoginStatus } from '../redux/config/AuthMiddleware'
import GetDecodedState from '../components/common/CodedState';
import gamelogoImage from '../assets/images/bfo_logo.png';

const handleButtonClick = (e) => {
  e.preventDefault(); // 이벤트 객체를 받아온 후 preventDefault 호출
  return(
    Logout()
  )
};


function Dropdown() {
  // const userEmail = localStorage.getItem("userEmail")
  const decodedState = GetDecodedState();
  const { accessToken, refreshToken, userName, userEmail } = decodedState;

  return (
    <>
      <div><Link to={`/${userEmail}/mypage`}>마이페이지</Link></div>
      {/* <li>마이페이지</li> */}
      <Button onClick={(e) => handleButtonClick(e)}>로그아웃</Button>
      {/* <li>로그아웃</li> */}
    </>
  );
}


const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 100vh;
  // overflow: hidden; /* 스크롤바 없애기 */
`;

const GameCreateButton = styled(Button)`
  margin-top: 1rem;
  margin-right: 1rem; 
`;

const StyledInput = styled(Input)``;

const MainPageTitle = styled.h1`
  text-align: center;
  color: white;
  font-family: 'JSArirang'
`;

const UserProfile = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  text-decoration: underline;
  color: white;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;
  background-color: white;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoImage = styled.img`
  width: 280px; /* 원하는 로고 이미지 크기로 설정 */
  margin-top: 5rem
  position: absolute;
  // bottom: 150px;
  // left: 50%;
  // transform: translateX(-50%);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  align-items: center;
  width: 500px
  // margin-top: 150px;
`;


const MainPage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoginStatus()); // checkLoginStatus 액션을 디스패치합니다.
  }, [dispatch]);

  // GetDecodedState 컴포넌트를 호출하여 반환된 객체 받기
  const decodedState = GetDecodedState();
  const jwtToken = localStorage.getItem('accessToken');
  if (!jwtToken) {
    window.location.href = '/login';
  }
  // 반환된 객체에서 원하는 값을 각각 변수에 저장
  const { accessToken, refreshToken, userName, userEmail } = decodedState;
  const [view, setView] = useState(false);

  return (
    <CenteredContainer>
      <LogoImage src={gamelogoImage} alt="Logo" />
      <UserProfile onClick={() => setView(!view)}>{userName}</UserProfile>
      {view && (
        <DropdownMenu>
          <div>
            <Link to={`/${userEmail}/mypage`}>마이페이지</Link>
          </div>
          <Button onClick={(e) => handleButtonClick(e)}>로그아웃</Button>
        </DropdownMenu>
      )}
      {/* <span
        style={{ textDecoration: 'underline', cursor: 'pointer' }}
        onClick={() => setView(!view)}
      > */}
        {/* {setUserData.userName} */}
        {/* {userName} */}
      {/* </span> */}
      {/* {view && <Dropdown />} */}
      <StyledForm>
        <MainPageTitle>두뇌 풀 가동</MainPageTitle>
        <StyledInput autoComplete="code" name="code" placeholder="입장 코드" />
        <GameCreateButton><Link to={`/${userEmail}/gamecreate`}>방 만들기</Link></GameCreateButton>
        <GameCreateButton><Link to={`/game`}>게임방 테스트</Link></GameCreateButton>  
        <GameCreateButton><Link to={`/game/1`}>게임방 테스트 방번호 1번</Link></GameCreateButton>
        <GameCreateButton><Link to={`/game/2`}>게임방 테스트 방번호 2번</Link></GameCreateButton>
      </StyledForm>
    </CenteredContainer>
  );
};

export default MainPage;