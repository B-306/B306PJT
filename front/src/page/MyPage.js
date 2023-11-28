// import Image from '../components/common/Image';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import axios from 'axios';
import tokenHttp from '../components/api/tokenHttp';
import PhotoUpload from '../components/auth/PhotoUpload';
// import AuthForm from '../components/auth/AuthForm';
import GetDecodedState from '../components/common/CodedState';
// 
import Logout from "../components/auth/Logout";

//
import Input from '../components/common/Input';
const StyledInput = styled(Input)``;

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
  padding-bottom : 30px;

  // &:hover {
  //   background-color: #3498db;
  // }
`;

const StyledButtonLink2 = styled(Link)`
  display: inline-block;
  color: white;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  font-size: 20px;
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
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
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
  width: 50%;
  font-family: 'Ftstardust';
  float : right;
`;

const deleteAccount = async () => {
  // e.preventDefault();
  if (window.confirm('확인을 누르면 회원 정보가 삭제됩니다.')) {
    try {
      // await axios.patch('https://i9b306.q.ssafy.io/api1/user/delete', null, {
      await tokenHttp.patch('https://k9b308.p.ssafy.io/api1/user/delete', null, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'), // 토큰을 헤더에 포함하여 전송
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

  const decodedState = GetDecodedState();
  const { userName, userEmail } = decodedState;

  const [view, setView] = useState(false);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const modifyAccount = async () => {
    console.log(name)
    console.log(password)

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

      // const response = await axios.patch('https://i9b306.q.ssafy.io/api1/user/modify', {
      const response = await tokenHttp.patch('https://k9b308.p.ssafy.io/api1/user/modify', {
        userName: name,
        userPassword: password,
      }, {
        headers: {
          'Authorization': localStorage.getItem("accessToken"), // JWT 토큰을 헤더에 포함하여 보냅니다.
        },
      });

      // 회원정보 수정이 성공하면 메인 페이지로 이동하거나 다른 동작 수행
      // 예시: 페이지 리디렉션
      console.log(response.data);
      console.log("회원정보 수정 성공!");
      Logout();
      window.location.href = '/login'; // login 페이지로 리디렉션
      alert('회원정보 수정이 완료되었습니다. 다시 로그인해 주세요.');
    } catch (error) {
      console.error('회원정보 수정 실패:', error);
      // 회원정보 수정 실패 처리를 원하는 경우 적절한 방법으로 처리
    }

  }

  return (
    <>
      <CenteredContainer>
        <div style={{ paddingRight: '480px', paddingBottom: '30px' }}><StyledButtonLink2 to="/">
          &lt;
          &nbsp; 뒤로가기</StyledButtonLink2></div>
        <StyledButtonLink to="/">두뇌 풀 가동</StyledButtonLink>
        <MypageH1 style={{ display: 'block', marginTop: '20px' }}>{view ? "회원정보 수정" : "마이페이지"}</MypageH1>

        <React.Fragment>
          <div style={{ width: '80%' }}>
            <div>
              <div style={{ float: 'left' }}>
                <PhotoUpload />
              </div>
              <div style={{ float: 'right', marginTop: '40px', padding: '10px', marginLeft: '10px' }}>
                <div style={{ float: 'left' }}>{!view && <MypageH2>{userName}</MypageH2>}</div>
                <div>{!view && <MypageH2>{userEmail}</MypageH2>}</div>
              </div>
            </div>
            <AuthFormWrapper>
              {view &&
                <div>
                  <div style={{ display: 'flex' }}>
                    <StyledInput
                      // autoComplete="newname"
                      name="name"
                      placeholder="이름"
                      type="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ marginRight: '10px', marginBottom: '10px' }}
                    />
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
                  </div>
                </div>
              }
            </AuthFormWrapper>
          </div>
        </React.Fragment >

        <ButtonContainer>
          {view ? (
            <ModifyButton
              type="button"
              onClick={() => {
                setView(!view);
              }}
              style={{ marginRight: '10px' }}
            >
              수정 취소
            </ModifyButton>
          ) : (
            <ModifyButton
              type="button"
              onClick={() => {
                setView(!view);
              }}
              style={{ marginRight: '10px' }}
            >
              정보 수정
            </ModifyButton>
          )}

          <DeleteButton type="button" onClick={view ? modifyAccount : deleteAccount}>
            {/* 회원 탈퇴 */}
            {view ? "수정 완료" : "회원 탈퇴"}
          </DeleteButton>
        </ButtonContainer>
      </CenteredContainer >
    </>
  );
};

export default MyPage;