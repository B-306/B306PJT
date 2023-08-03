package com.ssafy.B306.domain.quizbook;

import com.ssafy.B306.domain.quiz.Quiz;
import com.ssafy.B306.domain.quiz.QuizService;
import com.ssafy.B306.domain.quiz.dto.QuizResponseDto;
import com.ssafy.B306.domain.quizbook.dto.QuizBookListResponseDto;
import com.ssafy.B306.domain.quizbook.dto.QuizBookModifyRequestDto;
import com.ssafy.B306.domain.quizbook.dto.QuizBookResponseDto;
import com.ssafy.B306.domain.quizbook.dto.QuizBookSaveRequestDto;
import com.ssafy.B306.domain.security.JwtUtil;
import com.ssafy.B306.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
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

        quizBookSaveRequestDto.setUserPk(
                User.builder()
                        .userId(jwtUtil.extractUserPkFromToken(request))
                        .build());

        QuizBook newQuizBook = quizBookSaveRequestDto.toEntity(quizBookSaveRequestDto);

        quizBookRepository.save(newQuizBook);
        quizService.addNewQuiz(quizBookSaveRequestDto.getQuizzes(), newQuizBook);

        return newQuizBook;
    }

    public List<QuizBookListResponseDto> getQuizBookList() {
        List<QuizBook> quizBookList = quizBookRepository.findAll();
        List<QuizBookListResponseDto> quizListResponseDtoList = new ArrayList<>();

        for(QuizBook quizBook : quizBookList){
            QuizBookListResponseDto qlrd = quizBook.toListDto(quizBook);
            quizListResponseDtoList.add(qlrd);
        }

        return quizListResponseDtoList;
    }

    public QuizBookResponseDto getQuizBook(QuizBook quizBookId) {
        QuizBook quizBook = quizBookRepository.findById(quizBookId.getQuizBookId()).get();

        List<QuizResponseDto> quizList = quizService.getQuizList(quizBookId);

        QuizBookResponseDto quizBookResponseDto = new QuizBookResponseDto();
        quizBookResponseDto = quizBook.toDto(quizBook, quizList);

        return quizBookResponseDto;
    }

    @Transactional
    public void deleteQuizBook(Long quizBookId, HttpServletRequest request) {

        QuizBook myQuizBook = getQuizBookIfMine(quizBookId,
                jwtUtil.extractUserPkFromToken(request));

        // ToDo 퀴즈 단건 삭제가 아닌 한꺼번에 삭제 구현 필요
        quizService.deleteQuizList(quizBookId);
        quizBookRepository.deleteById(myQuizBook.getQuizBookId());
    }

    @Transactional
    public void modifyQuizBook(Long quizBookId, QuizBookModifyRequestDto quizBookModifyRequestDto, HttpServletRequest request) {
        Long userID = jwtUtil.extractUserPkFromToken(request);
        QuizBook originalQuizBook = getQuizBookIfMine(quizBookId, userID);

        // 문제별로 수정
        if (isQuizzesModified(quizBookModifyRequestDto.getQuizzes())) {
            quizService.modifyQuiz(quizBookModifyRequestDto.getQuizzes());
        }

        // 문제집 제목 수정
        if(isTitleModified(quizBookModifyRequestDto.getQuizBookTitle()))
            originalQuizBook.modifyQuizBook(quizBookModifyRequestDto.getQuizBookTitle());
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

}
