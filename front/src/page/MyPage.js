// import Image from '../components/common/Image';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import PhotoUpload from '../components/auth/PhotoUpload';
import AuthForm from '../components/auth/AuthForm';
import GetDecodedState from '../components/common/CodedState';

const ButtonContainer = styled.div`
  text-align: right;
  margin-top: 20px;
`;

const StyledButtonLink = styled(Link)`
  display: inline-block;
  // background-color: #5ec9f2;
  color: #0B98FF;
  // padding: 10px 20px;
  // border: none;
  // border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  font-size: 35px;

  // &:hover {
  //   background-color: #3498db;
  // }
`;

const MypageH1 = styled.h2`
  text-align: left;
  color: white;
  // color: #5ec9f2;
  font-family: 'Ftstardust';
  align-items: flex-start;
  padding-right: 300px;
`;

const MypageH2 = styled.h2`
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
  width: 40%;
  // background-color: white;
  border-radius: 5px;
  // backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.2);
  // opacity: 0.8; /* 투명도 설정 */
  // backdrop-filter: blur(10px);
  // min-height: 100vh;
  // overflow: hidden; /* 스크롤바 없애기 */

  // font-family: 'Ftstardust';
  // display: flex;
  // flex-direction: column;
  // align-items: flex-start; /* 왼쪽 정렬로 변경 */
  // justify-content: center;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // height: 80%;
  // width: 50%;
  // border-radius: 20px;
  // background-color: rgba(255, 255, 255, 0.2);
`;

const ModifyButton = styled.button`
  font-family: 'Ftstardust';
  background-color: #5ec9f2;
  color: white;
  border: none;

  width: 100px; /* 가로 크기를 100px로 설정 */
  height: 40px; /* 세로 크기를 40px로 설정 */

  font-size: 18px;
  font-weight: bold;

  border-radius: 5px;

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
  height: 40px; /* 세로 크기를 40px로 설정 */

  font-size: 18px;
  font-weight: bold;

  border-radius: 5px;

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

  // const deleteAccount = async () => {
  //   // ... (deleteAccount function code)
  // };

  return (
    <>
      <CenteredContainer>
        <StyledButtonLink to="/">두뇌 풀 가동</StyledButtonLink>
        <MypageH1 style={{ display: 'block', marginTop: '40px' }}>마이 페이지</MypageH1>

        <React.Fragment>
          <div>
            <div style={{ float: 'left' }}>
              <PhotoUpload />
            </div>
            <div style={{ float: 'right', marginTop: '40px', padding: '10px', marginLeft: '30px' }}>
              <div style={{ float: 'left' }}>{!view && <MypageH2>{userName}</MypageH2>}</div>
              <div>{!view && <MypageH2>{userEmail}</MypageH2>}</div>
            </div>
          </div>

          {/* <div
            onClick={() => {
              setView(!view);
            }}
          >
            {!view && <ModifyButton>정보 수정</ModifyButton>}
          </div> */}

          <AuthFormWrapper>
            {view && <AuthForm type={'modify'}></AuthForm>}
          </AuthFormWrapper>
        </React.Fragment>

        <ButtonContainer>
          <ModifyButton
            type="button"
            onClick={() => {
              setView(!view);
            }}
            style={{ marginRight: '10px' }}
          >
            정보 수정
          </ModifyButton>

          <DeleteButton type="button" onClick={deleteAccount}>
            회원 탈퇴
          </DeleteButton>
        </ButtonContainer>
      </CenteredContainer>
    </>
  );
};

export default MyPage;