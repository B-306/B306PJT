package com.ssafy.B306.domain.user;

import com.ssafy.B306.domain.exception.CustomException;
import com.ssafy.B306.domain.exception.ErrorCode;
import com.ssafy.B306.domain.security.JwtAuthenticationProvider;
import com.ssafy.B306.domain.security.JwtUtil;
import com.ssafy.B306.domain.security.JwtToken;
import com.ssafy.B306.domain.user.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtUtil jwtUtil;
    private final JwtAuthenticationProvider jwtAuthenticationProvider;
    private final JavaMailSender javaMailSender;
    private final RedisUtil redisUtil;


    public Map<String, Object> login(UserLoginRequestDto userLoginRequest){

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userLoginRequest.getUserEmail(), userLoginRequest.getUserPassword());

        Authentication authentication = jwtAuthenticationProvider.authenticate(authenticationToken);

        JwtToken token = jwtUtil.createToken(authentication);

        // DB에 있는 User 정보에서 userName 가져오기
        User findUser = userRepository.findByUserEmail(userLoginRequest.getUserEmail())
                .orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
        Map<String, Object> result = new HashMap<>();
        result.put("accessToken", token.getAccessToken());
        result.put("refreshToken", token.getRefreshToken());
        result.put("userName", findUser.getUserName());
        result.put("userProfile", findUser.getUserProfile());
//        result.put("token", token);

        return result;
    }

    @Transactional
    public UserDto signUp(UserRegisterRequestDto userRegisterRequestDto){

        // userEmail 중복 검증
        if(userRepository.existsByUserEmail(userRegisterRequestDto.getUserEmail())){
            throw new CustomException(ErrorCode.USEREMAIL_DUPLICATED);
        }

        // 비밀번호 암호화
        String rawPassword = userRegisterRequestDto.getUserPassword();
        String encodedPassword = bCryptPasswordEncoder.encode(rawPassword);

        User resgistUser = userRepository.save(userRegisterRequestDto.toEntity(encodedPassword));

        return resgistUser.toUserDto();
    }


    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        Map<String, Object> result = new HashMap<>();

        // access token 추출
        String refreshToken = jwtUtil.resolveToken(request);

        if (refreshToken != null && jwtUtil.validateToken(refreshToken)
                && jwtUtil.parseClaims(refreshToken).get("type").equals("REFRESH")) {

            User findUser = userRepository.findByUserId(Long.parseLong(jwtUtil.parseClaims(refreshToken).get("userPk").toString()))
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

            result.put("accessToken", jwtUtil.refreshToken(refreshToken, findUser.getUserEmail()));
            result.put("message", "success");
            return new ResponseEntity(result, HttpStatus.OK);
        }

        result.put("message", "fail");
        return new ResponseEntity(result, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Transactional
    public void modify(UserModifyRequestDto userModifyDto, HttpServletRequest request) {

        Long userPk = jwtUtil.extractUserPkFromToken(request);

        if (userPk == null) return;

        User findUser = userRepository.findByUserId(userPk)
                .orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));

        findUser.modifyUser(
                UserModifyRequestDto.builder()
                .userPassword(bCryptPasswordEncoder.encode(userModifyDto.getUserPassword()))
                .userName(userModifyDto.getUserName())
                .build());
    }

    @Transactional
    public void deleteUser(HttpServletRequest request) {
        Long userPk = jwtUtil.extractUserPkFromToken(request);
        try{
            userRepository.deleteById(userPk);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Transactional
    public void modifyUserImage(String url, HttpServletRequest request) {

        Long userPk = jwtUtil.extractUserPkFromToken(request);
        if (userPk == null) return;

        User findUser = userRepository.findByUserId(userPk)
                .orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));

        findUser.modifyUserImage(url);
    }

    @Transactional
    public void authMail(EmailRequestDto request) {
        Random random = new Random();
        String authKey = String.valueOf(random.nextInt(888888)+111111);

        sendAuthEmail(request.getEmail(), authKey);
    }

    private void sendAuthEmail(String email, String authKey) {
        String subject = "두뇌 풀 가동";
        String text = "회원 가입을 위한 인증번호는 "+ authKey + "입니다.<br/>";

        try{
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(text, true);
            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            e.printStackTrace();
        }

        // 유효시간
        redisUtil.setDataExpire(authKey, email, 60 * 50L);
    }

    public boolean validAuthMailCode(EmailAuthRequestDto emailAuthRequestDto) {
        String emailFindByCode = redisUtil.getData(emailAuthRequestDto.getAuthCode());
        return emailFindByCode.equals(emailAuthRequestDto.getEmail());
    }
}

