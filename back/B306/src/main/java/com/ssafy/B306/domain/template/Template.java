package com.ssafy.B306.domain.template;

import com.ssafy.B306.domain.quiz.Quiz;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "template")
@NoArgsConstructor
@Getter
@Setter
public class Template {

    @Id @GeneratedValue
    @Column(name = "template_id", nullable = false)
    private Long templateId;


    @Column(name = "template_image", nullable = false)
    private String templateImage;

    @Column(name = "template_type", nullable = false)
    private char templateType;

    @OneToOne(mappedBy = "quizTemplateId", fetch = FetchType.LAZY)
    private Quiz quizId;

    @Column(name = "template_create_date")
    private LocalDateTime templateCreateDate;

    @Column(name = "template_modify_date")
    private LocalDateTime templateModifyDate;

    @Column(name = "template_delete_date")
    private LocalDateTime templateDeleteDate;

}
