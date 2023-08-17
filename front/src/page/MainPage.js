// mainPage.js
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
// import Button from '../components/common/Button';
import { Button } from 'primereact/button';
import Input from "../components/common/Input";
import styled, { keyframes } from 'styled-components';
import Logout from '../components/auth/Logout';
// import UserInfo from '../components/auth/UserInfo'
import { checkLoginStatus } from '../redux/config/AuthMiddleware'
import GetDecodedState from '../components/common/CodedState';
import gamelogoImage from '../assets/images/bfo_logo.png';

//primereact
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Tooltip } from '@mui/material';

const handleButtonClick = (e) => {
  e.preventDefault(); // 이벤트 객체를 받아온 후 preventDefault 호출
  return(
    Logout()
  )
};


// function Dropdown() {
//   // const userEmail = localStorage.getItem("userEmail")
//   const decodedState = GetDecodedState();
//   const { accessToken, refreshToken, userName, userEmail } = decodedState;

//   return (
//     <>
//       <div><Link to={`/${userEmail}/mypage`}>마이페이지</Link></div>
//       {/* <li>마이페이지</li> */}
//       <Button onClick={(e) => handleButtonClick(e)}>로그아웃</Button>
//       {/* <li>로그아웃</li> */}
//     </>
//   );
// }


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
  font-family: Ftstardust;
  margin-top: 1rem;
  margin-right: 1rem; 
`;

const StyledInput = styled(Input)``;

const StyledButton = styled.button`
  font-family: Ftstardust;
  background-color: #ff5733;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #d63031; /* 호버 시 배경색 변경 */
    color: #fff; /* 호버 시 글씨 색 변경 */
  }
`;

const MainPageTitle = styled.h1`
  text-align: center;
  color: white;
  font-family: 'Ftstardust'
`;

const UserProfile = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  // text-decoration: underline;
  text-decoration: none;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-right: 20px;
  min-width: 130px !important;
`;

const ProfileImage = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50%; /* 이미지를 원형으로 꾸미는 속성 */
  margin-bottom: 15px; /* 이미지 아래 여백 */
  margin: aut
`;

const DropdownMenu = styled.div`
  // position: absolute;
  top: 50px;
  right: 20px;
  background-color: white;
  border-radius: 4px;
  margin-top: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space:nowrap;
`;

const rotateAnimation = keyframes`
0%, 100% {
  transform: translateY(2px) rotate(-3deg);
}
50% {
  transform: translateY(-2px) rotate(3deg);
}
`;

const LogoImage = styled.img`
  width: 280px; /* 원하는 로고 이미지 크기로 설정 */
  margin-top: 5rem
  position: absolute;
  // bottom: 150px;
  // left: 50%;
  // transform: translateX(-50%);
  animation: ${rotateAnimation} 5s linear infinite; /* Apply the rotation animation */
`;

const StyledButtonLink = styled(Link)`
  display: inline-block;
  background-color: #5ec9f2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #3498db;
  }
`;


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  align-items: center;
  width: 500px
  // margin-top: 150px;
`;


const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useHistory 훅을 추가

  useEffect(() => {
    dispatch(checkLoginStatus()); // checkLoginStatus 액션을 디스패치합니다.
  }, [dispatch]);

  // GetDecodedState 컴포넌트를 호출하여 반환된 객체 받기
  const decodedState = GetDecodedState();
  const jwtToken = localStorage.getItem('accessToken');
  if (!jwtToken) {
    console.log('토큰없음 테스트 2023-08-09 13:55')
    
    window.location.href = '/login';
  }
  // 반환된 객체에서 원하는 값을 각각 변수에 저장
  const { userName, userEmail } = decodedState;
  const [view, setView] = useState(false);
  const [code, setCode] = useState('');
  const handleCodeSubmit = () => {
    const url = `/game/${code}`;
    localStorage.setItem('roomCode', code);
    navigate(url);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCodeSubmit();
    }
  };

  const photoUrl = useSelector((state) => state.photo.photoUrl);

  return (
    <CenteredContainer>
      <LogoImage src={gamelogoImage} alt="Logo" />
      <UserProfile>
        {/* <ProfileImage  src={photoUrl} alt="Profile" /> */}
        <Tooltip title="마이페이지, 로그아웃!" placement="left-start">
          <ProfileImage onClick={() => setView(!view)} src={photoUrl} alt="Profile" />
          </Tooltip>
          <Tooltip title="마이페이지, 로그아웃!" placement="left-start">
          <span onClick={() => setView(!view)} style={{ fontSize: '35px', cursor: 'pointer', fontWeight: 'bold' }}>{userName}</span>
        </Tooltip> 
        {view && (
          <DropdownMenu>
            <div style={{display: 'flex', flexDirection: 'column' }}>
              <StyledButtonLink to={`/${userEmail}/mypage`}>마이페이지</StyledButtonLink>
              <StyledButton onClick={(e) => {handleButtonClick(e); navigate('/login');}}>로그아웃</StyledButton>
            </div>
          </DropdownMenu>
        )}
      </UserProfile>
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
        <Tooltip title="코드를 입력하고 Enter를 누르면 게임에 입장합니다!" placement="right-start">
        <StyledInput
          autoComplete="code"
          name="code"
          placeholder="입장 코드"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          />
        </Tooltip>  
          <GameCreateButton onClick={() => navigate(`/${userEmail}/gamecreate`)} >방 만들기</GameCreateButton>
        {/* <GameCreateButton><Link to={`/game`}>게임방 테스트</Link></GameCreateButton>   */}
        <GameCreateButton onClick={()=>navigate(`/game/1`)} >게임방 테스트 방번호 1번</GameCreateButton>
        <GameCreateButton><Link to={`/game/2`}>게임방 테스트 방번호 2번</Link></GameCreateButton>
        {/* <GameCreateButton><Link to={`/templatecreate`}>템플릿 업로드 페이지</Link></GameCreateButton> */}
        <GameCreateButton onClick={()=>navigate(`/templatecreate`)} >템플릿 업로드</GameCreateButton>
      </StyledForm>
    </CenteredContainer>
  );
};

export default MainPage;