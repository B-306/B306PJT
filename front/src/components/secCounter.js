import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const StyledH1 = styled.h1`
  text-align: center;
  color: white;
`;

const Counter = ({ localUser, onImageCaptured }) => { // localUser 프로퍼티를 추가하여 전달받음
    const [count, setCount] = useState(15);
  
    useEffect(() => {
        const id = setInterval(() => {
            setCount(count => count - 1); 
            console.log('똑딱똑딱')
        }, 1000);
        if (count === 0) {
            clearInterval(id);

            // 이미지 캡처 로직 시작
            const streamManager = localUser.getStreamManager();
            const mediaStream = streamManager.stream.getMediaStream();
            const videoTrack = mediaStream.getVideoTracks()[0];

            const imageCapture = new ImageCapture(videoTrack);
            imageCapture.takePhoto()
                .then(capturedImageBlob => {
                    // 이미지 데이터를 부모 컴포넌트로 전달
                    onImageCaptured(capturedImageBlob);
                })
                .catch(error => {
                    console.error('Error capturing image:', error);
                });
            // 이미지 캡처 로직 끝
        }
        return () => clearInterval(id);
    }, [count, localUser, onImageCaptured]); // localUser 추가

    return <StyledH1>{count}</StyledH1>;
}

export default Counter;
