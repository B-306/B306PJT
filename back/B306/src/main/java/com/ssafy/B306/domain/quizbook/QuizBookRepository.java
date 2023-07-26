package com.ssafy.B306.domain.quizbook;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuizBookRepository extends JpaRepository<QuizBook, Long> {

    Optional<QuizBook> findByQuizBookIdAndQuizBookUserId(Long quizBookId, Long quizBookUserId);
}
