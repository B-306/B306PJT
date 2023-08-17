import React from 'react';
import { Link } from 'react-router-dom';
import tokenHttp from '../components/api/tokenHttp';
import styles from './GameCreate.module.css';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

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
      tokenHttp.get('https://i9b306.q.ssafy.io/api1/quizbook/get', {
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
      tokenHttp.get(`https://i9b306.q.ssafy.io/api1/quizbook/get/${quizBookId}`, {
      headers: {
        accessToken: localStorage.getItem('accessToken') // 여기에 액세스 토큰 값을 넣어주세요
      }
    })
    .then(response => {
      const quizIds = response.data.quizList.map(quiz => quiz.quizId);
      localStorage.setItem('selectedQuizes', quizIds);
      const roomCode = uuidv4();
      localStorage.setItem('roomCode',roomCode);
      localStorage.setItem('hostOf', roomCode);
      window.location.href = `/game/${roomCode}`;
    })
    .catch(error => {
      console.error('서버 요청 실패:', error);
    });
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
