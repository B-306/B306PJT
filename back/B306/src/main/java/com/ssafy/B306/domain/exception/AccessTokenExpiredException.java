package com.ssafy.B306.domain.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AccessTokenExpiredException extends RuntimeException {
    private ErrorCode errorCode;
    private String message;
}
