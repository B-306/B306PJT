package com.ssafy.B306.domain.template;

import com.ssafy.B306.domain.quiz.Quiz;
import com.ssafy.B306.domain.template.dto.TemplateResponseDto;
import com.ssafy.B306.domain.template.dto.TemplateSaveDto;
import com.ssafy.B306.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;


import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "template")
@NoArgsConstructor
@Getter
@SQLDelete(sql = "UPDATE template SET template_delete_date = now() WHERE template_id = ?;")
public class Template {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "template_id", nullable = false)
    private Long templateId;

    @Column(name = "template_image", nullable = false)
    private String templateImage;

    @Column(name = "template_type", nullable = false)
    private char templateType;

    @Column(name = "template_name")
    private String templateName;

    @OneToMany
    private List<Quiz> quizId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User templateUserId;

    @CreationTimestamp
    @Column(name = "template_create_date")
    private LocalDateTime templateCreateDate;

    @Column(name = "template_modify_date")
    private LocalDateTime templateModifyDate;

    @Column(name = "template_delete_date")
    private LocalDateTime templateDeleteDate;

    @Builder
    public Template(Long templateId, String templateImage, char templateType,String templateName, List<Quiz> quizId, User templateUserId, LocalDateTime templateCreateDate, LocalDateTime templateModifyDate, LocalDateTime templateDeleteDate) {
        this.templateId = templateId;
        this.templateImage = templateImage;
        this.templateType = templateType;
        this.templateName = templateName;
        this.quizId = quizId;
        this.templateUserId = templateUserId;
        this.templateCreateDate = templateCreateDate;
        this.templateModifyDate = templateModifyDate;
        this.templateDeleteDate = templateDeleteDate;
    }


    public void modifyTemplate(TemplateSaveDto templateSaveDto) {
        this.templateType = templateSaveDto.getTemplateType();
        this.templateName = templateSaveDto.getTemplateName();
        this.templateModifyDate = LocalDateTime.now();
    }


    public void modifyTemplateImage(String savePath) {
        this.templateImage = savePath;
        this.templateModifyDate = LocalDateTime.now();
    }

    public static TemplateResponseDto makeTemplateDto(Template template){
        return TemplateResponseDto.builder()
                .templateId(template.templateId)
                .templateImage(template.getTemplateImage())
                .templateType(template.getTemplateType())
                .templateName(template.getTemplateName())
                .build();
    }
}