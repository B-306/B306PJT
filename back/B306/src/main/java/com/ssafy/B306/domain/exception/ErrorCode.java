package com.ssafy.B306.domain.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    ACCESSTOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "Access Token이 만료되었습니다."),
    REFRESH_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "Refresh Token이 만료되었습니다."),

    USER_NOT_FOUND(HttpStatus.BAD_REQUEST, "해당 유저가 없습니다."),
    USEREMAIL_DUPLICATED(HttpStatus.CONFLICT, "이미 가입된 이메일입니다."),

    TEMPLATE_NOT_FOUND(HttpStatus.BAD_REQUEST, "템플릿이 없습니다."),
    TEMPLATE_NOT_FOUND_OR_UNAUTHORIZED(HttpStatus.BAD_REQUEST, "존재하지 않거나 변경 권한이 없는 템플릿입니다."),
    ;

    private HttpStatus httpStatus;
    private String message;
}
