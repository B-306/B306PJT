package com.ssafy.B306.domain.quizbook;

import com.ssafy.B306.domain.quiz.Quiz;
import com.ssafy.B306.domain.quiz.QuizRepository;
import com.ssafy.B306.domain.quiz.dto.QuizRequestSaveDto;
import com.ssafy.B306.domain.quizbook.dto.QuizBookSaveRequestDto;
import com.ssafy.B306.domain.user.User;
import com.ssafy.B306.domain.user.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@SpringBootTest
public class QuizBookServiceTest {
    @Autowired
    private QuizBookService quizBookService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Test
    @DisplayName("문제집 생성 성공")
    void addNewQuizBook(){
        // given
        User user = createUser("test@test.com", "1234", "testUser");
        userRepository.save(user);

        QuizRequestSaveDto quizRequestSaveDto = QuizRequestSaveDto.builder()
                .quizText("quizText")
                .quizAnswer('3')
                .build();

        List<Quiz> testList = new ArrayList<>();
        testList.add(quizRequestSaveDto.toEntity(quizRequestSaveDto));
        testList.add(quizRequestSaveDto.toEntity(quizRequestSaveDto));
        testList.add(quizRequestSaveDto.toEntity(quizRequestSaveDto));

        QuizBookSaveRequestDto quizBookSaveRequestDto = QuizBookSaveRequestDto.builder()
                .quizBookTitle("title")
                .quizzes(testList)
                .build();

        // when
//        QuizBook newQuizBook = quizBookService.addNewQuizBook(quizBookSaveRequestDto);

        // then
//        Assertions.assertNotNull(newQuizBook.getQuizBookId());
    }

    private User createUser(String email, String password, String userName) {
        return User.builder()
                .userEmail(email)
                .userPassword(password)
                .userName(userName)
                .build();
    }
}
