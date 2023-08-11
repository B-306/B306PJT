// import Image from '../components/common/Image';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import PhotoUpload from '../components/auth/PhotoUpload';
import AuthForm from '../components/auth/AuthForm';
import GetDecodedState from '../components/common/CodedState';

const MypageH1 = styled.h1`
  text-align: center;
  color: white;
  // color: #5ec9f2;
  font-family: 'Ftstardust';
`;

const CenteredContainer = styled.div`
  font-family: 'Ftstardust';
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute; /* 위치를 절대 위치로 설정 */
  top: 50%; /* 세로 위치를 화면의 50%로 설정 */
  left: 50%; /* 가로 위치를 화면의 50%로 설정 */
  transform: translate(-50%, -50%); /* 가운데로 정렬하기 위한 변환 */
  height: 80%;
  width: 33.33%;
  // background-color: red;
  border-radius: 20px;
  // backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.8);
  // opacity: 0.8; /* 투명도 설정 */
  // backdrop-filter: blur(10px);
  // min-height: 100vh;
  // overflow: hidden; /* 스크롤바 없애기 */
`;

const ModifyButton = styled.button`
  font-family: 'Ftstardust';
  background-color: #5ec9f2;
  color: white;
  border: none;

  width: 100px; /* 가로 크기를 100px로 설정 */
  height: 50px; /* 세로 크기를 50px로 설정 */

  font-size: 18px;
  font-weight: bold;

  border-radius: 10px;

  &:hover {
    background-color: #3498db; /* 호버 시 배경색 변경 */
    color: #fff; /* 호버 시 글씨 색 변경 */
  }
`;

const DeleteButton = styled.button`
  font-family: 'Ftstardust';
  background-color: #ff5733;
  color: white;
  border: none;

  width: 100px; /* 가로 크기를 100px로 설정 */
  height: 50px; /* 세로 크기를 50px로 설정 */

  font-size: 18px;
  font-weight: bold;

  border-radius: 10px;

  &:hover {
    background-color: #d63031; /* 호버 시 배경색 변경 */
    color: #fff; /* 호버 시 글씨 색 변경 */
  }
`;

const AuthFormWrapper = styled.div`
  width: 80%;
  font-family: 'Ftstardust';
`;

const deleteAccount = async () => {
  // e.preventDefault();
  if (window.confirm('확인을 누르면 회원 정보가 삭제됩니다.')) {
    try {
      await axios.patch('https://i9b306.q.ssafy.io/api1/user/delete', null, {
        headers: {
          accessToken: localStorage.getItem('accessToken'), // 토큰을 헤더에 포함하여 전송
        },
      });
      localStorage.clear();
      alert('그동안 이용해주셔서 감사합니다.');
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  } else {
    return;
  }
};

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
          <PhotoUpload />
          {/* <Image shape="circle" src={props.src} /> */}
          <div>
            {!view && <MypageH1>{userName}</MypageH1>}
            {!view && <MypageH1>{userEmail}</MypageH1>}
          </div>

          <div
            onClick={() => {
              setView(!view);
            }}
          >
            {!view && <ModifyButton>정보 수정</ModifyButton>}
          </div>

          <AuthFormWrapper>
            {view && <AuthForm type={'modify'}></AuthForm>}
          </AuthFormWrapper>
        </React.Fragment>

        <DeleteButton
          type="button"
          onClick={deleteAccount}
          style={{ marginTop: '20px' }}
        >
          회원 탈퇴
        </DeleteButton>
      </CenteredContainer>
    </>
  );
};

export default MyPage;