package com.ssafy.B306.domain.quizbook;

import com.ssafy.B306.domain.quiz.Quiz;
import com.ssafy.B306.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "quizbook")
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

    @OneToMany(mappedBy = "quizId", fetch = FetchType.LAZY)
    private List<Quiz> quizzes = new ArrayList<>();
}
