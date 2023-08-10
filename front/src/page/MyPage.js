// import Grid from '../components/common/Grid';
import Image from '../components/common/Image';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import Input from "../components/common/Input";
import styled from 'styled-components';
// import Button from "../components/common/Button";
import axios from 'axios';
// import UserInfo from '../components/auth/UserInfo'
import PhotoUpload from '../components/auth/PhotoUpload'
import AuthForm from '../components/auth/AuthForm';
import GetDecodedState from '../components/common/CodedState';

// const ButtonWithMargin = styled(Button)`
//   margin-top: 1rem;
//   margin-bottom: 1rem;
// `;
const MypageH1 = styled.h1`
  text-align: center;
  color: white;
  font-family: 'JSArirang'
`;

// const StyledInput = styled(Input)``;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  // backdrop-filter: blur(10px);
  // min-height: 100vh;
  // overflow: hidden; /* 스크롤바 없애기 */
`;



// function Change() {
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인용 입력창 추가
//   const [profileUrl, setProfileUrl] = useState("");
//   const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 일치 여부 상태 추가

//   // 비밀번호와 비밀번호 확인 값이 일치하는지 확인하는 함수
//   const handlePasswordCheck = () => {
//     setPasswordMatch(password === confirmPassword);
//   };

  
//   return (
//     <>
//       {/* 이름 입력 필드 */}
//       <StyledInput
//         autoComplete="name"
//         name="name"
//         placeholder="이름"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       {/* 비밀번호 입력 필드 */}
//       <StyledInput
//         autoComplete="new-password"
//         name="password"
//         placeholder="비밀번호"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       {/* 비밀번호 확인 입력 필드 */}
//       <StyledInput
//         autoComplete="new-password"
//         name="confirmPassword"
//         placeholder="비밀번호 확인"
//         type="password"
//         value={confirmPassword}
//         onChange={(e) => {
//           setConfirmPassword(e.target.value);
//           setPasswordMatch(true); // 비밀번호 확인 값이 변경될 때마다 다시 일치 여부를 true로 초기화
//         }}
//       />
//       {/* 일치하지 않을 경우 경고 표시 */}
//       {!passwordMatch && <div>비밀번호가 일치하지 않습니다.</div>}
//       {/* 이미지 파일 선택 input은 이전과 동일하게 유지 */}
//       {/* <Button> */}
//         {/* <StyledInput
//           type='file'
//           placeholder="사진 변경"
//           accept='image/*'
//           // onChange={handleFileChange}
//         /> */}
//         {/* <PhotoUpload /> */}
//       {/* </Button> */}
//       <ButtonWithMargin onClick={() => {
//         handleUpdateUserInfo(name, password, profileUrl);
//       }}>
//         변경 확인
//       </ButtonWithMargin>
//     </>
//   );
// }

// const handleUpdateUserInfo = async (name, password, profileUrl) => {
//   // 수정할 회원 정보
//   // const updatedName = "새로운 이름";
//   // const updatedPassword = "";

//   console.log(name, password, profileUrl);
//   const token = localStorage.getItem("accessToken");
//   console.log(token);

//   try {
//     // 회원정보 수정 요청 보내기
//     const response = await axios.patch('/user/modify', {
//       userName: name,
//       userPassword: password,
//       userProfile: profileUrl,
//     }, {
//       headers: {
//         'accessToken': `${localStorage.getItem("accessToken")}`, // JWT 토큰을 헤더에 포함하여 보냅니다.
//       },
//     });

//     // 회원정보 수정이 성공하면 메인 페이지로 이동하거나 다른 동작 수행
//     // 예시: 페이지 리디렉션
//     console.log(response.data);
//     console.log("회원정보 수정 성공!");
//     // window.location.href = '/'; // 메인 페이지로 리디렉션
//   } catch (error) {
//     console.error('회원정보 수정 실패:', error);
//     // 회원정보 수정 실패 처리를 원하는 경우 적절한 방법으로 처리
//   }
// };
import React from 'react';

function App() {
  const filename = 'your-image-filename.jpg'; // 이미지 파일 이름
  const type = 'profile'; // 이미지 타입 (profile 또는 다른 값)

  const imageUrl = `/images/${filename}?type=${type}`; // 백엔드 엔드포인트에 요청할 URL

  return (
    <div>
      <img src={imageUrl} alt="Image" />
    </div>
  );
}
const deleteAccount = async (e) => {
    e.preventDefault();
    // const decodedState = GetDecodedState();
    // const { accessToken, refreshToken, userName, userEmail } = decodedState;

    // console.log(`${localStorage.getItem("accessToken")}`)
    if (window.confirm('확인을 누르면 회원 정보가 삭제됩니다.')) {
      // console.log(`${localStorage.getItem("accessToken")}`)
      try {
        await axios.patch('https://i9b306.q.ssafy.io/api1/user/delete', null, {
          headers: {
            'accessToken': localStorage.getItem("accessToken"), // 토큰을 헤더에 포함하여 전송
            // 'accessToken': accessToken
          },
        });
        localStorage.clear();
      alert('그동안 이용해주셔서 감사합니다.');
      window.location.href = '/';
      
    } catch(err) {
      console.error(err)
      alert(err.response.data.message);
    } 
    } else {
      return;
    };
}

const MyPage = (props) => {
  const [view, setView] = useState(false);

  const decodedState = GetDecodedState();
  const { userName, userEmail } = decodedState;
      

    return (
      <>
      <Link to="/">Go to 두뇌 풀 가동 Main</Link>
      <CenteredContainer>
        <MypageH1>마이 페이지</MypageH1>
        <React.Fragment>
          {/* <Grid> */}
              {/* <Grid is_flex> */}
              <PhotoUpload />
              <Image shape="circle" src= {props.src}/>
              {/* </Grid> */}
              {/* <Grid padding='16px'> */}
              
              {/* </Grid> */}
              <div>
                {!view && <MypageH1>{userName} | {userEmail}</MypageH1>}
                {/* {!view && <h1>{localStorage.getItem("userName")} | {localStorage.getItem("userEmail")}</h1>}   */}
              </div>
              
              <ul onClick={() => {setView(!view)}}>
              <div>
              {!view && <MypageH1>수정하기 {" "}</MypageH1>}
              </div>
              
              </ul>
              <div>
                {/* {view && <PhotoUpload />} */}
                {view && <AuthForm type={'modify'}></AuthForm>}
                {/* {view && (
                  <ButtonWithMargin onClick={() => {
                    handleUpdateUserInfo();
                    setView(!view);
                  }}>
                    변경 확인
                  </ButtonWithMargin>
                )} */}
              </div>
          {/* </Grid> */}
        </React.Fragment>
        <button type="button" onClick={()=>deleteAccount()}>회원 탈퇴</button>
      </CenteredContainer>
      </>
    );
  };
  
export default MyPage;