import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import uploadImageToServer from './imageUploader';
import { useSelector } from "react-redux";
import { decodeState } from "./common/CodedState";

const StyledH1 = styled.h1`
  text-align: center;
  color: white;
`;

const Counter = ({ localUser, onImageCaptured, showCounter }) => {
    const [count, setCount] = useState(10);
    const name = decodeState(useSelector(state => state.auth.userName));
    useEffect(() => {
        const id = setInterval(() => {
            setCount(count => count - 1); 
            console.log('똑딱똑딱')
        }, 1000);
        if (count === -6) {
            // showCounter가 false인 경우에는 null을 전달
            onImageCaptured(null);
            clearInterval(id);
            setCount(count => count - 1)
        } else if (count === 0) {
            console.log('카운트 끝');

            if (showCounter) {
                const streamManager = localUser.getStreamManager();
                const mediaStream = streamManager.stream.getMediaStream();
                const videoTrack = mediaStream.getVideoTracks()[0];

                const imageCapture = new ImageCapture(videoTrack);
                imageCapture.takePhoto()
                    .then(capturedImageBlob => {
                        console.log('캡처 성공');
                        // 이미지 데이터를 로드하고 좌우반전 처리
                        const reader = new FileReader();
                        reader.onload = () => {
                            const img = new Image();
                            img.onload = () => {
                                const canvas = document.createElement('canvas');
                                const ctx = canvas.getContext('2d');
                                canvas.width = img.width;
                                canvas.height = img.height;

                                // 좌우반전 처리
                                ctx.translate(canvas.width, 0);
                                ctx.scale(-1, 1);

                                // 이미지 그리기
                                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                                // 변환된 이미지를 다시 Blob으로 변환
                                canvas.toBlob((flippedImageBlob) => {
                                    // 좌우반전된 이미지 블롭을 전달
                                    
                                    const imageFile = new File([flippedImageBlob], 'image_' + name + '.png', { type: 'image/png' });
                                    uploadImageToServer(imageFile)
                                    .then(imageUrl => {
                                        console.log('이미지 업로드 URL:', imageUrl);
                                        // 업로드가 완료되었을 때 실행할 동작
                                        onImageCaptured(flippedImageBlob, imageUrl);
                                    })
                                    .catch(error => {
                                        console.error('이미지 업로드 실패:', error);
                                    });
                                }, 'image/png');
                            };
                            img.src = reader.result;
                        };
                        reader.readAsDataURL(capturedImageBlob);
                    })
                    .catch(error => {
                        console.error('Error capturing image:', error);
                    });
            }
        }

        return () => clearInterval(id);
    }, [count, localUser, onImageCaptured, showCounter, name ]);

    return showCounter ? <StyledH1>{count}</StyledH1> : null;
}

export default Counter;
