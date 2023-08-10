package com.ssafy.B306.domain.quiz;

import com.ssafy.B306.domain.quiz.dto.QuizResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController("/quiz")
@RequiredArgsConstructor
public class QuizController {
    private final QuizService quizService;

    @GetMapping("/{quizId}")
    public QuizResponseDto getQuiz(@PathVariable Long quizId) {
        System.out.println("ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ");
        return quizService.getQuiz(quizId);
    }
}
