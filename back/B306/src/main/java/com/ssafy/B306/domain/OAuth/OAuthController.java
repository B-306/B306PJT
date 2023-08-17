package com.ssafy.B306.domain.OAuth;

import com.ssafy.B306.domain.exception.CustomException;
import com.ssafy.B306.domain.exception.ErrorCode;
import com.ssafy.B306.domain.user.User;
import com.ssafy.B306.domain.user.UserRepository;
import com.ssafy.B306.domain.user.UserService;
import com.ssafy.B306.domain.user.dto.UserDto;
import com.ssafy.B306.domain.user.dto.UserLoginRequestDto;
import com.ssafy.B306.domain.user.dto.UserRegisterRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/oauth2")
public class OAuthController {

    @Autowired
    public OAuthService oAuthService;
    @Autowired
    public UserRepository userRepository;
    @Autowired
    public UserService userService;
    @GetMapping("/kakao")
    public ResponseEntity<UserDto> kakaoLogin(@RequestParam(value="code", required = false) String code) throws Throwable{
        String accessToken = oAuthService.getAccessToken(code, "kakao");

        HashMap<String, Object> userInfo = oAuthService.getUserInfo(accessToken, "kakao");
        String userEmail = userInfo.get("email").toString();

        Optional<User> existingUser = null;
        existingUser = userRepository.findByUserEmail(userEmail);

        if (existingUser.isPresent()) {
            User exUser = existingUser.get();
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            UserDto newUser = userService.signUp(new UserRegisterRequestDto(
                    (String) userInfo.get("email"),
                    (String) userInfo.get("nickname"),
                    "1111",
                    ""
            ));
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        }
    }

    @GetMapping("/naver")
    public ResponseEntity<UserDto> naverLogin(@RequestParam(value="code", required = false) String code) throws Throwable{
        String accessToken = oAuthService.getAccessToken(code, "naver");

        HashMap<String, Object> userInfo = oAuthService.getUserInfo(accessToken, "naver");
        String userEmail = userInfo.get("email").toString();

        Optional<User> existingUser = null;
        existingUser = userRepository.findByUserEmail(userEmail);

        if (existingUser.isPresent()) {
            UserDto exUser = existingUser.get().toUserDto();
            return new ResponseEntity<>(exUser, HttpStatus.OK);
        } else {
            UserDto newUser = userService.signUp(new UserRegisterRequestDto(
                    (String) userInfo.get("email"),
                    (String) userInfo.get("nickname"),
                    "",
                    ""
            ));
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        }
    }
}
