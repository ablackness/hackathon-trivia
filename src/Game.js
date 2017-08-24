import React, { Component } from 'react';
import './App.css';
import Question from './Question';

class Game extends Component {
    render() {
        return(
            <div className='row'>
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                    <Question 
                        questions = {this.props.questions}
                        showResults = {this.props.showResults}
                        updateScore = {this.props.updateScore}
                        totalScore = {this.props.totalScore}
                    />
                </div>
                <div className='col-md-2'></div>
            </div>
        )
    }
}

export default Game;