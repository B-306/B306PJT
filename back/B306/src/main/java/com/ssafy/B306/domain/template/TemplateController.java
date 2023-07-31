package com.ssafy.B306.domain.template;


import com.ssafy.B306.domain.ImageUpload.ImageUploadService;
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
    public ResponseEntity<List<Template>> getTemplateList() {

        return new ResponseEntity<>(templateService.getAllTemplate(), HttpStatus.OK);
    }

    @GetMapping("/get/{templateId}")
    public ResponseEntity<Template> getTemplate(@PathVariable Long templateId) {

        Template template = templateService.getTemplate(templateId);

        return new ResponseEntity<>(templateService.getTemplate(template.getTemplateId()), HttpStatus.OK);
    }

    @PostMapping("/add-template")
    public ResponseEntity<Void> addTemplate(@RequestBody TemplateSaveDto templateSaveDto, MultipartFile file, HttpServletRequest request) {
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
