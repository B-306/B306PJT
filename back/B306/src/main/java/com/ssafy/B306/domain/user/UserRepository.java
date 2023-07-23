package com.ssafy.B306.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    // JPA에서 null 값을 안정하게 가져오기 위해서
    Optional<User> findByUserEmail(String userEmail);

    boolean existsByUserEmail(String userEmail);
}

