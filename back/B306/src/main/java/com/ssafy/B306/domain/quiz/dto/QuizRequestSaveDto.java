package com.ssafy.B306.domain.quiz.dto;

import com.ssafy.B306.domain.quiz.Quiz;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class QuizRequestSaveDto {
    @NotNull
    private String quizText;

    @NotNull
    private char quizAnswer;


    @Builder
    public QuizRequestSaveDto(String quizText, char quizAnswer) {
        this.quizText = quizText;
        this.quizAnswer = quizAnswer;
    }

    public Quiz toEntity(QuizRequestSaveDto quizRequestSaveDto){
        return Quiz.builder()
                .quizText(quizRequestSaveDto.getQuizText())
                .quizAnswer(quizRequestSaveDto.getQuizAnswer())
                .build();
    }
}
