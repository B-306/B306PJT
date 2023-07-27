package com.ssafy.B306.domain.template.dto;

import com.ssafy.B306.domain.quiz.Quiz;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TemplateRequestDto {
    private Long templateId;

}
