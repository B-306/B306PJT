package com.ssafy.B306.domain.user;

import com.ssafy.B306.domain.security.JwtAuthenticationProvider;
import com.ssafy.B306.domain.security.JwtProvider;
import com.ssafy.B306.domain.security.JwtToken;
import com.ssafy.B306.domain.user.dto.UserDto;
import com.ssafy.B306.domain.user.dto.UserLoginRequestDto;
import com.ssafy.B306.domain.user.dto.UserRegisterRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
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
//        User findUser = userRepository.findByUserEmail(userLoginRequest.getUserEmail());
//
//        // DB에 찾는 것이 없거나 탈퇴날짜가 있는 경우
//        if (findUser == null || findUser.getUserDeleteDate() != null ) {
//            throw new RuntimeException("가입되지 않은 사람입니다");
//        }
//
//        // 비밀번호가 다를 경우
//        if (!bCryptPasswordEncoder.matches(userLoginRequest.getUserPassword(), findUser.getUserPassword())) {
//            throw new RuntimeException("비밀번호가 틀렸습니다");
//        }
//        // token 발행 CLASS 반환
//        return ;
        String rawPassword = userLoginRequest.getUserPassword();
        String encodedPassword = bCryptPasswordEncoder.encode(rawPassword);

        // 근데 내가 어차피 권한을 사용 안한다면?
        // 그냥 여기서 비밀번호랑 DB에 있는 비밀번호랑 비교하면 끝 아닌가?
//        bCryptPasswordEncoder.matches(rawPassword, "DB에 있는 password");


        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userLoginRequest.getUserEmail(), userLoginRequest.getUserPassword());

//        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

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

