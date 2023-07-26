package com.ssafy.B306.domain.quiz;

import com.ssafy.B306.domain.quiz.dto.QuizRequestSaveDto;
import com.ssafy.B306.domain.quizbook.QuizBook;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuizService {

    private final QuizRepository quizRepository;

    @Transactional
    public void addNewQuiz(List<Quiz> quizList, QuizBook QuizBookid){
        for(Quiz quiz : quizList){
            QuizRequestSaveDto quizRequestSaveDto = quiz.toDto(quiz, QuizBookid);
            Quiz newQuiz = quizRequestSaveDto.toEntity(quizRequestSaveDto);
            quizRepository.save(newQuiz);
        }
    }

    @Transactional
    public void modifyQuiz(List<Quiz> quizList) {
        for(Quiz quiz : quizList){
            quiz.modifyQuiz(quiz);
        }
    }
}
