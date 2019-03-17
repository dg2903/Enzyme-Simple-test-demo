import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      counter: 0,
      firstTimeReachingZero: true,
      userTryToGoBelowZero: false
    }
  }

  increaseCounter = () => {
    this.setState({
      counter: ++this.state.counter,
      firstTimeReachingZero: false,
      userTryToGoBelowZero: false
    })
  }

  decreaseCounter = () => {
    if(this.state.counter === 1 && !this.state.firstTimeReachingZero) {
      this.setState({
        counter: --this.state.counter,
        firstTimeReachingZero: true
      });
      return;
    } else if (this.state.counter === 0 && this.state.firstTimeReachingZero) {
      this.setState({
        userTryToGoBelowZero: true
      })
      return;
    }
    this.setState({
      counter: --this.state.counter
    })
  }

  renderErrorMessage = () => {
    if(this.state.userTryToGoBelowZero){
      return <h3 data-test="error-display">Counter cannot go below Zero</h3>;
    }
    return;
  }

  render() {
    const errorMessage = this.renderErrorMessage();
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The Counter is currently {this.state.counter}</h1>
        {errorMessage}
        <button
          data-test="increment-button"
          onClick={this.increaseCounter}
        >
          Increase counter
        </button>

        <button
          data-test="decrement-button"
          onClick={this.decreaseCounter}
        >
          Decrease counter
        </button>
      </div>
    );
  }
}

export default App;
