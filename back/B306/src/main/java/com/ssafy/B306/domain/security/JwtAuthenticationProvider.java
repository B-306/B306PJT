package com.ssafy.B306.domain.security;

import com.ssafy.B306.domain.user.User;
import com.ssafy.B306.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;


@RequiredArgsConstructor
@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {

    private final UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        // DB와 결과 비교해서
        // user 처리
        // 이걸 통과한게 인증이 된 것이라고 생각해도 무방
        System.out.println("이게 이름인지 비밀번호인지" + authentication.getName());
        System.out.println("이게 이름인지 비밀번호인지" + authentication.getCredentials());

        User find = userRepository.findByUserEmail(authentication.getName()).orElseThrow(()-> new RuntimeException("유저 없어"));

        System.out.println(find.getUserPassword());
        System.out.println(authentication.getCredentials() instanceof String);
//        find.orElseThrow(() -> new RuntimeException("없다"));

//        bCryptPasswordEncoder.matches((String) authentication.getCredentials(), find.getUserPassword());

        System.out.println(authentication + "==========123");
//        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken("user@asd.com", "1234"));
        return new UsernamePasswordAuthenticationToken("rrrrrrr", "1234");
    }

    // support를 먼저 보고 false면 authenticate 호출 안함
    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }
}
