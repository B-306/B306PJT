// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';
// import backgroundImage from './assets/images/bfo_bgimg.png';
import backgroundImage from './assets/images/bfo_move_bg.gif';

const GlobalStyles = createGlobalStyle`
  body {
    background-image: url(${backgroundImage}), url(${backgroundImage});
    // background-size: cover;
    background-size: 40% auto, 40% auto;
    // background-size: contain;
    background-repeat: no-repeat, no-repeat;
    background-attachment: fixed;
    // background-position: left, right;
    background-position: left top, right top;
    /* 추가적인 스타일링을 원하는 경우 여기에 작성 */
    margin: 0; /* body의 기본 margin을 제거 */
    font-family: Ftstardust;
    background-color: black;
  }

  ::placeholder {
    font-family: Ftstardust;
    /* 다른 스타일 옵션 추가 가능 */
  }

  /* 추가: input 요소의 value 스타일 변경 */
  input {
    font-family: Ftstardust;
    /* 다른 스타일 옵션 추가 가능 */
  }
`;

export default GlobalStyles;