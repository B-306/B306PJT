package com.ssafy.B306.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    // JPA에서 null 값을 안정하게 가져오기 위해서
    @Query("SELECT u FROM User u WHERE u.userDeleteDate IS NULL AND u.userEmail = ?1")
    Optional<User> findByUserEmail(String userEmail);

    Optional <User> findByUserId(Long id);

    // userEmail을 통해 현재 활동 중인 user가 있는지 판단 -> 있으면 0보다 크고 없으면 0보다 작음
    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN TRUE ELSE FALSE END FROM User u WHERE u.userEmail = ?1 AND u.userDeleteDate IS NULL")
    boolean existsByUserEmail(String userEmail);
}

