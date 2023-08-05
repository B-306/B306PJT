//package com.ssafy.B306.domain.openvidu;
//
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.beans.factory.annotation.Value;
//import io.openvidu.java.client.*;
//import org.springframework.http.ResponseEntity;
//
//@RestController
//public class OpenViduController {
//
//	@Value("${openvidu.url}")
//	private String openViduUrl;
//
//	@Value("${openvidu.secret}")
//	private String openViduSecret;
//
//	@RequestMapping("/create-session")
//	public ResponseEntity<?> createSession() throws OpenViduHttpException {
//		OpenVidu openVidu = new OpenVidu(openViduUrl, openViduSecret);
//
//		try {
//			Session session = openVidu.createSession();
//			String token = session.generateToken();
//
//			// 세션과 토큰 정보를 클라이언트에게 전달하거나 필요한 작업을 수행
//
//			return ResponseEntity.ok("Session created with token: " + token);
//		} catch (OpenViduJavaClientException e) {
//			return ResponseEntity.status(500).body("Error creating session: " + e.getMessage());
//		}
//	}
//}