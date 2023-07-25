package com.ssafy.B306.domain.template;

import com.ssafy.B306.domain.quiz.Quiz;
import com.ssafy.B306.domain.template.dto.TemplateDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "template")
@NoArgsConstructor
@Getter
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

    @OneToOne(mappedBy = "quizTemplateId", fetch = FetchType.LAZY)
    private Quiz quizId;

    @Column(name = "template_create_date")
    private LocalDateTime templateCreateDate;

    @Column(name = "template_modify_date")
    private LocalDateTime templateModifyDate;

    @Column(name = "template_delete_date")
    private LocalDateTime templateDeleteDate;

    @Builder
    public Template(Long templateId, String templateImage, char templateType,String templateName, Quiz quizId, LocalDateTime templateCreateDate, LocalDateTime templateModifyDate, LocalDateTime templateDeleteDate) {
        this.templateId = templateId;
        this.templateImage = templateImage;
        this.templateType = templateType;
        this.templateName = templateName;
        this.quizId = quizId;
        this.templateCreateDate = templateCreateDate;
        this.templateModifyDate = templateModifyDate;
        this.templateDeleteDate = templateDeleteDate;
    }

    public TemplateDto toTemplateDto() {
        return TemplateDto.builder()
                .templateId(this.getTemplateId())
                .templateImage(this.getTemplateImage())
                .templateType(this.getTemplateType())
                .templateName(this.getTemplateName())
                .quizId(this.getQuizId())
                .templateCreateDate(this.getTemplateCreateDate())
                .templateDeleteDate(this.getTemplateDeleteDate())
                .templateModifyDate(this.getTemplateModifyDate())
                .build();
    }
}
