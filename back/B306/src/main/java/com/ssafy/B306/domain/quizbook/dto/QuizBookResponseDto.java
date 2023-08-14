package com.ssafy.B306.domain.quizbook.dto;

import com.ssafy.B306.domain.quiz.dto.QuizResponseDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class QuizBookResponseDto {

    private Long quizBookId;
    private String quizBookTitle;
    private List<QuizResponseDto> quizList;


    @Builder

    public QuizBookResponseDto(Long quizBookId, String quizBookTitle, List<QuizResponseDto> quizList) {
        this.quizBookId = quizBookId;
        this.quizBookTitle = quizBookTitle;
        this.quizList = quizList;
    }
}
