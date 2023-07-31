package com.ssafy.B306.domain.quizbook.dto;

import com.ssafy.B306.domain.quiz.dto.QuizResponseDto;
import com.ssafy.B306.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class QuizBookResponseDto {

    private Long quizBookId;
    private String quizBookTitle;
    private User quizBookUserId;
    private List<QuizResponseDto> quizList;

    @Builder
    public QuizBookResponseDto(Long quizBookId, String quizBookTitle, User quizBookUserId, List<QuizResponseDto> quizList) {
        this.quizBookId = quizBookId;
        this.quizBookTitle = quizBookTitle;
        this.quizBookUserId = quizBookUserId;
        this.quizList = quizList;
    }
}
