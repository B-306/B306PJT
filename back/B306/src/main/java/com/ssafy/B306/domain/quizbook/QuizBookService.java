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

    @Transactional
    public void deleteQuizBook(Long quizBookId) {
        QuizBook quizBook = quizBookRepository.findById(quizBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물이 없습니다."));

        quizBookRepository.deleteById(quizBook.getQuizBookId());
    }

    @Transactional
    public void modifyQuizbook(Long quizBookId, QuizBookSaveRequestDto quizBookSaveRequestDto) {
        // To-do 사용자가 작성한 글이 맞는지 확인하기

        QuizBook quizBook = quizBookRepository.findById(quizBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물이 없습니다."));

        quizBook.modifyQuizBook(quizBookSaveRequestDto.getQuizBookTitle(), quizBookSaveRequestDto.getQuizzes());
    }
}
