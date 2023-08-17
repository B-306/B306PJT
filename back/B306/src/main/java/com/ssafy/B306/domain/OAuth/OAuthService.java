package com.ssafy.B306.domain.OAuth;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuthService {

    @Value("${spring.security.oauth2.client.registration.Kakao.client-id}")
    public String clientKakaoId;
    @Value("${spring.security.oauth2.client.registration.Kakao.client-secret}")
    public String clientKakaoSecret;
    @Value("${spring.security.oauth2.client.registration.Kakao.redirect-uri}")
    public String redirectUriKaKao;
    @Value("${spring.security.oauth2.client.provider.Kakao.token-uri}")
    public String KakaoToken;
    @Value("${spring.security.oauth2.client.provider.Kakao.user-info-uri}")
    public String KakaoUser;


    @Value("${spring.security.oauth2.client.registration.Naver.client-id}")
    public String clientNaverId;
    @Value("${spring.security.oauth2.client.registration.Naver.client-secret}")
    public String clientNaverSecret;
    @Value("${spring.security.oauth2.client.registration.Naver.redirect-uri}")
    public String redirectUriNaver;
    @Value("${spring.security.oauth2.client.provider.Naver.token-uri}")
    public String NaverToken;
    @Value("${spring.security.oauth2.client.provider.Naver.user-info-uri}")
    public String NaverUser;
    public String getAccessToken(String authorizeCode, String social) throws Exception {
        String accessToken = "";
        String refreshToken = "";
        String reqUrl;
        String clientId;
        String clientSecret;
        String redirectUri;
        if(social.equals("kakao")) {
            reqUrl = KakaoToken;
            clientId = clientKakaoId;
            clientSecret = clientKakaoSecret;
            redirectUri = redirectUriKaKao;
        }
        else {
            reqUrl = NaverToken;
            clientId = clientNaverId;
            clientSecret = clientNaverSecret;
            redirectUri = redirectUriKaKao;
        }
        try {
            URL url = new URL(reqUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            // POST 요청을 위해 기본값이 false인 setDoOutput을 true로

            if(social.equals("kakao")){
                conn.setRequestMethod("POST");
                conn.setDoOutput(true);
                conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
            } else {
                conn.setRequestMethod("GET");
                conn.setDoOutput(true);
            }



            //POST 요청에 필요로 하는 파라미터 스트림을 통해 전송

            // Create the parameter string in x-www-form-urlencoded format
            String params = "grant_type=authorization_code"
                    + "&client_id=" + clientId
                    + "&client_secret=" + clientSecret
                    + "&redirect_uri=" + URLEncoder.encode(redirectUri, "UTF-8")
                    + "&code=" + URLEncoder.encode(authorizeCode, "UTF-8");

            if(social.equals("naver")) {
                params += "&state=" + URLEncoder.encode("test");
            }

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = params.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            //responseCode가 200이면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 총해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            // jackson objectmapper 객체 생성
            ObjectMapper objectMapper = new ObjectMapper();
            // JSON String -> Map
            Map<String, Object> jsonMap = objectMapper.readValue(result, new TypeReference<Map<String, Object>>() {
            });

            accessToken = jsonMap.get("access_token").toString();
            refreshToken = jsonMap.get("refresh_token").toString();

            System.out.println("access_token : " + accessToken);
            System.out.println("refresh_token : " + refreshToken);

            br.close();
//            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("안돼!!!!!!!!!!!!1");
        }

        return accessToken;
    }

    public HashMap<String, Object> getUserInfo(String accessToken, String social) throws Throwable {

        HashMap<String, Object> userInfo = new HashMap<>();
        String reqUrl;

        if(social.equals("kakao")) {
            reqUrl = KakaoUser;
        } else {
            reqUrl = NaverUser;
        }

        try {
            URL url = new URL(reqUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            if(social.equals("kakao")) {
                conn.setRequestMethod("GET");
            } else {
                conn.setRequestMethod("POST");
            }
            System.out.println(social);
            // 요청에 필요한 Header에 포함될 내용
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);

            int responseCode = conn.getResponseCode();
            System.out.println(responseCode);
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            try {
                // jackson objectmapper 객체 생성
                ObjectMapper objectMapper = new ObjectMapper();
                // JSON String -> Map
                Map<String, Object> jsonMap = objectMapper.readValue(result, new TypeReference<Map<String, Object>>() {
                });

                if(social.equals("kakao")) {
                    Map<String, Object> properties = (Map<String, Object>) jsonMap.get("properties");
                    Map<String, Object> kakao_account = (Map<String, Object>) jsonMap.get("kakao_account");

                    String nickname = properties.get("nickname").toString();
                    String email = kakao_account.get("email").toString();

                    userInfo.put("nickname", nickname);
                    userInfo.put("email", email);
                } else {
                    Map<String, Object> response = (Map<String, Object>) jsonMap.get("response");
                    userInfo.put("nickname", (String) response.get("name"));
                    userInfo.put("email", (String) response.get("email"));
                    System.out.println(response.get("name"));
                    System.out.println(response.get("email"));
                }


            } catch (Exception e) {
                e.printStackTrace();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        return userInfo;
    }

}
