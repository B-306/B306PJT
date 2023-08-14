package com.ssafy.B306.domain.security.config;

import com.ssafy.B306.domain.security.JwtAuthenticationFilter;
import com.ssafy.B306.domain.security.JwtAuthenticationProvider;
import com.ssafy.B306.domain.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig  {

    private final JwtUtil jwtUtil;
    private final JwtAuthenticationProvider jwtAuthenticationProvider;
//    private final JwtExceptionFilter jwtExceptionFilter;

//    @Bean
//    public JwtExceptionFilter jwtExceptionFilter() {
//        return new JwtExceptionFilter();
//    }
    // 비밀번호 암호화를 위한 빈 등록
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


    // 필터로 보낼 경로 정하기
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity
                .cors()
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .authorizeRequests()
//                .antMatchers("/**").permitAll()
                .antMatchers("/user/login", "/user/signup").permitAll()
                .antMatchers("/**").authenticated()
//                .antMatchers("/user/signup").permitAll()
                .and()
                .authenticationProvider(jwtAuthenticationProvider)
                .addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JwtExceptionFilter(), JwtAuthenticationFilter.class);
        return httpSecurity.build();
    }
}
