readme

팀장 : 허준영
팀원 : 송혁준, 정내혁, 정의민, 주영인, 홍지민

## Commit 규칙
- 참고 :  https://dejavuhyo.github.io/posts/patterns-for-writing-better-git-commit-messages/

```
01 [type](optional scope): [subject] date time

02 [optional body]

- 예시 -
Feat(Create): Add Create method in vue
vue에 게시글 작성 기능에 해당하는 Create라는 이름의 함수 기능 구현
```

1. type(타입)
   
|타입|설명|
|----|----------|
|feat|새로운 기능 추가|
|fix|버그 수정|
|docs|문서 수정|
|style|코드 formatting, 세미콜론(;) 누락, 코드 변경이 없는 경우|
|design|CSS 등 사용자 UI 디자인 변경|
|test|테스트 코드, 리팩터링 테스트 코드 추가(프로덕션 코드 변경 X)|
|refactor|코드 리팩터링|
|build|빌드 파일 수정|
|omment|필요한 주석 추가 및 변경|
|ci|CI 설정 파일 수정|
|perf|성능 개선|
|chore|빌드 업부 수정, 패키지 매니저 수정(gitignore 수정 등)|
|rename|파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우|
|remove|파일을 삭제만 한 경우|

2. scope
- 선택사항이며, 변경된 부분을 직접적으로 표기한다.
- 함수가 변경되었으면 함수명, 메소드가 추가되었으면 클래스 명을 입력한다.

3. subject
- 첫 글자는 대문자로 입력한다.
- 마지막에는 .(period)을 찍지 않으며 영문 기준 최대 50자를 넘지 않는다.
- 제목은 명령문의 형태로 작성한다. (동사원형 사용)
  
4. body
- 각 줄은 최대 72자를 넘지 않도록 한다.
- 어떻게 변경했는지보다, 무엇을 변경했고, 왜 변경했는지를 설명한다.
