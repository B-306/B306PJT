package com.ssafy.B306.domain.user;

import com.ssafy.B306.domain.security.JwtAuthenticationProvider;
import com.ssafy.B306.domain.security.JwtUtil;
import com.ssafy.B306.domain.security.JwtToken;
import com.ssafy.B306.domain.user.dto.UserDto;
import com.ssafy.B306.domain.user.dto.UserLoginRequestDto;
import com.ssafy.B306.domain.user.dto.UserModifyRequestDto;
import com.ssafy.B306.domain.user.dto.UserRegisterRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtUtil jwtUtil;
    private final JwtAuthenticationProvider jwtAuthenticationProvider;

    public JwtToken login(UserLoginRequestDto userLoginRequest){

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userLoginRequest.getUserEmail(), userLoginRequest.getUserPassword());

        Authentication authentication = jwtAuthenticationProvider.authenticate(authenticationToken);

        JwtToken token = jwtUtil.createToken(authentication);

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


    public JwtToken refreshToken(HttpServletRequest request) {
        // access token 추출
        String refreshToken = request.getHeader("refreshToken");
        String accessToken = request.getHeader("accessToken");

        if (jwtUtil.isExpired(refreshToken)) { // DB에 있는 토큰이 만료가 된거면
            throw new RuntimeException("refresh까지 만료");
        }

        return jwtUtil.refreshToken(accessToken);
    }

    public String logout(HttpServletRequest request) {
        // 로그아웃 기능을 뭘로 해야할지 모르겠습니다
        return null;
    }

    public void modify(UserModifyRequestDto userModifyDto, HttpServletRequest request) {
        Long userPk = jwtUtil.extractToken(request, "userPk");

    }
}

