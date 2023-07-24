import Grid from '../components/common/Grid';
import Image from '../components/common/Image';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Input from "../components/common/Input";
import styled from 'styled-components';
import Button from "../components/common/Button";



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
              <ul onClick={() => {setView(!view)}}>
                {view && <Button>변경 확인</Button>}
              </ul>
              </div>
          </Grid>
        </React.Fragment>
        <button type="button" onClick={null}>프로필 수정</button>
        <button type="button" onClick={null}>회원 탈퇴</button>
      </>
      
    );
  };
  
export default MyPage;