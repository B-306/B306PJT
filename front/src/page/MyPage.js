import Grid from '../components/common/Grid';
import Image from '../components/common/Image';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Input from "../components/common/Input";
import styled from 'styled-components';
import Button from "../components/common/Button";
import axios from 'axios';


const ButtonWithMargin = styled(Button)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const StyledInput = styled(Input)``;


function Change() {

  return (
    <>
    
      <Button><StyledInput type='file'placeholder="사진 변경" accept='image/*'/></Button>
      <StyledInput autoComplete="name" name="name" placeholder="이름" />  
      <StyledInput autoComplete="new-password" 
            name="password"
            placeholder="비밀번호"
            type="password" />
      <StyledInput autoComplete="new-password" 
            name="password"
            placeholder="비밀번호 확인"
            type="password" />    
    </>
  );
}

const handleUpdateUserInfo = async () => {
  // 수정할 회원 정보
  const updatedName = "새로운 이름";
  const updatedEmail = "newemail@example.com";

  try {
    // 회원정보 수정 요청 보내기
    const response = await axios.put('/user/modify', {
      userName: updatedName,
      userEmail: updatedEmail,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // JWT 토큰을 헤더에 포함하여 보냅니다.
      },
    });

    // 회원정보 수정이 성공하면 메인 페이지로 이동하거나 다른 동작 수행
    // 예시: 페이지 리디렉션
    console.log(response.data);
    console.log("회원정보 수정 성공!");
    window.location.href = '/'; // 메인 페이지로 리디렉션
  } catch (error) {
    console.error('회원정보 수정 실패:', error);
    // 회원정보 수정 실패 처리를 원하는 경우 적절한 방법으로 처리
  }
};


const MyPage = (props) => {
  const [view, setView] = useState(false); 

    return (
      <>
        <Link to="/">두뇌 풀 가동</Link>
        <h1>마이 페이지</h1>
        <React.Fragment>
          <Grid>
              <Grid is_flex>
              <Image shape="circle" src= {props.src}/>
              </Grid>
              <Grid padding='16px'>
              
              </Grid>
              <div>
                {!view && <h1>이름 | 이메일</h1>}
              </div>
              
              <ul onClick={() => {setView(!view)}}>
              <div>
              {!view && <h1>수정하기 {" "}</h1>}
              </div>
              
              </ul>
              <div>
                {view && <Change />}
                {view && (
                  <ButtonWithMargin onClick={() => {
                    handleUpdateUserInfo();
                    setView(!view);
                  }}>
                    변경 확인
                  </ButtonWithMargin>
                )}
              </div>
          </Grid>
        </React.Fragment>
        <button type="button" onClick={null}>프로필 수정</button>
        <button type="button" onClick={null}>회원 탈퇴</button>
      </>
      
    );
  };
  
export default MyPage;