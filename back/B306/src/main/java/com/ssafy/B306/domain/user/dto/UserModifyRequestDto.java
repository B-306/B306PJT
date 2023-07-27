package com.ssafy.B306.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class UserModifyRequestDto {
    private String userName;
    private String userPassword;
    private String userProfile;

}
