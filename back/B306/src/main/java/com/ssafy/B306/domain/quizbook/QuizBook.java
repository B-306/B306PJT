package com.ssafy.B306.domain.quizbook;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.B306.domain.quiz.dto.QuizResponseDto;
import com.ssafy.B306.domain.quizbook.dto.QuizBookListResponseDto;
import com.ssafy.B306.domain.quizbook.dto.QuizBookResponseDto;
import com.ssafy.B306.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import static java.time.LocalDateTime.now;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "quizbook")
@SQLDelete(sql = "UPDATE quizbook SET quizbook_delete_date = now() WHERE quizbook_id = ?;")
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class QuizBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quizbook_id", nullable = false)
    private Long quizBookId;

    @Column(name = "quizbook_title", nullable = false)
    private String quizBookTitle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User quizBookUserId;

    @CreationTimestamp
    @Column(name = "quizbook_create_date")
    private LocalDateTime quizBookCreateDate;

    @Column(name = "quizbook_modify_date")
    private LocalDateTime quizBookModifyDate;

    @Column(name = "quizbook_delete_date")
    private LocalDateTime quizBookdeleteDate;

    @Builder
    public QuizBook(Long quizBookId, String quizBookTitle, User quizBookUserId, LocalDateTime quizBookCreateDate, LocalDateTime quizBookModifyDate, LocalDateTime quizBookdeleteDate) {
        this.quizBookId = quizBookId;
        this.quizBookTitle = quizBookTitle;
        this.quizBookUserId = quizBookUserId;
        this.quizBookCreateDate = quizBookCreateDate;
        this.quizBookModifyDate = quizBookModifyDate;
        this.quizBookdeleteDate = quizBookdeleteDate;
    }

    public static QuizBookResponseDto toDto(QuizBook quizBook, List<QuizResponseDto> quizList){
        QuizBookResponseDto quizBookResponseDto = new QuizBookResponseDto();
        quizBookResponseDto.setQuizBookId(quizBook.quizBookId);
        quizBookResponseDto.setQuizBookTitle(quizBook.getQuizBookTitle());
        quizBookResponseDto.setQuizList(quizList);
        return quizBookResponseDto;
    }

    public static QuizBookListResponseDto toListDto(QuizBook quizBook){
        QuizBookListResponseDto quizBookListResponseDto = new QuizBookListResponseDto();
        quizBookListResponseDto.setQuizBookId(quizBook.getQuizBookId());
        quizBookListResponseDto.setQuizBookTitle(quizBook.getQuizBookTitle());
        quizBookListResponseDto.setQuizBookUserEmail(quizBook.getQuizBookUserId().getUserEmail());
        quizBookListResponseDto.setQuizBookUserName(quizBook.getQuizBookUserId().getUserName());

        return quizBookListResponseDto;
    }

    public void modifyQuizBook(String quizBookTitle) {
        this.quizBookTitle = quizBookTitle;
        this.quizBookModifyDate = now();
    }

}
