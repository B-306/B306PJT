package com.ssafy.B306.domain.template;


import com.ssafy.B306.domain.template.dto.TemplateRequestDto;
import com.ssafy.B306.domain.template.dto.TemplateSaveDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TemplateService {

    private final TemplateRepository templateRepository;

    public Template getTemplateAddress(TemplateRequestDto templateRequest){
        return templateRepository.findByTemplateId(templateRequest.getTemplateId()).orElseThrow(() -> new RuntimeException("no template"));
    }

    public List<Template> getAllTemplate() {
        List<Template> temList = new ArrayList<>();
        temList = templateRepository.findAll();
        return temList;
    }



    public void addTemplate(TemplateSaveDto templateSaveDto) {
        Template newTemp = templateSaveDto.toEntity(templateSaveDto);
        templateRepository.save(newTemp);
    }
}
