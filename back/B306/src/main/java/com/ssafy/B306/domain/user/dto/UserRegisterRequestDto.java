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
    private String userProfile;

    public User toEntity(String password){
        return User.builder()
                .userEmail(this.userEmail)
                .userName(this.userName)
                .userProfile("https://cdn-icons-png.flaticon.com/128/771/771372.png")
                .userPassword(password)
                .build();
    }
}
