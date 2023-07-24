package com.ssafy.B306.domain.quizbook;

import com.ssafy.B306.domain.quiz.Quiz;
import com.ssafy.B306.domain.quizbook.dto.QuizBookSaveRequestDto;
import com.ssafy.B306.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuizBookService {
    private final QuizBookRepository quizBookRepository;
    @Transactional
    public QuizBook addNewQuizBook(User writer, QuizBookSaveRequestDto quizBookSaveRequestDto){
        QuizBook newQuizBook = quizBookSaveRequestDto.toEntity(writer, quizBookSaveRequestDto);

        if(quizBookSaveRequestDto.getQuizzes() == null)
            throw new IllegalArgumentException("문제집의 문제가 비어있습니다.");

        return quizBookRepository.save(newQuizBook);
    }
}
