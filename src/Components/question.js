import React, { Component } from 'react';

class Question extends Component {

  state = {
    selectedAnswer: ''
  };

  selectedAnswer = (answer) => {
    this.setState({
      selectedAnswer: answer
    })
  }

  handleClick = (selectedAnswer) => {
    this.setState({
      selectedAnswer: ''
    })
    this.props.handleClick(this.props.correctAnswer === selectedAnswer)
  }

  render() {
    const { index, question, answers, buttonText } = this.props;
    const { selectedAnswer } = this.state;
    return (
      <div>
        <p>{index}. {question}</p>
        {
          answers.map((answer, index) => (
            <div key={index}>
              <input
                type="radio"
                value={answer}
                checked={answer === selectedAnswer}
                onChange={() => this.selectedAnswer(answer)}
              />
              {answer}
            </div>
          ))
        }
        <button disabled={!selectedAnswer} onClick={() => this.handleClick(selectedAnswer)}>{buttonText}</button>
      </div>

    )
  }
};

export default Question;