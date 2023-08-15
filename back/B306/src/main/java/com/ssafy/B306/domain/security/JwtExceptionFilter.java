//package com.ssafy.B306.domain.security;
//
//import com.ssafy.B306.domain.exception.JwtExceptionResponse;
//import io.jsonwebtoken.JwtException;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//public class JwtExceptionFilter extends OncePerRequestFilter {
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        try {
//            filterChain.doFilter(request, response);
//        } catch (JwtException e) {
//            setErrorResponse(HttpStatus.UNAUTHORIZED, response, e);
//        }
//    }
//
//    private void setErrorResponse(HttpStatus httpStatus, HttpServletResponse response, JwtException e) throws IOException {
//        response.setStatus(httpStatus.value());
//        response.setContentType("application/json; charset=UTF-8");
//
//        JwtExceptionResponse jwtExceptionResponse = new JwtExceptionResponse(e.getMessage());
//        response.getWriter().write(jwtExceptionResponse.convertToJson());
//    }
//}
