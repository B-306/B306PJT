package com.ssafy.B306.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserEmail(String userEmail);

    boolean existsByUserEmail(String userEmail);
}

