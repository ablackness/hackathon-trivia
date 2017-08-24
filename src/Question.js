import React, { Component } from 'react';
import './App.css';

class Question extends Component {
    constructor(props){
        super(props);
        this.state = {
            counter: 0,
            currentScore: 0,
            totalScore: 0
        }
        this.answerButton = this.answerButton.bind(this);
    }

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    answerButton(e) {
        if (e.target.value === this.props.questions[this.state.counter].correct_answer) {
            let score = this.state.currentScore + 1;
            this.setState({
                currentScore: score
            })
        }
        if (this.state.counter > 8) {
            let current = this.state.currentScore;
            let total = this.props.totalScore + current;
            this.setState({
                counter: 0,
                totalScore: total,
                currentScore: 0
            });
            this.props.updateScore(current, total);
            this.props.showResults();
        } else {
            let count = this.state.counter + 1;
            this.setState({
                counter: count
            }) 
        }
    }

    decodeHTML(encodedStr) {
        let parser = new DOMParser();
        var dom = parser.parseFromString('<!doctype html><body>' + encodedStr,'text/html');
        var decoded = dom.body.textContent;
        return decoded;
    }

    render() {
        let answers = this.props.questions[this.state.counter].incorrect_answers.concat(this.props.questions[this.state.counter].correct_answer);
        let shuffled = this.shuffleArray(answers);
        let decodedQ = this.decodeHTML(this.props.questions[this.state.counter].question);
        let decodedAns1 = this.decodeHTML(shuffled[0]);
        let decodedAns2 = this.decodeHTML(shuffled[1]);
        let decodedAns3 = this.decodeHTML(shuffled[2]);
        let decodedAns4 = this.decodeHTML(shuffled[3]);
        return(
            <div>
                <label>Category</label>
                <p>{this.props.questions[this.state.counter].category}</p>
                <label>Question</label>
                <p>{decodedQ}</p>
                <p>Choose an answer...</p>
                <div className='answer'>
                    <span className='pull-left'>{decodedAns1}</span>
                    <button onClick={this.answerButton} value={decodedAns1} className='btn pull-right btn-warning'>This one!</button>
                </div>
                <hr/>
                <div className='answer'>
                    <span className='pull-left'>{decodedAns2}</span>
                    <button onClick={this.answerButton} value={decodedAns2} className='btn pull-right btn-warning'>This one!</button>
                </div>
                <hr/>
                <div className='answer'>
                    <span className='pull-left'>{decodedAns3}</span>
                    <button onClick={this.answerButton} value={decodedAns3} className='btn pull-right btn-warning'>This one!</button>
                </div>
                <hr/>
                <div className='answer'>
                    <span className='pull-left'>{decodedAns4}</span>
                    <button onClick={this.answerButton} value={decodedAns4} className='btn pull-right btn-warning'>This one!</button>
                </div>
                <hr/>
   
                <div className='jumbotron'><h2>Correct Answers This Round</h2><h2>{this.state.currentScore}</h2></div>
            </div>
        )
    }
}

export default Question;