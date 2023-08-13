package com.ssafy.B306.domain.security;

import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class JwtAuthenticationFilter extends GenericFilterBean {
    private final JwtUtil jwtUtil;


    public JwtAuthenticationFilter(JwtUtil jwtUtil){
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterchain) throws IOException, ServletException {

        // aceess token 꺼내기
        String accessToken = resolveToken((HttpServletRequest) servletRequest);

        // 토큰 유효성 검사
        if(accessToken == null || !jwtUtil.validateToken(accessToken)) {
            log.error("잘못된 token");
            filterchain.doFilter(servletRequest, servletResponse);
            return;
        }

        Authentication authentication = jwtUtil.getAuthentication(accessToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 다음 필터로 넘김
        filterchain.doFilter(servletRequest, servletResponse);
    }


    // 헤더에서 토큰 추출
    private String resolveToken(HttpServletRequest httpServletRequest){
        String bearerToken = httpServletRequest.getHeader("Authorization");

        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")){
            // "Bearer" 다음에 오는 부분 문자열 추출 = token
            return bearerToken.substring(7);
        }

        // 조건에 부합하지 않으면 그냥 return null
        return null;
    }

}
