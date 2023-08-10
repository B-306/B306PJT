package com.ssafy.B306.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.B306.domain.quizbook.QuizBook;
import com.ssafy.B306.domain.template.Template;
import com.ssafy.B306.domain.user.dto.UserDto;
import com.ssafy.B306.domain.user.dto.UserModifyRequestDto;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "user")
@SQLDelete(sql = "UPDATE user SET user_delete_date = now() WHERE user_id = ?;")
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class User {
    /*
    userStatus : 회원의 상태를 정하는 컬럼으로 0 : 탈퇴, 1 : 회원, 2 : 관리자 등등
     */

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_password", nullable = false)
    private String userPassword;

    @Column(name = "is_admin")
    private boolean isAdmin;

    @Column(name = "user_profile", columnDefinition = "VARCHAR(255) DEFAULT 'https://cdn-icons-png.flaticon.com/128/771/771372.png'")
    private String userProfile;

    @CreationTimestamp
    @Column(name = "user_join_date")
    private LocalDateTime userJoinDate;

    @Column(name = "user_modify_date")
    private LocalDateTime userModifyDate;

    @Column(name = "user_delete_date")
    private LocalDateTime userDeleteDate;

    @Builder
    public User(Long userId, String userEmail, String userName, String userPassword, boolean isAdmin, String userProfile, LocalDateTime userJoinDate, LocalDateTime userModifyDate, LocalDateTime userDeleteDate) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.userName = userName;
        this.userPassword = userPassword;
        this.isAdmin = isAdmin;
        this.userProfile = userProfile;
        this.userJoinDate = userJoinDate;
        this.userModifyDate = userModifyDate;
        this.userDeleteDate = userDeleteDate;
    }

    public UserDto toUserDto(){
        return UserDto.builder()
                .userId(this.getUserId())
                .userName(this.getUserName())
                .userEmail(this.getUserEmail())
                .userPassword(this.getUserPassword())
                .isAdmin(this.isAdmin())
                .userProfile(this.getUserProfile())
                .userJoinDate(this.getUserJoinDate())
                .build();
    }

    public void modifyUser(UserModifyRequestDto userModifyDto) {
        userName = userModifyDto.getUserName();
        userPassword = userModifyDto.getUserPassword();
//        userProfile = userModifyDto.getUserProfile();
        userModifyDate = LocalDateTime.now();
    }

    public void modifyUserImage(String savePath) {
        userProfile = savePath;
    }

    public User modifyUserName(String userName) {
        this.userName = userName;
        return this;
    }

}