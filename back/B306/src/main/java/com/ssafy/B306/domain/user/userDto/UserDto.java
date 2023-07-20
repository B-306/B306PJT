package com.ssafy.B306.domain.user.userDto;

import com.ssafy.B306.domain.quizbook.QuizBook;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
    private final Long userId;
    private final String userEmail;
    private final String userName;
    private final String userPassword;
    private boolean isAdmin;
    private String userProfile;
    private LocalDateTime userJoinDate;
    private LocalDateTime userModifyDate;
    private LocalDateTime userDeleteDate;
    private List<QuizBook> quizBooks = new ArrayList<>();

    private UserDTO(UserBuilder builder) {
        this.userId = builder.userId;
        this.userEmail = builder.userEmail;
        this.userName = builder.userName;
        this.userPassword = builder.userPassword;
        this.isAdmin = builder.isAdmin;
        this.userProfile = builder.userProfile;
        this.userJoinDate = builder.userJoinDate;
        this.userModifyDate = builder.userModifyDate;
        this.userDeleteDate = builder.userDeleteDate;
        this.quizBooks = builder.quizBooks;
    }

    public static class UserBuilder {
        private final Long userId;
        private final String userEmail;
        private final String userName;
        private final String userPassword;
        private boolean isAdmin;
        private String userProfile;
        private LocalDateTime userJoinDate;
        private LocalDateTime userModifyDate;
        private LocalDateTime userDeleteDate;
        private List<QuizBook> quizBooks = new ArrayList<>();

        public UserBuilder(Long userId, String userEmail, String userName, String userPassword) {
            this.userId = userId;
            this.userEmail = userEmail;
            this.userName = userName;
            this.userPassword = userPassword;
        }

        public UserBuilder isAdmin(boolean isAdmin) {
            this.isAdmin = isAdmin;
            return this;
        }

        public UserBuilder userProfile(String userProfile) {
            this.userProfile = userProfile;
            return this;
        }

        public UserBuilder userJoinDate(LocalDateTime userJoinDate) {
            this.userJoinDate = userJoinDate;
            return this;
        }

        public UserBuilder userModifyDate(LocalDateTime userModifyDate) {
            this.userModifyDate = userModifyDate;
            return this;
        }

        public UserBuilder userDeleteDate(LocalDateTime userDeleteDate) {
            this.userDeleteDate = userDeleteDate;
            return this;
        }

        public UserBuilder quizBooks(List<QuizBook> quizBooks) {
            this.quizBooks = quizBooks;
            return this;
        }

        public UserDTO build() {
            return new UserDTO(this);
        }
    }
}
