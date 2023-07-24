package com.ssafy.B306.domain.security;

import com.ssafy.B306.domain.user.User;
import com.ssafy.B306.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@RequiredArgsConstructor
@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {

    private final UserRepository userRepository;
    // 이거 왜 final 붙으면 안되는지 아는 사람있나?
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        // DB와 결과 비교해서
        // user 처리
        // 이걸 통과한게 인증이 된 것이라고 생각해도 무방

        // DB에 있는 유저 가져오기 => 근데 DTO로 받아야하나?
        // 그냥 값만 가져오면 Entity
        // 수정한 값을 변경하먄 DTO
        User findUser = userRepository.findByUserEmail(authentication.getName()).orElseThrow(()-> new RuntimeException("유저 없어"));

        /*
        로그인이 안될 경우
        1. 아이디가 틀렸을 때
        2. 비밀번호를 틀렸을 때
        3. 회원가입을 안했을 때
        4. 탈퇴한 아이디일 때
         */
        bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if (!bCryptPasswordEncoder.matches((String) authentication.getCredentials(), findUser.getUserPassword()) // 비밀번호 불일치하거나
                || findUser.getUserDeleteDate() != null) {// 삭제한 날짜가 있다면 => 탈퇴한 회원이거나
            throw new RuntimeException("아이디 또는 비밀번호를 확인하세요");
        }


        // 권한 부여(역할 부여)
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        if (findUser.isAdmin()) authorities.add(new SimpleGrantedAuthority("ADMIN"));
        else authorities.add(new SimpleGrantedAuthority("USER"));

        return new UsernamePasswordAuthenticationToken(authentication.getPrincipal(), findUser.getUserId(), authorities);
    }

    // support를 먼저 보고 false면 authenticate 호출 안함
    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }
}
