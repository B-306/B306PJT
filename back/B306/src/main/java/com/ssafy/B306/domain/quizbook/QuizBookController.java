package com.ssafy.B306.domain.quizbook;

import com.ssafy.B306.domain.quizbook.dto.QuizBookSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/quizbook")
@RequiredArgsConstructor
public class QuizBookController {

    private final QuizBookService quizBookService;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public void addNewQuizBook(@RequestBody QuizBookSaveRequestDto quizBookSaveRequestDto){
        if(quizBookSaveRequestDto.getQuizBookUserEmail() == null)
            throw new RuntimeException("로그인 이후 사용 할 수 있는 기능입니다.");

        quizBookService.addNewQuizBook(quizBookSaveRequestDto);
    }

    @GetMapping("/get")
    @ResponseStatus(HttpStatus.OK)
    public List<QuizBook> getQuizBookList(){
        return quizBookService.getQuizBookList();
    }

    @GetMapping("/get/{quizBookId}")
    @ResponseStatus(HttpStatus.OK)
    public QuizBook getQuizBook(@PathVariable Long quizBookId){
        return quizBookService.getQuizBook(quizBookId);
    }

    @DeleteMapping("/{quizBookId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteQuizBook(@PathVariable Long quizBookId){
        // To-do 사용자 검증을 통해 본인 게시글 맞는지 확인 후 삭제 진행

        quizBookService.deleteQuizBook(quizBookId);
    }

    @PatchMapping("/{quizBookId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void modifyQuizBook(@PathVariable Long quizBookId, @RequestBody QuizBookSaveRequestDto quizBookSaveRequestDto){
        // To-do 사용자 검증을 통해 본인 게시글 맞는지 확인 후 삭제 진행

        quizBookService.modifyQuizbook(quizBookId, quizBookSaveRequestDto);
    }

}
