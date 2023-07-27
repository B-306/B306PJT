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

        Long userPk = Long.parseLong(jwtUtil.parseClaims(request.getHeader("accessToken")).get("userPk").toString());
        quizBookSaveRequestDto.setUserPk(User.builder().userId(userPk).build());
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
    public void modifyQuizbook(Long quizBookId, QuizBookSaveRequestDto quizBookSaveRequestDto, HttpServletRequest request) {
        // request안에 header 중에 token 꺼내는 코드
        String accessToken = request.getHeader("accessToken");
        Long quizBookUserId = Long.parseLong(jwtUtil.parseClaims(accessToken).get("userPk").toString());

        QuizBook originalQuizBook = quizBookRepository.findByQuizBookIdAndQuizBookUserId(quizBookId, User.builder().userId(quizBookUserId).build())
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물이 없습니다."));

        // 문제별로 수정
        if (isQuizesModified(quizBookSaveRequestDto.getQuizzes())) {
            quizService.modifyQuiz(quizBookSaveRequestDto.getQuizzes());
        }

        // 문제집 제목 수정
        if(isTitleModified(quizBookSaveRequestDto.getQuizBookTitle()))
            originalQuizBook.modifyQuizBook(quizBookSaveRequestDto.getQuizBookTitle());
    }

    private boolean isTitleModified(String quizBookTitle) {
        return StringUtils.hasText(quizBookTitle);
    }

    private boolean isQuizesModified(List<Quiz> quizzes) {
        return quizzes != null;
    }
}
