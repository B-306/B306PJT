package com.ssafy.B306.domain.quizbook;

import com.ssafy.B306.domain.quiz.Quiz;
import com.ssafy.B306.domain.quiz.QuizService;
import com.ssafy.B306.domain.quizbook.dto.QuizBookSaveRequestDto;
import com.ssafy.B306.domain.security.JwtUtil;
import com.ssafy.B306.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuizBookService {
    private final QuizBookRepository quizBookRepository;
    private final JwtUtil jwtUtil;
    private final QuizService quizService;

    @Transactional
    public QuizBook addNewQuizBook(QuizBookSaveRequestDto quizBookSaveRequestDto, HttpServletRequest request){

        Long userID = getUserIdFromToken(request);
        quizBookSaveRequestDto.setUserPk(User.builder().userId(userID).build());
        QuizBook newQuizBook = quizBookSaveRequestDto.toEntity(quizBookSaveRequestDto);

        quizBookRepository.save(newQuizBook);
        quizService.addNewQuiz(quizBookSaveRequestDto.getQuizzes(), newQuizBook);

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
    public void deleteQuizBook(Long quizBookId, HttpServletRequest request) {
        Long quizBookUserId = getUserIdFromToken(request);
        QuizBook myQuizBook = getQuizBookIfMine(quizBookId, quizBookUserId);

        quizBookRepository.deleteById(myQuizBook.getQuizBookId());
    }

    @Transactional
    public void modifyQuizBook(Long quizBookId, QuizBookSaveRequestDto quizBookSaveRequestDto, HttpServletRequest request) {
        Long quizBookUserId = getUserIdFromToken(request);
        QuizBook originalQuizBook = getQuizBookIfMine(quizBookId, quizBookUserId);

        // 문제별로 수정
        if (isQuizzesModified(quizBookSaveRequestDto.getQuizzes())) {
            quizService.modifyQuiz(quizBookSaveRequestDto.getQuizzes());
        }

        // 문제집 제목 수정
        if(isTitleModified(quizBookSaveRequestDto.getQuizBookTitle()))
            originalQuizBook.modifyQuizBook(quizBookSaveRequestDto.getQuizBookTitle());
    }

    private boolean isTitleModified(String quizBookTitle) {
        return StringUtils.hasText(quizBookTitle);
    }

    private boolean isQuizzesModified(List<Quiz> quizzes) {
        return quizzes != null;
    }

    private QuizBook getQuizBookIfMine(Long quizBookId, Long quizBookUserId) {
        return quizBookRepository.findByQuizBookIdAndQuizBookUserId(quizBookId, User.builder().userId(quizBookUserId).build())
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물이 없습니다."));
    }

    private Long getUserIdFromToken(HttpServletRequest request) {
        String accessToken = request.getHeader("accessToken");
        return Long.parseLong(jwtUtil.parseClaims(accessToken).get("userPk").toString());
    }
}
