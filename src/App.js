import React, { Component } from 'react';
import './App.css';
import Questions from './Containers/questions';

class App extends Component {
  render() {
    return (
      <div className="App" >
        <div className="header">
          <h1>Quiz</h1>
        </div>
        <Questions />
      </div>
    )
  }
}

export default App;
