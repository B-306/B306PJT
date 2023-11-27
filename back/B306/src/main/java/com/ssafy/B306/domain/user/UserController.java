package com.ssafy.B306.domain.user;

import com.ssafy.B306.domain.user.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequestDto userLoginRequest) {
        return new ResponseEntity<>(userService.login(userLoginRequest), HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<UserSignUpResponseDto> signUp(@RequestBody UserRegisterRequestDto userRegisterRequestDto){
        return new ResponseEntity<>(new UserSignUpResponseDto(
                userService.signUp(userRegisterRequestDto)
                           .getUserName()),
                HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        return userService.refreshToken(request);
    }

    @PatchMapping("/modify")
    public ResponseEntity<?> modifyUser(@RequestBody UserModifyRequestDto userModifyRequestDto, HttpServletRequest request) {
        userService.modify(userModifyRequestDto, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/delete")
    public void deleteUser(HttpServletRequest request) {
        userService.deleteUser(request);
    }

    @PostMapping("/email")
    public ResponseEntity<Void> authMail(@RequestBody EmailRequestDto emailRequestDto){
        userService.authMail(emailRequestDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/email/auth")
    public ResponseEntity<String> validAuthMailCode(@RequestBody EmailAuthRequestDto emailAuthRequestDto){

        if(userService.validAuthMailCode(emailAuthRequestDto))
            return ResponseEntity.ok("인증되었습니다.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("인증코드를 확인해주세요.");
    }
}
