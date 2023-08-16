package com.ssafy.B306.domain.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

// JWT 인증을 위해 생성되는 토큰
// 요청이 들어오면 헤더에서 토큰 추출하는 역할
@Slf4j
public class JwtAuthenticationFilter extends GenericFilterBean {
    private final JwtUtil jwtUtil;


    public JwtAuthenticationFilter(JwtUtil jwtUtil){
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterchain) throws IOException, ServletException {

        // aceess token 꺼내기
        String accessToken = jwtUtil.resolveToken((HttpServletRequest) servletRequest);

        // 토큰 유효성 검사
        if (accessToken != null && jwtUtil.validateToken(accessToken)) {

            if (!((HttpServletRequest) servletRequest).getRequestURI().equals("/user/refresh")) {
                Authentication authentication = jwtUtil.getAuthentication(accessToken);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterchain.doFilter(servletRequest, servletResponse);
    }
}
