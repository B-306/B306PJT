package com.ssafy.B306.domain.quizbook;

import com.ssafy.B306.domain.quizbook.dto.QuizBookListResponseDto;
import com.ssafy.B306.domain.quizbook.dto.QuizBookModifyRequestDto;
import com.ssafy.B306.domain.quizbook.dto.QuizBookResponseDto;
import com.ssafy.B306.domain.quizbook.dto.QuizBookSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@RestController
@RequestMapping("/api1/quizbook")
@RequiredArgsConstructor
public class QuizBookController {

    private final QuizBookService quizBookService;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public void addNewQuizBook(@RequestBody QuizBookSaveRequestDto quizBookSaveRequestDto, HttpServletRequest request){
        quizBookService.addNewQuizBook(quizBookSaveRequestDto, request);
    }

    @GetMapping("/get")
    @ResponseStatus(HttpStatus.OK)
    public List<QuizBookListResponseDto> getQuizBookList(){
        return quizBookService.getQuizBookList();
    }

    @GetMapping("/get/{quizBookId}")
    @ResponseStatus(HttpStatus.OK)
    public QuizBookResponseDto getQuizBook(@PathVariable Long quizBookId){
        return quizBookService.getQuizBook(quizBookId);
    }

    @DeleteMapping("/{quizBookId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteQuizBook(@PathVariable Long quizBookId, HttpServletRequest request){
        quizBookService.deleteQuizBook(quizBookId, request);
    }

    @PatchMapping("/{quizBookId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void modifyQuizBook(@PathVariable Long quizBookId, @RequestBody QuizBookModifyRequestDto quizBookModifyRequestDto, HttpServletRequest request){
        quizBookService.modifyQuizBook(quizBookId, quizBookModifyRequestDto, request);
    }

}
