package com.ssafy.B306.domain.user.userDto;

import com.ssafy.B306.domain.user.User;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class UserRegisterRequest {
    private Long userId;
    private String userEmail;
    private String userName;
    private String userPassword;

    public User toEntity(String password){
//        return new UserBuilder(this.userId, this.userEmail, this.userName, password).build();
        return User.builder()
                .userId(this.userId)
                .userEmail(this.userEmail)
                .userName(this.userName)
                .userPassword(password)
                .build();
    }
}
