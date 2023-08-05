package com.ssafy.B306.domain.template.dto;


import com.ssafy.B306.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter
@RequiredArgsConstructor
public class TemplateResponseDto {
    private Long templateId;
    private String templateImage;
    private char templateType;
    private String templateName;
//    private User templateUserId;

    @Builder
    public TemplateResponseDto(Long templateId, String templateImage, char templateType, String templateName, User templateUserId) {
        this.templateId = templateId;
        this.templateImage = templateImage;
        this.templateType = templateType;
        this.templateName = templateName;
//        this.templateUserId = templateUserId;
    }
}
