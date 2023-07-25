package com.ssafy.B306.domain.user.dto;

import com.ssafy.B306.domain.security.JwtToken;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserLoginResponseDto {
    private JwtToken token;
}
