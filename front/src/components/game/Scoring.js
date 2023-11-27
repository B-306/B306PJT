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
        const { checkImageData, maskImageData, answer } = this.props;
        // TODO: 유사도 채점 로직 구현
        
        let totalPixels = 0;
        let differentPixels = 0;
        const ansNum = Number(answer);
        for (let i = 0; i < checkImageData.data.length; i += 4) {
            if (
                (checkImageData.data[i+ansNum] !== maskImageData.data[i])
            ) {
                if (checkImageData.data[i+ansNum]===255){
                    differentPixels++;
                } else if ((maskImageData.data[i+3]>100)) {
                    differentPixels++;
                }
            }
            if (checkImageData.data[i+ansNum] === 255) {
                totalPixels++;
            }
        }
        const similarityScore = ((totalPixels - differentPixels) / totalPixels) * 100;
        

        this.setState({
            similarityScore: similarityScore,
        });

        this.props.onScoreUpdate(similarityScore);
    }

    render() {
        return null;
    }
}

export default Scoring;
