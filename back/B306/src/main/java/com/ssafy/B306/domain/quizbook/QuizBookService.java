package com.ssafy.B306.domain.quizbook;

import com.ssafy.B306.domain.quizbook.dto.QuizBookSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuizBookService {
    private final QuizBookRepository quizBookRepository;
    @Transactional
    public QuizBook addNewQuizBook(QuizBookSaveRequestDto quizBookSaveRequestDto){
        QuizBook newQuizBook = quizBookSaveRequestDto.toEntity(quizBookSaveRequestDto);

        if(quizBookSaveRequestDto.getQuizzes() == null)
            throw new IllegalArgumentException("문제집의 문제가 비어있습니다.");

        return quizBookRepository.save(newQuizBook);
    }

    @Transactional
    public List<QuizBook> getQuizBookList() {
        List<QuizBook> quizBookList = quizBookRepository.findAll();
        return quizBookList;
    }

    @Transactional
    public QuizBook getQuizBook(Long id) {
        QuizBook quizBook = quizBookRepository.findById(id).get();
        return quizBook;
    }
}
