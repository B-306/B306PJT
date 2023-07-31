
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import Button from "../components/common/Button";
import axios from 'axios';

const GetQuiz = () => {
  const [quizName, setQuizName] = useState('');

  useEffect(() => {

    // 액세스 토큰을 헤더에 포함하여 서버로 요청 보내기
    axios.get('/template/get',  {
      
    })
    .then(response => {
      // 요청이 성공하면 서버에서 받은 이름을 상태에 저장
      console.log(response.data)
    //   setQuizName(response.data);
    })
    .catch(error => {
      console.error('서버 요청 실패:', error);
    });
  }, []);

  return (
    <div>
      <h2>{quizName}</h2>
      <h1>test</h1>
    </div>
  );
};

const GameCreatePage = () => {
  return (
    <>
      <Link to="/">두뇌 풀 가동</Link>
      <h1>Game제작 페이지입니다.</h1>
      <h1><GetQuiz/></h1>
      
    </>
  );
};

export default GameCreatePage