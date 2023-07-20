package com.ssafy.B306.domain.user;

import com.ssafy.B306.domain.user.userDto.UserDto;
import com.ssafy.B306.domain.user.userDto.UserLoginRequest;
import com.ssafy.B306.domain.user.userDto.UserLoginResponse;
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
    public ResponseEntity<UserLoginResponse> login(@RequestBody UserLoginRequest userLoginRequest) {
        String token = userService.login(userLoginRequest.getUserId, userLoginRequest.getPassword());
        return new ResponseEntity<>(new UserLoginResponse(token), HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<UserLoginResponse> signUp(@RequestBody UserLoginRequest userLoginrequest){
        UserDto userDto = userService.signUp(userRegisterrequest);
        return new ResponseEntity<>(new UserRegisterResponse(userDto.getUserId()));
    }
}
