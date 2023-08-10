// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';
// import backgroundImage from './assets/images/bfo_bgimg.png';
import backgroundImage from './assets/images/bfo_move_bg.gif';

const GlobalStyles = createGlobalStyle`
  body {
    background-image: url(${backgroundImage});
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    /* 추가적인 스타일링을 원하는 경우 여기에 작성 */
    margin: 0; /* body의 기본 margin을 제거 */
  }
`;

export default GlobalStyles;