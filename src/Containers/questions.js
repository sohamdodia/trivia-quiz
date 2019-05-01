import React, { Component } from 'react';
import * as api from '../utils/API';
import { shuffle } from '../helper';
import Question from '../Components/question'

class Questions extends Component {

  state = {
    questions: [],
    index: 0,
    totalCorrectAnswer: 0
  };

  componentDidMount() {
    this.fetchQuestions()
  }

  fetchQuestions = async () => {
    try {
      const result = await api.get();
  
      const filteredArray = [];
  
      result.forEach((r) => {
        r.incorrect_answers.push(r.correct_answer);
        filteredArray.push({
          question: r.question,
          correctAnswer: r.correct_answer,
          answers: shuffle(r.incorrect_answers)
        })
      });
      this.setState({
        questions: filteredArray
      });
    } catch (error) {
      alert('Something went wrong!');
    }
  }

  incrementCorrectAnswerCount = () => {
    this.setState((prevState) => {
      return {
        totalCorrectAnswer: prevState.totalCorrectAnswer + 1
      }
    })
  };

  handleClick = (trueAnswer) => {
    const { questions, index, totalCorrectAnswer } = this.state;

    if (trueAnswer) {
      this.incrementCorrectAnswerCount()
    }

    if (questions.length - 1 === index) {
      alert(`Your score is ${totalCorrectAnswer} out of ${questions.length}`);
      this.fetchQuestions()
      this.setState({
        index: 0,
        totalCorrectAnswer: 0
      })
    } else {
      this.setState((prevState) => {
        return {
          index: prevState.index + 1
        }
      })
    }
  }

  render() {
    const { questions, index } = this.state;
    return (
      <div>
        {
          questions.length > 0
          ? (
            <Question
              question={questions[index].question}
              answers={questions[index].answers}
              correctAnswer={questions[index].correctAnswer}
              handleClick={this.handleClick}
              index={index + 1}
              buttonText={index !== questions.length - 1 ? 'Next' : 'Finish'}
            />
          ) : (
            <p>loading...</p>
          )
        }
      </div>
    )
  }
}

export default Questions;