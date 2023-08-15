package com.ssafy.B306.domain.template.dto;


import lombok.*;

@Getter
@NoArgsConstructor
public class TemplateResponseDto {
    private Long templateId;
    private String templateImage;
    private char templateType;
    private String templateName;

    @Builder
    public TemplateResponseDto(Long templateId, String templateImage, char templateType, String templateName) {
        this.templateId = templateId;
        this.templateImage = templateImage;
        this.templateType = templateType;
        this.templateName = templateName;
    }
}
