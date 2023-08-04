package com.ssafy.B306.domain.quiz;

import com.ssafy.B306.domain.quizbook.QuizBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    @Query("SELECT q FROM Quiz q WHERE q.quizDelteDate IS NULL AND q.quizBookId = ?1")
    Optional<List<Quiz>> findByQuizBookId(QuizBook quizBookId);

//    @Query("DELETE FROM Quiz q WHERE q.quizBookId in : quizBookIds")
//    void deleteAllInBatch(Iterable<> quizBookIds);

}
