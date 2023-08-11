package com.ssafy.B306.domain.quiz.dto;

import com.ssafy.B306.domain.template.Template;
import com.ssafy.B306.domain.template.dto.TemplateResponseDto;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@RequiredArgsConstructor
public class QuizResponseDto {

    private Long quizId;
    private TemplateResponseDto quizTemplateId;
    private String quizText;
    private char quizAnswer;

    @Builder
    public QuizResponseDto(Long quizId, TemplateResponseDto quizTemplateId, String quizText, char quizAnswer) {
        this.quizId = quizId;
        this.quizTemplateId = quizTemplateId;
        this.quizText = quizText;
        this.quizAnswer = quizAnswer;
    }

}
