package com.ssafy.B306.domain.user.userDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserLoginRequest {
    private Long userId;
    private String userPassword;
}
