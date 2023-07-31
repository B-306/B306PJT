package com.ssafy.B306.domain.quizbook.dto;

import com.ssafy.B306.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@RequiredArgsConstructor
public class QuizBookListResponseDto {
    private Long quizBookId;
    private String quizBookTitle;
    private User quizBookUserId;


    @Builder
    public QuizBookListResponseDto(Long quizBookId, String quizBookTitle, User quizBookUserId) {
        this.quizBookId = quizBookId;
        this.quizBookTitle = quizBookTitle;
        this.quizBookUserId = quizBookUserId;
    }
}
