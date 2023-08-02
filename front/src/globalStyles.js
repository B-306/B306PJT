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
    margin: 0; /* body의 기본 margin을 제거 */
  }

  // .AuthTemplate {
  //   height: 100vh; /* 화면 전체 높이를 차지하도록 설정합니다. */
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  // }
`;

export default GlobalStyles;