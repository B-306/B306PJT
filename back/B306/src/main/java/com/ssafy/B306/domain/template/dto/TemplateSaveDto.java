package com.ssafy.B306.domain.template.dto;

import com.ssafy.B306.domain.template.Template;
import com.ssafy.B306.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class TemplateSaveDto {

    @NotNull(message = "템플릿 이미지를 등록해주세요")
    private String templateImage;
    @NotNull(message = "템플릿의 문제유형을 선택해주세요")
    private char templateType;
    @NotNull
    private String templateName;
    @NotNull
    private User userPk;


    @Builder
    public TemplateSaveDto(String templateImage, char templateType, String templateName, User userPk) {
        this.templateImage = templateImage;
        this.templateType = templateType;
        this.templateName = templateName;
        this.userPk = userPk;
    }

    public Template toEntity(TemplateSaveDto templateSaveDto) {
        return Template.builder()
                .templateImage(templateSaveDto.getTemplateImage())
                .templateType(templateSaveDto.getTemplateType())
                .templateName(templateSaveDto.getTemplateName())
                .templateUserId(templateSaveDto.getUserPk())
                .build();
    }
}
