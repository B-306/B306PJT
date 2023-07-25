package com.ssafy.B306.domain.template;


import com.ssafy.B306.domain.template.dto.TemplateSaveDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/template")
@RequiredArgsConstructor
public class TemplateController {
    private final TemplateService templateService;

    @PostMapping("/add-template")
    public ResponseEntity<Void> addTemplate(@RequestBody TemplateSaveDto templateSaveDto) {
        templateService.addTemplate(templateSaveDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete-template")
    public ResponseEntity<Void> deleteTemplate(@RequestBody Long templateId) {

        templateService.deleteTemplate(templateId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update-template")
    public ResponseEntity<Void> updateTemplate(@RequestBody Long templateId, TemplateSaveDto templateSaveDto) {
        templateService.modifyTemplate(templateId, templateSaveDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
