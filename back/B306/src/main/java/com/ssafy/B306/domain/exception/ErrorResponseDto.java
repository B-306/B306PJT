package com.ssafy.B306.domain.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponseDto {
    private String errorCode;
    private String errorMessage;
}
