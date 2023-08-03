package com.ssafy.B306.domain.quiz;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.B306.domain.quiz.dto.QuizRequestSaveDto;
import com.ssafy.B306.domain.quiz.dto.QuizResponseDto;
import com.ssafy.B306.domain.quizbook.QuizBook;
import com.ssafy.B306.domain.template.Template;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "quiz")
@JsonIgnoreProperties({"hibernateLazyInitializer"})
@SQLDelete(sql = "UPDATE quiz SET quiz_delete_date = now() WHERE quiz_id = ?;")
public class Quiz {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_id", nullable = false)
    private Long quizId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "template_id")
    private Template quizTemplateId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quizbook_id")
    private QuizBook quizBookId;

    @Column(name = "quiz_text", nullable = false)
    private String quizText;

    @Column(name = "quiz_answer", nullable = false)
    private char quizAnswer;

    @CreationTimestamp
    @Column(name = "quiz_create_date")
    private LocalDateTime quizCreateDate;

    @Column(name = "quiz_modify_date")
    private LocalDateTime quizModifyDate;

    @Column(name = "quiz_delete_date")
    private LocalDateTime quizDelteDate;

    @Builder
    public Quiz(Long quizId, Template quizTemplateId, QuizBook quizBookId, String quizText, char quizAnswer, LocalDateTime quizCreateDate, LocalDateTime quizModifyDate, LocalDateTime quizDelteDate) {
        this.quizId = quizId;
        this.quizTemplateId = quizTemplateId;
        this.quizBookId = quizBookId;
        this.quizText = quizText;
        this.quizAnswer = quizAnswer;
        this.quizCreateDate = quizCreateDate;
        this.quizModifyDate = quizModifyDate;
        this.quizDelteDate = quizDelteDate;
    }

    public QuizRequestSaveDto toRequestDto(Quiz quiz, QuizBook id){
        QuizRequestSaveDto quizRequestSaveDto = new QuizRequestSaveDto();
        quizRequestSaveDto.setQuizBookId(id);
        quizRequestSaveDto.setQuizText(quiz.getQuizText());
        quizRequestSaveDto.setQuizAnswer(quiz.getQuizAnswer());

        return quizRequestSaveDto;
    }

    public QuizResponseDto toDto(Quiz quiz){
        QuizResponseDto quizResponseDto = new QuizResponseDto();
        quizResponseDto.setQuizId(quiz.getQuizId());
        quizResponseDto.setQuizTemplateId(quiz.getQuizTemplateId());
        quizResponseDto.setQuizText(quiz.getQuizText());
        quizResponseDto.setQuizAnswer(quiz.getQuizAnswer());

        return quizResponseDto;
    }

    public void modifyQuiz(QuizRequestSaveDto quiz) {
        quizText = quiz.getQuizText();
        quizAnswer = quiz.getQuizAnswer();
    }

}
