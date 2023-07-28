package com.ssafy.B306.domain.template;


import com.ssafy.B306.domain.security.JwtUtil;
import com.ssafy.B306.domain.template.dto.TemplateSaveDto;
import com.ssafy.B306.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TemplateService {

    private final TemplateRepository templateRepository;
    private final JwtUtil jwtUtil;

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
    public Template addTemplate(TemplateSaveDto templateSaveDto, HttpServletRequest request) {

        Long userPk = Long.parseLong(jwtUtil.parseClaims(request.getHeader("accessToken")).get("userPk").toString());
        templateSaveDto.setUserPk(User.builder().userId(userPk).build());
        Template template = templateSaveDto.toEntity(templateSaveDto);

        return templateRepository.save(template);
    }

    // template 삭제
    @Transactional
    public void deleteTemplate(Long templateId, HttpServletRequest request) {

        Long templateUserId = Long.parseLong(jwtUtil.parseClaims(request.getHeader("accessToken")).get("userPk").toString());

        Template template = templateRepository.findByTemplateIdAndTemplateUserId(templateId, User.builder().userId(templateUserId).build())
                .orElseThrow(() -> new IllegalArgumentException("해당 템플릿이 없습니다."));

        if(template.getTemplateDeleteDate() != null) {
            throw new IllegalStateException("이미 삭제된 템플릿입니다.");
        }

        templateRepository.deleteById(template.getTemplateId());
    }

    // template 수정
    @Transactional
    public void modifyTemplate(Long templateId, TemplateSaveDto templateSaveDto, HttpServletRequest request) {

        Long templateUserId = Long.parseLong(jwtUtil.parseClaims(request.getHeader("accessToken")).get("userPk").toString());

        Template originalTemplate = templateRepository.findByTemplateIdAndTemplateUserId(templateId, User.builder().userId(templateUserId).build())
                .orElseThrow(() -> new IllegalArgumentException("해당 템플릿이 없습니다."));

        if(originalTemplate.getTemplateDeleteDate() != null) {
            throw new IllegalStateException("이미 삭제된 템플릿입니다.");
        }

        originalTemplate.modifyTemplate(templateSaveDto);

    }


}
