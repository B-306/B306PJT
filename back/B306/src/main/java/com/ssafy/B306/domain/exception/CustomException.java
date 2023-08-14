package com.ssafy.B306.domain.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {
    private ErrorCode errorCode;
    private String message;

    public CustomException(ErrorCode errorCode) {
        this.errorCode = errorCode;
        this.message = errorCode.getMessage();
    }

    // 에러 발생 시 Stack Trace의 생성 비용 감소
    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
}
