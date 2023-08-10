package com.ssafy.B306.domain.s3;

import com.ssafy.B306.domain.template.TemplateService;
import com.ssafy.B306.domain.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/image")
public class S3Controller {

    private final S3Service s3Service;
    private final UserService userService;
    private final TemplateService templateService;

    @PostMapping("/template")
    public ResponseEntity<Void> uploadTemplate(MultipartFile file, HttpServletRequest request, Long templateId) throws IOException {

        if(!file.getContentType().startsWith("image")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String url = s3Service.uploadFile(file);
        templateService.modifyTemplateImage(templateId, url, request);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PostMapping("/profile")
    public ResponseEntity<Void> uploadProfile(MultipartFile file, HttpServletRequest request) throws IOException {

        if(!file.getContentType().startsWith("image")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String url = s3Service.uploadFile(file);
        userService.modifyUserImage(url, request);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}
