package com.ssafy.B306.domain.security;


import com.ssafy.B306.domain.exception.CustomException;
import com.ssafy.B306.domain.exception.ErrorCode;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;

import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtUtil {
    private final Key key;
    private final long accessExpired;
    private final long refreshExpired;

    // 서버 측 secret key
    public JwtUtil(@Value("${jwt.secret}") String secretKey,
                   @Value("${jwt.access-expired-seconds}") long accessExpired,
                   @Value("${jwt.refresh-expired-seconds}") long refreshExpired) {
        byte[] secretByteKey = DatatypeConverter.parseBase64Binary(secretKey);
        this.key = Keys.hmacShaKeyFor(secretByteKey);
        this.accessExpired = accessExpired * 1000;
        this.refreshExpired = refreshExpired * 1000;
    }

    // 토큰 발급
    public JwtToken createToken(Authentication authentication) {
        // userId로 받아버리기

        // 역할을 설정하는 것을 추출하기
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        String accessToken = Jwts.builder()
                .setSubject(authentication.getName()) // 토큰의 이름 설정
                .claim("auth", authorities) // 권한 넣기
                .claim("userPk", authentication.getCredentials()) // pk 값 넣기
                .claim("userEmail", authentication.getName()) // email 값 넣기
                .setExpiration(new Date(System.currentTimeMillis() + accessExpired)) // 만료기간 30분 설정
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();

        String refreshToken = Jwts.builder()
                .setExpiration(new Date(System.currentTimeMillis() + refreshExpired))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();

        return JwtToken.builder()
                .grantType("Bearer") // 이거는 그냥 jwt라는 것을 알려주기 위한 이름 같은 것
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    // 토큰 복호화
    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);

        if (claims.get("auth") == null) {
            throw new RuntimeException("권한 정보가 없는 토큰");
        }

        // 권한 정보 가져옴 ex) USER, ADMIN
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("auth").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        UserDetails principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    // Access 토큰 유효성 검사
    public boolean validateToken(String token) {
        try {
            /*
            Jws<Claims> 객체를 반화하며 값의 예는 다음과 같다
            header={alg=HS256},
            body={sub=user@asd.com, auth=USER, userPk=2, exp=1690200967},
            signature=oK129enc-u-lIFFnGveLaNGKxLZvplKbR6bvbSAyN7Y
             */
            Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token);

            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
        } catch (ExpiredJwtException e) {
//            throw new CustomException(ErrorCode.ACCESSTOKEN_EXPIRED);
            log.info("Expired JWT Token", e);
            throw new JwtException("토큰 기간 만료");
        } catch (UnsupportedJwtException e) {
            log.info("Unsurported JWT Token", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty", e);
        }
        return false;
    }

    // token 내용 parsing하는 함수
    public Claims parseClaims(String token) {
//        try {
            return Jwts.parser().setSigningKey(key)
                    .parseClaimsJws(token)
                    .getBody();
//        } catch (ExpiredJwtException e) {
//            return e.getClaims();
//        }
    }

    public boolean isExpired(String token) {
        // new Date() : 지금
        // 즉, 만료 시간이 지금보다 전인가?를 판단하고 결과를 반환
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token)
                .getBody().getExpiration().before(new Date());
    }

    public JwtToken refreshToken(String accessToken) {
        Claims token = parseClaims(accessToken);
        String newToken = Jwts.builder()
                .setSubject(token.getSubject()) // 토큰의 이름 설정
                .claim("auth", token.getAudience()) // 권한 넣기
                .claim("userPk", token.get("userPk")) // pk 값 넣기
                .setExpiration(new Date(System.currentTimeMillis() + accessExpired)) // 만료기간 30분 설정
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();

        return JwtToken.builder()
                .grantType("Bearer")
                .accessToken(newToken)
                .build();
    }

    public Long extractUserPkFromToken(HttpServletRequest request) {
        String token = request.getHeader("accessToken");
        return Long.parseLong(parseClaims(token).get("userPk").toString());
    }
}
