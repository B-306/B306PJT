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
    private String quizBookUserEmail;
    private String quizBookUserName;

    @Builder
    public QuizBookListResponseDto(Long quizBookId, String quizBookTitle, String quizBookUserEmail, String quizBookUserName) {
        this.quizBookId = quizBookId;
        this.quizBookTitle = quizBookTitle;
        this.quizBookUserEmail = quizBookUserEmail;
        this.quizBookUserName = quizBookUserName;
    }
}
