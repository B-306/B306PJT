package com.ssafy.B306.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    // JPA에서 null 값을 안정하게 가져오기 위해서
    @Query("SELECT u FROM User u WHERE u.userEmail = ? AND u.userDeleteDate IS NOT NULL")
    Optional<User> findByUserEmail(String userEmail);

    Optional <User> findByUserId(Long id);
}

