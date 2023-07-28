package com.ssafy.B306.domain.quizbook;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.B306.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    public void modifyQuizBook(String quizBookTitle) {
        this.quizBookTitle = quizBookTitle;
    }

}
