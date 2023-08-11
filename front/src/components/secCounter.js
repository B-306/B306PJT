import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const StyledH1 = styled.h1`
  text-align: center;
  color: white;
`;

const Counter = ({ localUser, onImageCaptured, showCounter }) => {
    const [count, setCount] = useState(5);

    useEffect(() => {
        const id = setInterval(() => {
            setCount(count => count - 1); 
            console.log('똑딱똑딱')
        }, 1000);
        
        if (count === 3) {
            console.log('카운트 끝');

            if (showCounter) {
                const streamManager = localUser.getStreamManager();
                const mediaStream = streamManager.stream.getMediaStream();
                const videoTrack = mediaStream.getVideoTracks()[0];

                const imageCapture = new ImageCapture(videoTrack);
                imageCapture.takePhoto()
                    .then(capturedImageBlob => {
                        console.log('캡처 성공');
                        console.log(capturedImageBlob);
                        onImageCaptured(capturedImageBlob);
                    })
                    .catch(error => {
                        console.error('Error capturing image:', error);
                    });
            } else {
                // showCounter가 false인 경우에는 null을 전달
                onImageCaptured(null);
            }
        }

        return () => clearInterval(id);
    }, [count, localUser, onImageCaptured, showCounter]);

    return showCounter ? <StyledH1>{count}</StyledH1> : null;
}

export default Counter;
