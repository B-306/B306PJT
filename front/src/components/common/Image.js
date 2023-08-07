import styled from 'styled-components';
import React from 'react';


const AspectOutter = styled.div`
    width: 100%;
    min-width:250px;
`

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    background-image: url("${(props) => "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"}");
    background-size: cover;
`;

const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: cover;
    margin: 4px;
    border: 2px solid #ffffff; /* 추가 */
`

const Image = (props) => {
    
    const {shape, src, size} = props;
    
    const styles = {
        src: src,
        size: size,
    }
    
    if (shape === "circle"){
        console.log(shape+'circle')
        return (
            <ImageCircle {...styles}></ImageCircle>
        )
    }

    if (shape === "rectangle"){
        console.log(shape+'rectangle')
        return (
            <AspectOutter>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        )
    }

    console.log(shape+'bug')
    return (
        <React.Fragment>
        </React.Fragment>
    )
}


Image.defaultProps = {
    shape: "circle",
    src: "https://cdn-icons-png.flaticon.com/512/20/20079.png",
    size: 36,
};



export default Image;