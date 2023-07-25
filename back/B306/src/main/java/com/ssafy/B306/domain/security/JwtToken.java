package com.ssafy.B306.domain.security;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class JwtToken {
    private String grantType;
    private String accessToken;
    private String refreshToken;
}
