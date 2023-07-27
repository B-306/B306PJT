package com.ssafy.B306.domain.user;

import com.ssafy.B306.domain.security.JwtToken;
import com.ssafy.B306.domain.user.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequestDto userLoginRequest) {
        Map<String, Object> resultMap = new HashMap<>();
        try{
            JwtToken token = userService.login(userLoginRequest);
            HttpHeaders header = new HttpHeaders();
            header.add("accessToken", token.getAccessToken());
            header.add("refreshToken", token.getRefreshToken());

            resultMap.put("userName", null);

            return new ResponseEntity<>(resultMap, header, HttpStatus.OK);
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

    /*
    이거 구현하려면 refresh token을 DB에 저장을 해야할듯한데
    1. user table에 저장하는 방식
    2. refresh token table을 만들어 저장 (user_id, refresh token, delete_date)
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        try {
            // 여기는 access token만 있음
            JwtToken token = userService.refreshToken(request);
            return new ResponseEntity<>(token, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> deleteToken(HttpServletRequest request) {
        try {
            HttpHeaders header = new HttpHeaders();
            header.add("token", userService.logout(request));
            String responseBody = "SUCCESS";

            return new ResponseEntity<>(responseBody, header, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/modify")
    public ResponseEntity<?> modifyUser(@RequestBody UserModifyRequestDto userModifyRequestDto, HttpServletRequest request) {
        try {
            userService.modify(userModifyRequestDto, request);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/delete")
    public void deleteUser(HttpServletRequest request) {
        userService.deleteUser(request);
    }

    @PostMapping("/email")
    public ResponseEntity<Void> authMail(@RequestBody EmailRequest request){
        userService.authMail(request);
        return ResponseEntity.ok().build();
    }
}
