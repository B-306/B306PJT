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

    @DeleteMapping("/{templateId}")
    public ResponseEntity<Void> deleteTemplate(@PathVariable Long templateId) {
        templateService.deleteTemplate(templateId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{templateId}")
    public ResponseEntity<Void> updateTemplate(@PathVariable Long templateId, @RequestBody TemplateSaveDto templateSaveDto) {
        templateService.modifyTemplate(templateId, templateSaveDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
