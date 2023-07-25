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


    @Builder
    public TemplateSaveDto(String templateImage, char templateType) {
        this.templateImage = templateImage;
        this.templateType = templateType;
    }

    public Template toEntity(TemplateSaveDto templateSaveDto) {
        return Template.builder()
                .templateImage(templateSaveDto.getTemplateImage())
                .templateType(templateSaveDto.getTemplateType())
                .build();
    }
}
