package com.ssafy.B306.domain.user.dto;

import com.ssafy.B306.domain.security.JwtToken;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserLoginResponseDto {
    private JwtToken token;

    public UserLoginResponseDto(JwtToken token) {
        this.token = token;
    }
}
