package com.ssafy.B306.domain.user;

import com.ssafy.B306.domain.quizbook.QuizBook;
import com.ssafy.B306.domain.user.userDto.UserDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {

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

    @Column(name = "user_profile")
    private String userProfile;

    @Column(name = "user_join_date")
    private LocalDateTime userJoinDate;

    @Column(name = "user_modify_date")
    private LocalDateTime userModifyDate;

    @Column(name = "user_delete_date")
    private LocalDateTime userDeleteDate;

    @OneToMany(mappedBy = "quizBookId")
    private List<QuizBook> quizBooks = new ArrayList<>();


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
}
