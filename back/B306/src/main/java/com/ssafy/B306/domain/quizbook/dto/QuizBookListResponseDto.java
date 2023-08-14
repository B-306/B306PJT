package com.ssafy.B306.domain.quizbook.dto;

import lombok.*;


@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizBookListResponseDto {
    private Long quizBookId;
    private String quizBookTitle;
    private String quizBookUserEmail;
    private String quizBookUserName;
}
