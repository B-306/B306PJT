package com.ssafy.B306.domain.OAuth;

import com.ssafy.B306.domain.user.User;
import com.ssafy.B306.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;
    private final HttpSession httpSession;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        User user = saveOrUpdate(attributes);
        httpSession.setAttribute("user", new SessionUser(user));

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                attributes.getAttributes(),
                attributes.getNameAttributeKey()
        );
    }


//    의민상 커스텀 코드
//    private void saveOrUpdate(OAuthAttributes attributes) {
//        Optional<User> optionalUser = userRepository.findByUserEmail(attributes.getUserEmail());
//
//        if (optionalUser.isPresent()) {
//            User user = optionalUser.get();
//            UserModifyRequestDto userModifyDto = new UserModifyRequestDto(attributes.getUserName(), user.getUserPassword(), user.getUserProfile());
//            user.modifyUser(userModifyDto);
//        } else {
//            UserRegisterRequestDto userRegisterRequestDto = new UserRegisterRequestDto(attributes.getUserEmail(), attributes.getUserName(), "");
//            userService.signUp(userRegisterRequestDto);
//        }
//    }

    private User saveOrUpdate(OAuthAttributes attributes) {
        User user = userRepository.findByUserEmail(attributes.getEmail())
                .map(entity -> entity.modifyUserName(attributes.getName()))
                .orElse(attributes.toEntity());

        return userRepository.save(user);
    }
}

