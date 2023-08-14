package com.ssafy.B306.domain.user.dto;

import com.ssafy.B306.domain.quizbook.QuizBook;
import lombok.*;

import java.time.LocalDateTime;
import java.util.*;

@Getter
@RequiredArgsConstructor
public class UserDto {
    private final Long userId;
    private final String userEmail;
    private final String userName;
    private final String userPassword;
    private boolean isAdmin;
    private String userProfile;
    private LocalDateTime userJoinDate;
    private LocalDateTime userModifyDate;
    private LocalDateTime userDeleteDate;
    private List<QuizBook> quizBooks;

    @Builder
    public UserDto(Long userId, String userEmail, String userName, String userPassword, boolean isAdmin, String userProfile, LocalDateTime userJoinDate, LocalDateTime userModifyDate, LocalDateTime userDeleteDate, List<QuizBook> quizBooks) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.userName = userName;
        this.userPassword = userPassword;
        this.isAdmin = isAdmin;
        this.userProfile = userProfile;
        this.userJoinDate = userJoinDate;
        this.userModifyDate = userModifyDate;
        this.userDeleteDate = userDeleteDate;
        this.quizBooks = quizBooks;
    }
}