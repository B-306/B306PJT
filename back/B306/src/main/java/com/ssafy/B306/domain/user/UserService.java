package com.ssafy.B306.domain.user;

import com.ssafy.B306.domain.security.JwtAuthenticationProvider;
import com.ssafy.B306.domain.security.JwtProvider;
import com.ssafy.B306.domain.security.JwtToken;
import com.ssafy.B306.domain.user.dto.UserDto;
import com.ssafy.B306.domain.user.dto.UserLoginRequestDto;
import com.ssafy.B306.domain.user.dto.UserRegisterRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtProvider jwtProvider;
    private final JwtAuthenticationProvider jwtAuthenticationProvider;

    public JwtToken login(UserLoginRequestDto userLoginRequest){

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userLoginRequest.getUserEmail(), userLoginRequest.getUserPassword());

        Authentication authentication = jwtAuthenticationProvider.authenticate(authenticationToken);

        JwtToken token = jwtProvider.createToken(authentication);

        return token;
    }

    public UserDto signUp(UserRegisterRequestDto userRegisterRequestDto){

        if(userRepository.existsByUserEmail(userRegisterRequestDto.getUserEmail())){
            throw new RuntimeException("이미 가입된 이메일입니다.");
        }

        // 비밀번호 암호화
        String rawPassword = userRegisterRequestDto.getUserPassword();
        String encodedPassword = bCryptPasswordEncoder.encode(rawPassword);

        User resgistUser = userRepository.save(userRegisterRequestDto.toEntity(encodedPassword));

        return resgistUser.toUserDto();
    }


}

