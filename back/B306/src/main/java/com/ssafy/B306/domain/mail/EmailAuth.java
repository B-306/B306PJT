package com.ssafy.B306.domain.mail;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class EmailAuth {
    private static final Long MAX_EXPIRE_TIME = 5L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String authToken;
    // 만료 여부
    private Boolean expired;
    // 만료시간
    private LocalDateTime expireDate;

    @Builder
    public EmailAuth(Long id, String email, String authToken, Boolean expired, LocalDateTime expireDate) {
        this.id = id;
        this.email = email;
        this.authToken = authToken;
        this.expired = expired;
        this.expireDate = LocalDateTime.now().plusMinutes(MAX_EXPIRE_TIME);
    }

    public void useToken(){
        this.expired = true;
    }
}
