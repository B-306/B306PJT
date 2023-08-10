import Image from '../components/common/Image';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import PhotoUpload from '../components/auth/PhotoUpload'
import AuthForm from '../components/auth/AuthForm';
import GetDecodedState from '../components/common/CodedState';

const MypageH1 = styled.h1`
  text-align: center;
  color: white;
  font-family: 'Ftstardust'
`;

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


const deleteAccount = async () => {
    // e.preventDefault();
    if (window.confirm('확인을 누르면 회원 정보가 삭제됩니다.')) {
      try {
        await axios.patch('https://i9b306.q.ssafy.io/api1/user/delete', null, {
          headers: {
            'accessToken': localStorage.getItem("accessToken"), // 토큰을 헤더에 포함하여 전송
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
              <PhotoUpload />
              <Image shape="circle" src= {props.src}/>
              <div>
                {!view && <MypageH1>{userName} | {userEmail}</MypageH1>}
              </div>
              
              <ul onClick={() => {setView(!view)}}>
              <div>
              {!view && <MypageH1>회원정보 수정 {" "}</MypageH1>}
              </div>
              
              </ul>
              <div>
                {view && <AuthForm type={'modify'}></AuthForm>}
              </div>
        </React.Fragment>
        <button type="button" onClick={deleteAccount}>회원 탈퇴</button>
      </CenteredContainer>
      </>
    );
  };
  
export default MyPage;