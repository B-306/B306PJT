package com.ssafy.B306.domain.template.dto;

import com.ssafy.B306.domain.template.Template;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class TemplateSaveDto {
    @NotNull
    private String templateImage;
    @NotNull
    private char templateType;

    private String templateName;


    @Builder
    public TemplateSaveDto(String templateImage, char templateType, String templateName) {
        this.templateImage = templateImage;
        this.templateType = templateType;
        this.templateName = templateName;
    }

    public Template toEntity(TemplateSaveDto templateSaveDto) {
        return Template.builder()
                .templateImage(templateSaveDto.getTemplateImage())
                .templateType(templateSaveDto.getTemplateType())
                .templateName(templateSaveDto.getTemplateName())
                .build();
    }
}
