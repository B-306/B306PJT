import React from 'react';

class QuizText extends React.Component {
    render() {
        const { quizText } = this.props;

        return (
            <div className="quiz-text-container">
                <p>{quizText}</p>
            </div>
        );
    }
}

export default QuizText;