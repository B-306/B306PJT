package com.ssafy.B306.domain.quizbook.dto;

import com.ssafy.B306.domain.quiz.dto.QuizResponseDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizBookResponseDto {

    private Long quizBookId;
    private String quizBookTitle;
    private List<QuizResponseDto> quizList;

}
