package com.ssafy.B306.domain.config;

import javax.servlet.Filter;

public class JwtAuthenticationFilter implements Filter {
    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
    }
}
