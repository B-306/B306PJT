package com.ssafy.B306.domain.template.dto;

import com.ssafy.B306.domain.quiz.Quiz;
import com.ssafy.B306.domain.user.User;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public class TemplateDto {
    private final Long templateId;
    private final String templateImage;
    private final char templateType;
    private String templateName;
    private Quiz quizId;
    private User templateUserId;
    private LocalDateTime templateCreateDate;
    private LocalDateTime templateModifyDate;
    private LocalDateTime templateDeleteDate;
}
