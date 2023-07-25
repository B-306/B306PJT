package com.ssafy.B306.domain.quiz.dto;

import com.ssafy.B306.domain.quiz.Quiz;
import com.ssafy.B306.domain.quizbook.QuizBook;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@Setter
public class QuizRequestSaveDto {
    @NotNull
    private String quizText;

    @NotNull
    private char quizAnswer;

    private QuizBook quizBookId;

    @Builder
    public QuizRequestSaveDto(String quizText, char quizAnswer, QuizBook quizBookId) {
        this.quizText = quizText;
        this.quizAnswer = quizAnswer;
        this.quizBookId = quizBookId;
    }

    public Quiz toEntity(QuizRequestSaveDto quizRequestSaveDto){
        return Quiz.builder()
                .quizBookId(quizRequestSaveDto.getQuizBookId())
                .quizText(quizRequestSaveDto.getQuizText())
                .quizAnswer(quizRequestSaveDto.getQuizAnswer())
                .build();
    }
}
