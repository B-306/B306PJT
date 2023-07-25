package com.ssafy.B306.domain.user;

import com.ssafy.B306.domain.security.JwtAuthenticationProvider;
import com.ssafy.B306.domain.security.JwtUtil;
import com.ssafy.B306.domain.security.JwtToken;
import com.ssafy.B306.domain.user.dto.UserDto;
import com.ssafy.B306.domain.user.dto.UserLoginRequestDto;
import com.ssafy.B306.domain.user.dto.UserRegisterRequestDto;
import io.jsonwebtoken.Claims;
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


//    public JwtToken refreshToken(HttpServletRequest request) {
//        // access token 추출
//        String accessToken = request.getHeader("Authorization");
//        Claims token = jwtUtil.parseClaims(accessToken);
//
//        // access 토큰으로부터 userPk 추출 -> DB에서 refresh token 추출
//        String findRefreshToken = userRepository.
//                findTokenByUserID(token.get("userPk"))
//                .orElseThrow(()-> new RuntimeException("토큰 없어"));
//
//        if (jwtUtil.isExpired(findRefreshToken)) { // DB에 있는 토큰이 만료가 된거면
//            userRepository.deleteRefreshToken(token.get("userPk")); // DB에서 삭제 후 에러 던지기 -> front에서 fail로 인식
//            throw new RuntimeException("refresh까지 만료");
//        }
//
//        // 그게 아니라면
//        return jwtUtil.refreshToken(token);
//    }
}

