package com.ssafy.B306.domain.user;

import com.ssafy.B306.domain.ImageUpload.ImageUploadService;
import com.ssafy.B306.domain.exception.AppException;
import com.ssafy.B306.domain.exception.ErrorCode;
import com.ssafy.B306.domain.security.JwtAuthenticationProvider;
import com.ssafy.B306.domain.security.JwtUtil;
import com.ssafy.B306.domain.security.JwtToken;
import com.ssafy.B306.domain.user.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
    private final ImageUploadService imageUploadService;


    public Map<String, String> login(UserLoginRequestDto userLoginRequest){

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userLoginRequest.getUserEmail(), userLoginRequest.getUserPassword());

        Authentication authentication = jwtAuthenticationProvider.authenticate(authenticationToken);

        JwtToken token = jwtUtil.createToken(authentication);

        // DB에 있는 User 정보에서 userName 가져오기
        User findUser = userRepository.findByUserEmail(userLoginRequest.getUserEmail())
                .orElseThrow(()-> new RuntimeException("유저 없엉ㅜㅜ"));
        Map<String, String> result = new HashMap<>();
        result.put("accessToken", token.getAccessToken());
        result.put("refreshToken", token.getRefreshToken());
        result.put("userName", findUser.getUserName());
        result.put("userProfile", findUser.getUserProfile());

        return result;
    }

    @Transactional
    public UserDto signUp(UserRegisterRequestDto userRegisterRequestDto){

        // userEmail 중복 검증
        if(userRepository.existsByUserEmail(userRegisterRequestDto.getUserEmail())){
            throw new AppException(ErrorCode.USERNAME_DUPLICATED, "이미 가입된 이메일입니다.");
        }

        // 비밀번호 암호화
        String rawPassword = userRegisterRequestDto.getUserPassword();
        String encodedPassword = bCryptPasswordEncoder.encode(rawPassword);

        User resgistUser = userRepository.save(userRegisterRequestDto.toEntity(encodedPassword));

        return resgistUser.toUserDto();
    }


    public JwtToken refreshToken(HttpServletRequest request) {
        // access token 추출
        String refreshToken = request.getHeader("refreshToken");
        String accessToken = request.getHeader("accessToken");

        if (jwtUtil.isExpired(refreshToken)) { // DB에 있는 토큰이 만료가 된거면
            throw new RuntimeException("refresh까지 만료");
        }

        return jwtUtil.refreshToken(accessToken);
    }

    @Transactional
    public void modify(UserModifyRequestDto userModifyDto, HttpServletRequest request) {

        Long userPk = jwtUtil.extractUserPkFromToken(request);

        if (userPk == null) return;

        User findUser = userRepository.findByUserId(userPk)
                .orElseThrow(()-> new RuntimeException("유저 없는데?"));

        findUser.modifyUser(
                UserModifyRequestDto.builder()
//                .userProfile(userModifyDto.getUserProfile())
                .userPassword(bCryptPasswordEncoder.encode(userModifyDto.getUserPassword()))
                .userName(userModifyDto.getUserName())
                .build());
    }

    public void deleteUser(HttpServletRequest request) {
        Long userPk = jwtUtil.extractUserPkFromToken(request);
        userRepository.deleteById(userPk);
    }

    @Transactional
    public void modifyUserImage(MultipartFile file, HttpServletRequest request) {

        Long userPk = jwtUtil.extractUserPkFromToken(request);
        if (userPk == null) return;

        User findUser = userRepository.findByUserId(userPk)
                .orElseThrow(()-> new RuntimeException("유저 없는데?"));

        String savePath = imageUploadService.makeImagePath(file, "profile");

        findUser.modifyUserImage(savePath);
    }

    @Transactional
    public void authMail(EmailRequestDto request) {
        Random random = new Random();
        String authKey = String.valueOf(random.nextInt(888888)+111111);

        sendAuthEmail(request.getEmail(), authKey);
    }

    private void sendAuthEmail(String email, String authKey) {
        String subject = "제목";
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

    // request를 받으면 user를 반환하는 함수
    public User findUserByRequest(HttpServletRequest request){
        Long userPk = jwtUtil.extractUserPkFromToken(request);
        return userRepository.findByUserId(userPk).orElseThrow(()-> new RuntimeException("유저 없음"));
    }

}

