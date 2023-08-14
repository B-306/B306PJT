package com.ssafy.B306.domain.user.dto;

import com.ssafy.B306.domain.user.User;
import lombok.*;

@NoArgsConstructor
@Getter
public class UserRegisterRequestDto {
    private String userEmail;
    private String userName;
    private String userPassword;
    private String userProfile;

    @Builder
    public UserRegisterRequestDto(String userEmail, String userName, String userPassword, String userProfile) {
        this.userEmail = userEmail;
        this.userName = userName;
        this.userPassword = userPassword;
        this.userProfile = userProfile;
    }

    public User toEntity(String password){
        return User.builder()
                .userEmail(this.userEmail)
                .userName(this.userName)
                .userProfile("https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/neo2.png")
                .userPassword(password)
                .build();
    }
}
