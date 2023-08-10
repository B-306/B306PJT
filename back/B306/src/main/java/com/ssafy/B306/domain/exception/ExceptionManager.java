package com.ssafy.B306.domain.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionManager {
    /*
    요청이 들어왔을 때 에러가 나면 ExceptionHandler에 들어와서 작동
     */
    @ExceptionHandler(AccessTokenExpiredException.class)
    public ResponseEntity<?> accessTokenExpiredExceptionHandler(AccessTokenExpiredException e) {
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
                .body(e.getErrorCode().name() + " " + e.getMessage());
    }

    @ExceptionHandler(UserEmailDuplicatedException.class)
    public ResponseEntity<?> userEmailDuplicatedExceptionHandler(UserEmailDuplicatedException e) {
        return ResponseEntity
                .status(e.getErrorCode().getHttpStatus())
//                .body(ErrorResponseDto.builder()
//                        .errorCode(e.getErrorCode().name())
//                        .errorMessage(e.getMessage())
//                        .build());
                .body(e.getErrorCode().name() + " " + e.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> runtimeExceptionHandler(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(e.getMessage());
    }
}
