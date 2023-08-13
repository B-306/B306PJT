import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    padding-top: 7px
    outline: none;
    width: 100%;
    border-radius:5px;

    &::placeholder {
        display: flex;

        /* placeholder 텍스트의 가로 정렬을 조정 */
        text-align: center; /* 가운데 정렬로 설정 */
        /* 다른 원하는 가로 정렬 옵션도 가능(left, right) */
        justify-content: center;

        // text-indent
        /* placeholder 텍스트와 입력 상자 사이의 간격을 조정 */
        // padding-top: 7; /* 원하는 값으로 설정 */

        /* 입력 상자와 주변 요소 사이의 간격을 조정 */
        margin-top: 0.5rem; /* 원하는 값으로 설정 */
       
    }


    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
    & + & {
        margin-top: 1rem;
    }
`;

const Input = props => <StyledInput {...props} />;

export default Input;