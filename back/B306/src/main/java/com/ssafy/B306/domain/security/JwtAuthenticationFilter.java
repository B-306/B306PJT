package com.ssafy.B306.domain.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

// JWT 인증을 위해 생성되는 토큰
// 요청이 들어오면 헤더에서 토큰 추출하는 역할
public class JwtAuthenticationFilter extends GenericFilterBean {
    private final JwtProvider jwtProvider;


    public JwtAuthenticationFilter(JwtProvider jwtProvider){
        this.jwtProvider = jwtProvider;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterchain) throws IOException, ServletException {
        String token = resolveToken((HttpServletRequest) servletRequest);

        // 토큰 유효성 검사
        if(token != null && jwtProvider.validateToken(token)) {
            Authentication authentication = jwtProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterchain.doFilter(servletRequest, servletResponse);
    }


    // 헤더에서 토큰 추출
    private String resolveToken(HttpServletRequest httpServletRequest){
        String bearerToken = httpServletRequest.getHeader("Authorization");

        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")){
            return bearerToken.substring(7);
        }

        return null;
    }

}
