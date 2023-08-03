import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './GameCreate.module.css';

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
    <div className={styles.quizListContainer}>
      <h2>문제집 목록</h2>
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
  );
};

const GameCreatePage = () => {
  return (
    <div>
      <Link to="/">두뇌 풀 가동</Link>
      <h1>Game제작 페이지입니다.</h1>
      <GetQuiz />
    </div>
  );
};

export default GameCreatePage;
