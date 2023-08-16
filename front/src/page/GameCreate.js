import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './GameCreate.module.css';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
// import VideoRoomComponent from './VideoRoomComponent'; // VideoRoomComponent의 경로에 맞게 수정해주세요

const QuizbookH1 = styled.h1`
  text-align: center;
  color: white;
`;

const QuizbookH2 = styled.h2`
  text-align: center;
  color: white;
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

const GetQuiz = () => {
  const [quizBooks, setQuizBooks] = React.useState([]);

  React.useEffect(() => {
    axios.get('https://i9b306.q.ssafy.io/api1/quizbook/get', {
      headers: {
        'accessToken': localStorage.getItem('accessToken')
      }
    })
      .then(response => {
        setQuizBooks(response.data);
        console.log(response);
      })
      .catch(error => {
        console.error('서버 요청 실패:', error);
      });
  }, []);

  const handleMoveToVideoRoom = (quizBookId) => {
    axios.get(`https://i9b306.q.ssafy.io/api1/quizbook/get/${quizBookId}`, {
      headers: {
        accessToken: localStorage.getItem('accessToken') // 여기에 액세스 토큰 값을 넣어주세요
      }
    })
    .then(response => {
      // console.log(response);
      const quizIds = response.data.quizList.map(quiz => quiz.quizId);
      // console.log(quizIds)
      localStorage.setItem('selectedQuizes', quizIds);
      const roomCode = uuidv4();
      localStorage.setItem('roomCode',roomCode);
      localStorage.setItem('hostOf', roomCode);
      window.location.href = `/game/${roomCode}`;
    })
    .catch(error => {
      console.error('서버 요청 실패:', error);
    });
    // VideoroomComponent로 이동
    // window.location.href = '/video-room'; // 이동 시 새로고침 발생
    // 또는 React Router의 history 객체를 이용하여 이동
    // history.push('/video-room');
  };

  return (
    <>
      <QuizbookH2>문제집 목록</QuizbookH2>
      <div className={styles.quizListContainer}>
        <ul className={styles.quizList}>
          {quizBooks.map(quizBook => (
            <li key={quizBook.quizBookId}>
              <div className={styles.card}>
                <h3>{quizBook.quizBookTitle}</h3>
                <p>제작자: {quizBook.quizBookUserName}</p>
                <button onClick={() => handleMoveToVideoRoom(quizBook.quizBookId)}>
                  이동하기
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const GameCreatePage = () => {
  return (
    <div>
      <StyledButtonLink to="/">두뇌 풀 가동</StyledButtonLink>
      <QuizbookH1> Game 생성 </QuizbookH1>
      <GetQuiz />
    </div>
  );
};

export default GameCreatePage;
