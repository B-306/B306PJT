package com.ssafy.B306.domain.template;


import com.ssafy.B306.domain.exception.CustomException;
import com.ssafy.B306.domain.exception.ErrorCode;
import com.ssafy.B306.domain.security.JwtUtil;
import com.ssafy.B306.domain.template.dto.TemplateResponseDto;
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
    public TemplateResponseDto getTemplate(Long templateId){

        Template template = templateRepository.findByTemplateId(templateId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEMPLATE_NOT_FOUND));

        if(template.getTemplateDeleteDate() != null) {
            throw new CustomException(ErrorCode.TEMPLATE_NOT_FOUND);
        }

        TemplateResponseDto templateResponseDto = template.makeTemplateDto(template);

        return templateResponseDto;
    }

    // 전체 template 조회
    public List<TemplateResponseDto> getTemplateList(HttpServletRequest request) {

        Long userPk = jwtUtil.extractUserPkFromToken(request);

        List<Template> templateList = templateRepository.findAll();
        List<TemplateResponseDto> templateResponseDtoList = new ArrayList<>();

        for(Template template : templateList) {
            if(template.getTemplateDeleteDate() == null && template.getTemplateUserId().getUserId().equals(userPk)) { //삭제 확인
                TemplateResponseDto trd = template.makeTemplateDto(template);
                templateResponseDtoList.add(trd);
            }
        }
        return templateResponseDtoList;
    }

    // template 생성
    @Transactional
    public Template addTemplate(TemplateSaveDto templateSaveDto, HttpServletRequest request) {

        Long userPk = jwtUtil.extractUserPkFromToken(request);
        templateSaveDto.setUserPk(User.builder().userId(userPk).build());
        Template template = templateSaveDto.toEntity(templateSaveDto);

        return templateRepository.save(template);
    }

    // template 삭제
    @Transactional
    public void deleteTemplate(Long templateId, HttpServletRequest request) {

        Long templateUserId = jwtUtil.extractUserPkFromToken(request);

        //예외 확인
        Template template = templateRepository.findByTemplateIdAndTemplateUserId(templateId, User.builder().userId(templateUserId).build())
                .orElseThrow(() -> new CustomException(ErrorCode.TEMPLATE_NOT_FOUND));
        if(template.getTemplateDeleteDate() != null) {
            throw new CustomException(ErrorCode.TEMPLATE_NOT_FOUND);
        }

        templateRepository.deleteById(template.getTemplateId());
    }

    // template 수정
    @Transactional
    public void modifyTemplate(Long templateId, TemplateSaveDto templateSaveDto, HttpServletRequest request) {

        Long templateUserId = jwtUtil.extractUserPkFromToken(request);

        // 예외 확인
        Template originalTemplate = templateRepository.findByTemplateIdAndTemplateUserId(templateId, User.builder().userId(templateUserId).build())
                .orElseThrow(() -> new CustomException(ErrorCode.TEMPLATE_NOT_FOUND_OR_UNAUTHORIZED));

        if(originalTemplate.getTemplateDeleteDate() != null) {
            throw new CustomException(ErrorCode.TEMPLATE_NOT_FOUND);
        }

        templateSaveDto.setTemplateImage(originalTemplate.getTemplateImage());
        originalTemplate.modifyTemplate(templateSaveDto);
    }

    @Transactional
    public void modifyTemplateImage(Long templateId, String url, HttpServletRequest request) {

        Long templateUserId = jwtUtil.extractUserPkFromToken(request);

        // 예외 확인
        Template originalTemplate = templateRepository.findByTemplateIdAndTemplateUserId(templateId, User.builder().userId(templateUserId).build())
                .orElseThrow(() -> new CustomException(ErrorCode.TEMPLATE_NOT_FOUND_OR_UNAUTHORIZED));
        if(originalTemplate.getTemplateDeleteDate() != null) {
            throw new CustomException(ErrorCode.TEMPLATE_NOT_FOUND);
        }

        originalTemplate.modifyTemplateImage(url);
    }
}
