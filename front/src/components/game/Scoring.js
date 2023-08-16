import { Component } from 'react';
// import React from 'react';

class Scoring extends Component {
    constructor(props) {
        super(props);
        this.state = {
            similarityScore: 0, // 유사도 점수를 저장할 상태 변수
        };
    }

    componentDidMount() {
        // checkImageData와 maskImageData를 이용하여 유사도 채점 로직을 구현하고
        // similarityScore를 계산하여 state에 저장하세요.
        const { checkImageData, maskImageData } = this.props;

        // TODO: 유사도 채점 로직 구현
        
        // 예시: 단순히 픽셀 값이 다른 비율을 계산하는 예시
        let totalPixels = 0;
        let differentPixels = 0;
        for (let i = 0; i < checkImageData.data.length; i += 4) {
            if (
                (checkImageData.data[i] !== maskImageData.data[i])
            ) {
                if (checkImageData.data[i]===255){
                    differentPixels++;
                } else if ((maskImageData.data[i+3]>150)) {
                    differentPixels++;
                }
            }
            if (checkImageData.data[i] === 255) {
                totalPixels++;
            }
        }
        const similarityScore = ((totalPixels - differentPixels) / totalPixels) * 100;
        console.log('채점 결과', totalPixels, differentPixels, similarityScore)

        this.setState({
            similarityScore: similarityScore,
        });

        this.props.onScoreUpdate(similarityScore);
    }

    render() {
        return null;
        // const { similarityScore } = this.state;

        // return (
        //     <div className="scoring-container">
        //         <h2>유사도 채점 결과</h2>
        //         <p>유사도 점수: {similarityScore.toFixed(2)}%</p>
        //     </div>
        // );
    }
}

export default Scoring;
