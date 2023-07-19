package com.ssafy.B306.domain.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User login(User user){
        User findUser = userRepository.findByUserId(user.getUserId());

        if(findUser != null && findUser.getUserPassword().equals(user.getUserPassword())){
            return user;
        }

        return null;
    }
}

