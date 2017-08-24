import React, { Component } from 'react';
import './App.css';

class Result extends Component {
    continueButton() {
        this.props.goToSelect();
    }

    quitButton() {
        this.props.quit();
    }

    render() {
        return(
            <div className='row'>
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                    <h2> RESULTS </h2>
                    <label>Answers correct this round</label>
                    <p>{this.props.currentScore}</p>
                    <label>Total Answers Correct</label>
                    <p>{this.props.totalScore}</p>
                    <button onClick={() => this.continueButton()} className='btn btn-success'>Continue</button>
                    <button onClick={() => this.quitButton()} className='btn btn-danger'>Quit</button>
                </div>
                <div className='col-md-2'></div>
            </div>
        )
    }
}

export default Result;