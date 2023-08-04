import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './GameCreate.module.css';
import styled from 'styled-components';


const QuizbookH1 = styled.h1`
  text-align: center;
  color: white;
  font-family: 'JSArirang'
`;

const QuizbookH2 = styled.h2`
  text-align: center;
  color: white;
  font-family: 'JSArirang'
`;

const GetQuiz = () => {
  const [quizBooks, setQuizBooks] = React.useState([]);

  React.useEffect(() => {
    axios.get('/quizbook/get')
      .then(response => {
        setQuizBooks(response.data);
      })
      .catch(error => {
        console.error('서버 요청 실패:', error);
      });
  }, []);

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
      <Link to="/">두뇌 풀 가동</Link>
      <QuizbookH1> Game제작 페이지입니다. </QuizbookH1>
      <GetQuiz />
    </div>
  );
};

export default GameCreatePage;
