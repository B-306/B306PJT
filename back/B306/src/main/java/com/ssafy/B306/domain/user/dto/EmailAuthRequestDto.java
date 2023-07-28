package com.ssafy.B306.domain.user.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class EmailAuthRequestDto {

    @NotBlank(message = "인증코드를 입력해주세요.")
    private String authCode;

    @Email
    private String email;
}
