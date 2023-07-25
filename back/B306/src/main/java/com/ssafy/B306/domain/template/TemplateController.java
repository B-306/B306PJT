package com.ssafy.B306.domain.template;


import com.ssafy.B306.domain.template.dto.TemplateSaveDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
