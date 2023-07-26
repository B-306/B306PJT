package com.ssafy.B306.domain.quizbook.dto;

import com.ssafy.B306.domain.quiz.Quiz;
import com.ssafy.B306.domain.quizbook.QuizBook;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class QuizBookSaveRequestDto {
    @NotNull(message = "문제집 제목을 입력해주세요")
    private String quizBookTitle;

    private List<Quiz> quizzes = new ArrayList<>();

    private String quizBookUserEmail;

    @Builder
    public QuizBookSaveRequestDto(String quizBookTitle, List<Quiz> quizzes, String userEmail) {
        this.quizBookTitle = quizBookTitle;
        this.quizzes = quizzes;
        this.quizBookUserEmail = userEmail;
    }

    public QuizBook toEntity(QuizBookSaveRequestDto quizBookSaveRequestDto) {
        return QuizBook.builder()
                .quizBookTitle(quizBookSaveRequestDto.getQuizBookTitle())
                .quizzes(quizBookSaveRequestDto.getQuizzes())
                .build();
    }

}
