package com.ssafy.B306.domain.quiz;

import com.ssafy.B306.domain.quizbook.QuizBook;
import com.ssafy.B306.domain.template.Template;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "quiz")
public class Quiz {

    @Id @GeneratedValue
    @Column(name = "quiz_id", nullable = false)
    private Long quizId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "template_id")
    private Template quizTemplateId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quizbook_id")
    private QuizBook quizBookId;

    @Column(name = "quiz_text", nullable = false)
    private String quizText;

    @Column(name = "quiz_answer", nullable = false)
    private char quizAnswer;

    @Column(name = "quiz_create_date")
    private LocalDateTime quizCreateDate;

    @Column(name = "quiz_modify_date")
    private LocalDateTime quizModifyDate;

    @Column(name = "quiz_delete_date")
    private LocalDateTime quizDelteDate;
}
