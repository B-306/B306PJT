package com.ssafy.B306.domain.template;


import com.ssafy.B306.domain.ImageUpload.ImageUploadService;
import com.ssafy.B306.domain.security.JwtUtil;
import com.ssafy.B306.domain.template.dto.TemplateResponseDto;
import com.ssafy.B306.domain.template.dto.TemplateSaveDto;
import com.ssafy.B306.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TemplateService {

    private final TemplateRepository templateRepository;
    private final ImageUploadService imageUploadService;
    private final JwtUtil jwtUtil;

    // template 낱개 조회
    public TemplateResponseDto getTemplate(Long templateId){

        Template template = templateRepository.findByTemplateId(templateId)
                .orElseThrow(() -> new RuntimeException("no template"));

        if(template.getTemplateDeleteDate() != null) {
            throw new IllegalStateException("이미 삭제된 템플릿입니다.");
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
                .orElseThrow(() -> new IllegalArgumentException("해당 템플릿이 없습니다."));
        if(template.getTemplateDeleteDate() != null) {
            throw new IllegalStateException("이미 삭제된 템플릿입니다.");
        }

        templateRepository.deleteById(template.getTemplateId());
    }

    // template 수정
    @Transactional
    public void modifyTemplate(Long templateId, TemplateSaveDto templateSaveDto, HttpServletRequest request) {

        Long templateUserId = jwtUtil.extractUserPkFromToken(request);

        // 예외 확인
        Template originalTemplate = templateRepository.findByTemplateIdAndTemplateUserId(templateId, User.builder().userId(templateUserId).build())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않거나 변경 권한이 없는 템플릿입니다."));

        if(originalTemplate.getTemplateDeleteDate() != null) {
            throw new IllegalStateException("이미 삭제된 템플릿입니다.");
        }

        templateSaveDto.setTemplateImage(originalTemplate.getTemplateImage());
        originalTemplate.modifyTemplate(templateSaveDto);
    }

    @Transactional
    public void modifyTemplateImage(Long templateId, MultipartFile file, HttpServletRequest request) {

        Long templateUserId = jwtUtil.extractUserPkFromToken(request);

        // 예외 확인
        Template originalTemplate = templateRepository.findByTemplateIdAndTemplateUserId(templateId, User.builder().userId(templateUserId).build())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않거나 변경 권한이 없는 템플릿입니다."));
        if(originalTemplate.getTemplateDeleteDate() != null) {
            throw new IllegalStateException("이미 삭제된 템플릿입니다.");
        }

        String savePath = imageUploadService.makeImagePath(file, "template");

        originalTemplate.modifyTemplateImage(savePath);
    }
}
