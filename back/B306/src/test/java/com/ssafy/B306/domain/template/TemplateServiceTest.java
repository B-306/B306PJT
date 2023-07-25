package com.ssafy.B306.domain.template;

import com.ssafy.B306.domain.quiz.Quiz;
import com.ssafy.B306.domain.quiz.QuizRepository;
import com.ssafy.B306.domain.template.dto.TemplateSaveDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class TemplateServiceTest {

    @Autowired
    TemplateService templateService;
    @Autowired
    TemplateRepository templateRepository;
    @Autowired
    QuizRepository quizRepository;

    @Test
    public void templateAdd() throws Exception {
        //given

        TemplateSaveDto templateSaveDto = TemplateSaveDto
                .builder()
                .templateImage("testUrl")
                .templateType('2')
                .templateName("square")
                .build();

        //when

        Template newTemplate = templateService.addTemplate(templateSaveDto);


        //then
        Assertions.assertNotNull(newTemplate.getTemplateId());
    }

    @Test
    public void templateDeleteTest() throws Exception {
        //given

        //when

        //then

    }

    @Test
    public void templateUpdateTest() throws Exception {
        //given

        //when

        //then

    }

    public Quiz createQuiz(String quizText, char quizAnswer) {
        return Quiz.builder()
                .quizText(quizText)
                .quizAnswer(quizAnswer)
                .build();
    }

}