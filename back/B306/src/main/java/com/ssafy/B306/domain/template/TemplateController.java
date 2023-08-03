package com.ssafy.B306.domain.template;


import com.ssafy.B306.domain.ImageUpload.ImageUploadService;
import com.ssafy.B306.domain.template.dto.TemplateResponseDto;
import com.ssafy.B306.domain.template.dto.TemplateSaveDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/template")
@RequiredArgsConstructor
public class TemplateController {

    private final TemplateService templateService;
    private final ImageUploadService imageUploadService;

    @GetMapping("/get")
    public ResponseEntity<List<TemplateResponseDto>> getTemplateList() {

        return new ResponseEntity<>(templateService.getTemplateList(), HttpStatus.OK);
    }

    @GetMapping("/get/{templateId}")
    public ResponseEntity<TemplateResponseDto> getTemplate(@PathVariable Long templateId) {

        TemplateResponseDto template = templateService.getTemplate(templateId);

        return new ResponseEntity<>(template, HttpStatus.OK);
    }

    @PostMapping("/add-template")
    public ResponseEntity<Void> addTemplate(MultipartFile file, TemplateSaveDto templateSaveDto, HttpServletRequest request) {

        if(!file.getContentType().startsWith("image")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        String image = imageUploadService.makeImagePath(file, "template");
        templateSaveDto.setTemplateImage(image);
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
