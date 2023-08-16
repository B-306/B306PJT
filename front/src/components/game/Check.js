import React, { Component } from 'react';
import Scoring from './Scoring';
import axios from 'axios';
import * as bodySegmentation from '@tensorflow-models/body-segmentation';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/selfie_segmentation';
// import { div } from '../../../node_modules/@tensorflow/tfjs-core/dist/base';




async function convertBlobToImageData(blob) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function () {
            const dataURL = reader.result;
            const img = new Image();
            img.onload = function () {
                resolve(img);
            };
            img.src = dataURL;
        };
        reader.readAsDataURL(blob);
    });
}

async function imageBitmapToImageData(imageBitmap) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    
    context.drawImage(imageBitmap, 0, 0);
    return context.getImageData(0, 0, imageBitmap.width, imageBitmap.height);
  }
  

class Check extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxWidth: '100%',
            people: null, // 세그멘테이션 결과를 저장할 상태 변수
            checkImageData: null,
            maskImageBitmap: null,
            maskImageData: null,
        };
    }

    async componentDidUpdate(prevProps) {
        const { showCounter } = this.props;
        if (showCounter !== prevProps.showCounter) {
            this.setState({
                people: null,
                checkImageData: null,
                maskImageBitmap: null,
                maskImageData: null,
            });
        }
    }
    
    async componentDidMount() {
        // 새로운 이미지가 들어올 때 이전 데이터와 상태 초기화
        // body-segmentation 관련 코드 실행
        // const checkImage = new Image();
        const templateURL = localStorage.getItem('templateURL');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // checkImage.src = templateURL;
        let checkImageData;
        try {
            const response = await axios.get('https://i9b306.q.ssafy.io/api1/getimage', {
                params: {
                    imageUrl: templateURL
                },
                responseType: 'arraybuffer' // 이 부분을 추가하여 이미지 데이터를 ArrayBuffer로 받아옴
            });
        
            console.log('templateURL get 요청');
            console.log(response.data); // 이미지 데이터 ArrayBuffer 확인
        
            const img = new Image();
        
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
        
                checkImageData = ctx.getImageData(0, 0, img.width, img.height);
                // checkImageData를 사용하여 이미지 처리를 계속 진행하세요.
            };
        
            // ArrayBuffer를 Blob으로 변환하여 src에 할당
            const blob = new Blob([response.data], { type: 'image/png' });
            img.src = URL.createObjectURL(blob);
        } catch (error) {
            console.error('Error:', error);
        }

        // const img = new Image();
        // img.onload = function () {
        //     canvas.width = img.width;
        //     canvas.height = img.height;
        //     ctx.drawImage(img, 0, 0);
        // };
        // img.src = 'data:image/png;base64,' + imageData;
        // if (checkImageData) {
            
        // }
        // await checkImage.decode();
        // Canvas를 생성하여 이미지를 그립니다
        // const canvas = document.createElement('canvas');
        // canvas.width = checkImage.width;
        // canvas.height = checkImage.height;
        // const ctx = canvas.getContext('2d');
        // ctx.drawImage(checkImage, 0, 0);
        
        // Canvas에서 ImageData를 추출합니다
        // const checkImageData = ctx.getImageData(0, 0, checkImage.width, checkImage.height);

        const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
        const segmenterConfig = {
          runtime: 'mediapipe',
          solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation'
                        // or 'base/node_modules/@mediapipe/selfie_segmentation' in npm.
        };
        const segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
        const segmentationConfig = { flipHorizontal: true };
    
        // props로 전달받은 이미지 블롭을 이미지 데이터로 변환하여 사용
        const imageElement = await convertBlobToImageData(this.props.image);
        const people = await segmenter.segmentPeople(imageElement, segmentationConfig);

        const maskImageBitmap = people[0].mask.mask;
        const maskImageData = await imageBitmapToImageData(maskImageBitmap);
        
        this.setState({
            people: people,
            checkImageData: checkImageData,
            maskImageBitmap: maskImageBitmap,
            maskImageData: maskImageData,
        });
    }

    handleScoreUpdate = (similarityScore) => {
        // 유사도 점수를 받아와서 처리하는 로직을 구현
        // 예를 들어 점수를 상태에 저장하거나 다른 동작을 수행할 수 있습니다.
        console.log('Scoring 컴포넌트에서 계산한 유사도 점수:', similarityScore);
        // 유사도 점수를 부모 컴포넌트로 전달하는 로직 추가
        this.props.onScoreUpdate(similarityScore);
    }

    render() {
        const { people, checkImageData, maskImageBitmap, maskImageData } = this.state;
        const { showCounter } = this.props;

        // showCounter 값에 따라 렌더링 여부 결정
        if (!showCounter) {
            return null;
        }
    
        if (!people || people.length === 0) {
            return null; // 세그멘테이션 결과가 없으면 아무것도 렌더링하지 않음
        }
        
        console.log('샘플 이미지', checkImageData)
        const srgb = [0,0,0,0]
        for (let i=0; i<307200; i++) {
            if (checkImageData.data[4*i]!==0) {
                srgb[0] ++;
            }
            if (checkImageData.data[4*i+1]!==0) {
                srgb[1] ++;
            }
            if (checkImageData.data[4*i+2]!==0) {
                srgb[2] ++;
            }
            if (checkImageData.data[4*i+3]!==0) {
                srgb[3] ++;
            }
        }
        console.log('srgb', srgb)
        console.log('마스크데이터', maskImageData)

        const checkStyle = {
            width: '720px',
            height: '540px',
            overflow: 'hidden',
        };

        return (
            <div>
                <div className="check-container">
                    <div style={{ overflowX: 'auto' }}>
                        <canvas
                            style={checkStyle}
                            ref={canvasRef => {
                                if (canvasRef) {
                                    const ctx = canvasRef.getContext('2d');

                                    // Canvas의 크기를 이미지 데이터 크기에 맞게 설정
                                    canvasRef.width = maskImageBitmap.width;
                                    canvasRef.height = maskImageBitmap.height;

                                    // ImageBitmap을 ImageData로 변환
                                    imageBitmapToImageData(maskImageBitmap).then(imageData => {
                                        // 이미지 데이터를 캔버스에 그립니다
                                        ctx.putImageData(imageData, 0, 0);
                                    });
                                }
                            }}
                        />
                    </div>
                </div>
                <Scoring maskImageData={maskImageData} checkImageData={checkImageData} onScoreUpdate={this.handleScoreUpdate} />
            </div>
        );
    }
    
}

export default Check;
