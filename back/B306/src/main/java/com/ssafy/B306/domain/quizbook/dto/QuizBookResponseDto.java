package com.ssafy.B306.domain.quizbook.dto;

import com.ssafy.B306.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QuizBookResponseDto {

    private Long quizBookId;
    private String quizBookTitle;
    private User quizBookUserId;

    @Builder
    public QuizBookResponseDto(Long quizBookId, String quizBookTitle, User quizBookUserId) {
        this.quizBookId = quizBookId;
        this.quizBookTitle = quizBookTitle;
        this.quizBookUserId = quizBookUserId;
    }
}
