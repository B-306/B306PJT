package com.ssafy.B306.domain.exception;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ErrorResponseDto {
    private final ErrorCode errorCode;
    private final String errorMessage;

    @Builder
    public ErrorResponseDto(ErrorCode errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
