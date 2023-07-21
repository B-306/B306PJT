package com.ssafy.B306.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserLoginRequestDto {
    private String userEmail;
    private String userPassword;
}
