package com.ssafy.B306.domain.quizbook;

import com.ssafy.B306.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface QuizBookRepository extends JpaRepository<QuizBook, Long> {

    @Query("SELECT qb FROM QuizBook qb WHERE qb.quizBookdeleteDate IS NULL AND qb.quizBookId = ?1 AND qb.quizBookUserId = ?2")
    Optional<QuizBook> findByQuizBookIdAndQuizBookUserId(Long quizBookId, User quizBookUserId);
}
