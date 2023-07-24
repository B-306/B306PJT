package com.ssafy.B306.domain.quizbook.dto;

import com.ssafy.B306.domain.quiz.Quiz;
import com.ssafy.B306.domain.quizbook.QuizBook;
import com.ssafy.B306.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class QuizBookSaveRequestDto {
    @NotNull(message = "문제집 제목을 입력해주세요")
    private String quizBookTitle;

    private List<Quiz> quizzes = new ArrayList<>();

    @Builder
    public QuizBookSaveRequestDto(String quizBookTitle, List<Quiz> quizzes) {
        this.quizBookTitle = quizBookTitle;
        this.quizzes = quizzes;
    }

    public QuizBook toEntity(User writer, QuizBookSaveRequestDto quizBookSaveRequestDto) {
        return QuizBook.builder()
                .quizBookUserId(writer)
                .quizBookTitle(quizBookSaveRequestDto.getQuizBookTitle())
                .quizzes(quizBookSaveRequestDto.getQuizzes())
                .build();
    }
}
