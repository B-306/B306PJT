package com.ssafy.B306.domain.user;

import org.springframework.web.bind.annotation.*;

@RestController("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public void login(@RequestBody User user) {
        userService.login(user);
    }

}
