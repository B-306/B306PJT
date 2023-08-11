package com.ssafy.B306.domain.template;


import com.ssafy.B306.domain.ImageUpload.ImageUploadService;
import com.ssafy.B306.domain.s3.S3Service;
import com.ssafy.B306.domain.template.dto.TemplateResponseDto;
import com.ssafy.B306.domain.template.dto.TemplateSaveDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/template")
@RequiredArgsConstructor
public class TemplateController {

    private final TemplateService templateService;
    private final S3Service s3Service;

    @GetMapping("/get")
    public ResponseEntity<List<TemplateResponseDto>> getTemplateList(HttpServletRequest request) {
        List<TemplateResponseDto> templateList = templateService.getTemplateList(request);
        return new ResponseEntity<>(templateList, HttpStatus.OK);
    }

    @GetMapping("/get/{templateId}")
    public ResponseEntity<TemplateResponseDto> getTemplate(@PathVariable Long templateId) {

        TemplateResponseDto template = templateService.getTemplate(templateId);

        return new ResponseEntity<>(template, HttpStatus.OK);
    }

    @PostMapping("/add-template")
    public ResponseEntity<Void> addTemplate(MultipartFile file, TemplateSaveDto templateSaveDto, HttpServletRequest request) throws IOException {

        String url = s3Service.uploadFile(file);
        templateSaveDto.setTemplateImage(url);
        templateService.addTemplate(templateSaveDto, request);

         return new ResponseEntity<>(HttpStatus.OK);
    }


    @DeleteMapping("/{templateId}")
    public ResponseEntity<Void> deleteTemplate(@PathVariable Long templateId, HttpServletRequest request) {

        templateService.deleteTemplate(templateId, request);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{templateId}")
    public ResponseEntity<Void> modifyTemplate(@PathVariable Long templateId, @RequestBody TemplateSaveDto templateSaveDto, HttpServletRequest request) {

        templateService.modifyTemplate(templateId, templateSaveDto, request);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
