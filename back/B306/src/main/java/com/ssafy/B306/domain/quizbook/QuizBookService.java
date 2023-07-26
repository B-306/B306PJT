package com.ssafy.B306.domain.quizbook;

import com.ssafy.B306.domain.quiz.Quiz;
import com.ssafy.B306.domain.quiz.QuizService;
import com.ssafy.B306.domain.quizbook.dto.QuizBookSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuizBookService {
    private final QuizBookRepository quizBookRepository;

    private final QuizService quizService;
    @Transactional
    public QuizBook addNewQuizBook(QuizBookSaveRequestDto quizBookSaveRequestDto){
        QuizBook newQuizBook = quizBookSaveRequestDto.toEntity(quizBookSaveRequestDto);

        quizBookRepository.save(newQuizBook);
        quizService.addNewQuiz(quizBookSaveRequestDto.getQuizzes(), newQuizBook);

        // To-do 문제별로 템플릿 연결하기

        return newQuizBook;
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
        // To-do 사용자가 작성한 글이 맞는지 확인하기

        QuizBook quizBook = quizBookRepository.findById(quizBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물이 없습니다."));

        quizBookRepository.deleteById(quizBook.getQuizBookId());
    }

    @Transactional
    public void modifyQuizbook(Long quizBookId, QuizBookSaveRequestDto QuizBookSaveRequestDto) {
        // To-do 사용자가 작성한 글이 맞는지 확인하기

        QuizBook quizBook = quizBookRepository.findById(quizBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물이 없습니다."));

        // 문제별로 수정
        if (isQuizesModified(quizBookSaveRequestDto.getQuizzes())) {
            quizService.modifyQuiz(quizBookSaveRequestDto.getQuizzes());
        }

        // 문제집 제목 수정
        if(isTitleModified(quizBook.getQuizBookTitle()))
            quizBook.modifyQuizBook(quizBookSaveRequestDto.getQuizBookTitle());
    }

    private boolean isTitleModified(String quizBookTitle) {
        return StringUtils.hasText(quizBookTitle);
    }

    private boolean isQuizesModified(List<Quiz> quizzes) {
        return quizzes != null;
    }
}
