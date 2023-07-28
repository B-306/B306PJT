package com.ssafy.B306.domain.ImageUpload;

import com.ssafy.B306.domain.security.JwtUtil;
import com.ssafy.B306.domain.template.Template;
import com.ssafy.B306.domain.template.TemplateRepository;
import com.ssafy.B306.domain.template.TemplateService;
import com.ssafy.B306.domain.template.dto.TemplateSaveDto;
import com.ssafy.B306.domain.user.User;
import com.ssafy.B306.domain.user.UserRepository;
import com.ssafy.B306.domain.user.UserService;
import com.ssafy.B306.domain.user.dto.UserModifyRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
@Slf4j
public class ImageUploadController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final TemplateService templateService;
    private final TemplateRepository templateRepository;
    private String basePath = "src/main/resources/image/";


    @PostMapping("/profile")
    public ResponseEntity<Void> uploadProfile(MultipartFile file, HttpServletRequest request) {

        Long userPk = jwtUtil.extractUserPkFromToken(request);
        User realUser = userRepository.findByUserId(userPk).orElseThrow(()-> new RuntimeException("유저 없는데?"));

        if(!file.getContentType().startsWith("image")) {
            return new ResponseEntity<>(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        }

        String originFileName = file.getOriginalFilename();

        String fileName = originFileName.substring(originFileName.lastIndexOf("\\") + 1);

        String uuid = UUID.randomUUID().toString();

        String saveName = basePath + File.separator + "profile" + File.separator + uuid + "_" + fileName;

        UserModifyRequestDto user = new UserModifyRequestDto(realUser.getUserName(), realUser.getUserPassword(), saveName);


        Path savePath = Paths.get(saveName);

        try{
            file.transferTo(savePath);
        } catch (IOException e) {
            e.printStackTrace();
        }

        userService.modify(user, request);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PostMapping("/template")
    public ResponseEntity<Void> uploadTemplate(MultipartFile file, HttpServletRequest request, Long templateId) {

        Long userPk = jwtUtil.extractUserPkFromToken(request);
        User user = userRepository.findByUserId(userPk)
                .orElseThrow(()->new RuntimeException("존재하지 않는 회원입니다."));;
        Template template = templateRepository.findByTemplateIdAndTemplateUserId(templateId, user)
                .orElseThrow(()->new RuntimeException("존재하지 않는 템플릿입니다."));

        if(!file.getContentType().startsWith("image")) {
            return new ResponseEntity<>(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        }

        String originFileName = file.getOriginalFilename();
        String fileName = originFileName.substring(originFileName.lastIndexOf("\\") + 1);
        String uuid = UUID.randomUUID().toString();
        String saveName = basePath + File.separator + "template" + File.separator + uuid + "_" + fileName;

        TemplateSaveDto modifiedTemplate = new TemplateSaveDto(saveName, template.getTemplateType(), template.getTemplateName(), user);

        Path savePath = Paths.get(saveName);

        try{
            file.transferTo(savePath);
        } catch (IOException e) {
            e.printStackTrace();
        }

        templateService.modifyTemplate(templateId, modifiedTemplate, request);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
