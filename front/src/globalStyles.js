// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';
import backgroundImage from './assets/images/bfo_bgimg.png';

const GlobalStyles = createGlobalStyle`
  body {
    background-image: url(${backgroundImage});
    background-size: cover;
    // background-size: contain;
    // background-size: auto;
    background-position: center;
    /* 추가적인 스타일링을 원하는 경우 여기에 작성 */
  }
`;

export default GlobalStyles;