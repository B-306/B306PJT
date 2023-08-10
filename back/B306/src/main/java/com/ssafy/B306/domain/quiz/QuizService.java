package com.ssafy.B306.domain.quiz;

import com.ssafy.B306.domain.quiz.dto.QuizRequestSaveDto;
import com.ssafy.B306.domain.quiz.dto.QuizResponseDto;
import com.ssafy.B306.domain.quizbook.QuizBook;
import com.ssafy.B306.domain.template.Template;
import com.ssafy.B306.domain.template.TemplateRepository;
import com.ssafy.B306.domain.template.TemplateService;
import com.ssafy.B306.domain.template.dto.TemplateResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuizService {

    private final QuizRepository quizRepository;
    private final TemplateService templateService;
    private final TemplateRepository templateRepository;

    @Transactional
    public void addNewQuiz(List<QuizRequestSaveDto> quizList, QuizBook quizBookId){
        for(QuizRequestSaveDto quiz : quizList){
            quiz.setQuizBookId(quizBookId);
            Template template = templateRepository.findByTemplateId(quiz.getTemplateId())
                    .orElseThrow(() -> new RuntimeException("no template"));

            quiz.setQuizBookId(quizBookId);

            Quiz newQuiz = quiz.toEntity(quiz);
            newQuiz.setQuizTemplateId(template);

            quizRepository.save(newQuiz);
        }
    }

    @Transactional
    public void modifyQuiz(List<Quiz> quizList) {
        for(Quiz quiz : quizList){
            Quiz q = quizRepository.findById(quiz.getQuizId())
                    .orElseThrow(() -> new IllegalArgumentException("해당 문제집이 없습니다."));
            q.modifyQuiz(quiz.toRequestDto(quiz, q.getQuizBookId()));
        }
    }

    public List<QuizResponseDto> getQuizList(QuizBook quizBook) {
        List<Quiz> quizList = quizRepository.findByQuizBookId(quizBook).orElseThrow(()-> new RuntimeException("해당 문제집이 없습니다."));
        List<QuizResponseDto> quizResponseDtoList = new ArrayList<>();

        for(Quiz quiz : quizList){
            QuizResponseDto qrd = quiz.toDto(quiz);
            quizResponseDtoList.add(qrd);
        }

        return quizResponseDtoList;
    }

    public QuizResponseDto getQuiz(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(()->new RuntimeException("해당 문제는 없습니다."));
        QuizResponseDto quizResponseDto = quiz.toDto(quiz);

        return quizResponseDto;
    }

    public void deleteQuizList(Long quizBookId) {
        quizRepository.deleteById(quizBookId);
    }
}
