package com.ssafy.B306.domain.quizbook;

import com.ssafy.B306.domain.quiz.Quiz;
import com.ssafy.B306.domain.quizbook.dto.QuizBookSaveRequestDto;
import com.ssafy.B306.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/quizbook")
@RequiredArgsConstructor
public class QuizBookController {

    private final QuizBookService quizBookService;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public void addNewQuizBook(User user, QuizBookSaveRequestDto quizBookSaveRequestDto){
        if(user == null)
            throw new RuntimeException("로그인 이후 사용 할 수 있는 기능입니다.");

        quizBookService.addNewQuizBook(user, quizBookSaveRequestDto);
    }
}
