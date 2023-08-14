package com.ssafy.B306.domain.exception;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class ErrorResponseDto {
    private final ErrorCode errorCode;
    private final String errorMessage;
}
