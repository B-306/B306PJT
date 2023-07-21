package com.ssafy.B306.domain.user.dto;

import com.ssafy.B306.domain.user.User;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class UserRegisterRequestDto {
    private String userEmail;
    private String userName;
    private String userPassword;

    public User toEntity(String password){
        return User.builder()
                .userEmail(this.userEmail)
                .userName(this.userName)
                .userPassword(password)
                .build();
    }
}
