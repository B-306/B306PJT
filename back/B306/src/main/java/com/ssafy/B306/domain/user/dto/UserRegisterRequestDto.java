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
                .userProfile("https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/neo2.png")
                .userPassword(password)
                .build();
    }
}
