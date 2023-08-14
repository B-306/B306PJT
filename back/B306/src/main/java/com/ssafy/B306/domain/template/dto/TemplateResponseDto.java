package com.ssafy.B306.domain.template.dto;


import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TemplateResponseDto {
    private Long templateId;
    private String templateImage;
    private char templateType;
    private String templateName;
}
