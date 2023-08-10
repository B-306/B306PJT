package com.ssafy.B306.domain.ImageUpload;


import com.ssafy.B306.domain.template.TemplateService;
import com.ssafy.B306.domain.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
@Slf4j
public class ImageUploadController {

    private final UserService userService;
    private final TemplateService templateService;

    @PostMapping("/template")
    public ResponseEntity<Void> uploadTemplate(MultipartFile file, HttpServletRequest request, Long templateId) {

        if(!file.getContentType().startsWith("image")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        templateService.modifyTemplateImage(templateId, file, request);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PostMapping("/profile")
    public ResponseEntity<Void> uploadProfile(MultipartFile file, HttpServletRequest request) {

        if(!file.getContentType().startsWith("image")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        userService.modifyUserImage(file, request);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
    @Autowired
    private ResourceLoader resourceLoader;

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename, String type) throws IOException {
        Resource resource = resourceLoader.getResource("classpath:image/" + type + "/" + filename);

        String fileExtension = filename.substring(filename.lastIndexOf(".") + 1);
        MediaType mediaType = MediaType.IMAGE_JPEG;
        if ("png".equalsIgnoreCase(fileExtension)) {
            mediaType = MediaType.IMAGE_PNG;
        }

        return ResponseEntity.ok()
                .contentType(mediaType) // 이미지 타입에 맞게 설정
                .body(resource);
    }
}
