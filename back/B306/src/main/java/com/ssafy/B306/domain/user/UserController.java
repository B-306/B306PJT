package com.ssafy.B306.domain.user;

import com.ssafy.B306.domain.security.JwtToken;
import com.ssafy.B306.domain.user.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponseDto> login(@RequestBody UserLoginRequestDto userLoginRequest) {
        try{
            JwtToken token = userService.login(userLoginRequest);
            return new ResponseEntity<>(new UserLoginResponseDto(token), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<UserRegisterResponseDto> signUp(@RequestBody UserRegisterRequestDto userRegisterRequestDto){
        try{
            UserDto userDto = userService.signUp(userRegisterRequestDto);
            return new ResponseEntity<>(new UserRegisterResponseDto(userDto.getUserName()), HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
