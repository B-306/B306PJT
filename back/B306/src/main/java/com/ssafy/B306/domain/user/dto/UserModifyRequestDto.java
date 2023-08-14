package com.ssafy.B306.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserModifyRequestDto {
    private String userName;
    private String userPassword;

    @Builder
    public UserModifyRequestDto(String userName, String userPassword) {
        this.userName = userName;
        this.userPassword = userPassword;
    }
}
