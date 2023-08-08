package com.ssafy.B306.domain.OAuth;

import com.ssafy.B306.domain.user.User;
import lombok.Getter;

@Getter
public class SessionUser {

    private String name;
    private String email;

    public SessionUser(User user){
        this.name = user.getUserName();
        this.email = user.getUserEmail();
    }
}
