package com.ssafy.B306.domain.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserEmailDuplicatedException extends RuntimeException{

    private ErrorCode errorCode;
    private String message; // 어떤 상황인지

//    @Override
//    public synchronized Throwable fillInStackTrace() {
//        return this;
//    }
}
