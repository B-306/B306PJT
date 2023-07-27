package com.ssafy.B306.domain.user.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class EmailRequest {
    @Email
    @NotBlank(message = "이메일을 입력해주세요.")
    private String email;
}
