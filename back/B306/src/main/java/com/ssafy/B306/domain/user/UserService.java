package com.ssafy.B306.domain.user;

import com.ssafy.B306.domain.security.JwtProvider;
import com.ssafy.B306.domain.user.dto.UserDto;
import com.ssafy.B306.domain.user.dto.UserLoginRequestDto;
import com.ssafy.B306.domain.user.dto.UserRegisterRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public String login(UserLoginRequestDto userLoginRequest){
        User findUser = userRepository.findByUserEmail(userLoginRequest.getUserEmail());

        // DB에 찾는 것이 없거나 탈퇴날짜가 있는 경우
        if (findUser == null || findUser.getUserDeleteDate() != null ) {
            throw new RuntimeException("가입되지 않은 사람입니다");
        }

        // 비밀번호가 다를 경우
        if (!bCryptPasswordEncoder.matches(userLoginRequest.getUserPassword(), findUser.getUserPassword())) {
            throw new RuntimeException("비밀번호가 틀렸습니다");
        }

        // token 발행 CLASS 반환
        return null;
    }

    public UserDto signUp(UserRegisterRequestDto userRegisterRequestDto){

        if(userRepository.existsByUserEmail(userRegisterRequestDto.getUserEmail())){
            throw new RuntimeException("이미 가입된 이메일입니다.");
        }

        User resgistUser = userRepository.save(userRegisterRequestDto.toEntity(userRegisterRequestDto.getUserPassword()));
        return resgistUser.toUserDto();
    }


}

