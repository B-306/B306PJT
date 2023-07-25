package com.ssafy.B306.domain.user.dto;

import com.ssafy.B306.domain.quizbook.QuizBook;
import com.ssafy.B306.domain.user.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.*;

@Getter
@Setter
@Builder
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
}