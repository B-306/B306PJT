package com.ssafy.B306.domain.template;


import com.ssafy.B306.domain.template.dto.TemplateRequestDto;
import com.ssafy.B306.domain.template.dto.TemplateSaveDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TemplateService {

    private final TemplateRepository templateRepository;

    // template 낱개 조회
    public Template getTemplate(Long templateId){
        Template template = templateRepository.findByTemplateId(templateId)
                .orElseThrow(() -> new RuntimeException("no template"));

        if(template.getTemplateDeleteDate() != null) {
            throw new IllegalStateException("이미 삭제된 템플릿입니다.");
        }

        return template;
    }

    // 전체 template 조회
    public List<Template> getAllTemplate() {
        List<Template> temList = new ArrayList<>();
        temList = templateRepository.findAll();
        return temList;
    }

    // template 생성
    @Transactional
    public Template addTemplate(TemplateSaveDto templateSaveDto) {
        Template template = templateSaveDto.toEntity(templateSaveDto);
        //발생할만 한 문제가 뭐가있지?

        return templateRepository.save(template);
    }

    // template 삭제
    @Transactional
    public void deleteTemplate(Long templateId) {
        Template template = templateRepository.findByTemplateId(templateId)
                .orElseThrow(() -> new IllegalArgumentException("없는 템플릿 입니다."));

        if(template.getTemplateDeleteDate() != null) {
            throw new IllegalStateException("이미 삭제된 템플릿입니다.");
        }

        templateRepository.deleteById(template.getTemplateId());
    }

    // template 수정
    @Transactional
    public void modifyTemplate(Long templateId, TemplateSaveDto templateSaveDto) {
        Template template = templateRepository.findByTemplateId(templateId)
                .orElseThrow(() -> new IllegalArgumentException("해당 템플릿은 존재하지 않습니다."));

        if(template.getTemplateDeleteDate() != null) {
            throw new IllegalStateException("이미 삭제된 템플릿입니다.");
        }

        template.modifyTemplate(templateSaveDto);
    }
}
