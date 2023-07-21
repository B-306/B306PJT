package com.ssafy.B306.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserEmail(String userEmail);
//    User findByUserId(String userEmail);

    boolean existsByEmail(String email);
}

