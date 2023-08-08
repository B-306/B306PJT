package com.ssafy.B306.domain.quiz.dto;

import com.ssafy.B306.domain.template.Template;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@RequiredArgsConstructor
public class QuizResponseDto {

    private Long quizId;
    private Long quizTemplateId;
    private String quizText;
    private char quizAnswer;

    @Builder
    public QuizResponseDto(Long quizId, Long quizTemplateId, String quizText, char quizAnswer) {
        this.quizId = quizId;
        this.quizTemplateId = quizTemplateId;
        this.quizText = quizText;
        this.quizAnswer = quizAnswer;
    }

}
