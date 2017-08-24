import React, { Component } from 'react';
import './App.css';
import Select from './Select';
import Login from './Login';
import Game from './Game';
import Result from './Result';
import CreateUser from './CreateUser';
const axios = require('axios');

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      playing: false,
      questionsPanel: false,
      questions: [],
      currentScore: 0,
      totalScore: 0,
      difficulty: '',
      category: '',
      loggedIn: false,
      userCreate: false,
      avatar: ''
    }
    this.updateLoginStatus = this.updateLoginStatus.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
    this.showResults = this.showResults.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.goToSelect = this.goToSelect.bind(this);
    this.goToUserCreate = this.goToUserCreate.bind(this);
    this.quit = this.quit.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.createAvatar = this.createAvatar.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
  }

  updateUsername(username) {
    this.setState({
      username: username
    })
  }

  updateLoginStatus(status) {
    this.setState({
      loggedIn: status
    })
  }

  updateQuestions(difficulty, category) {
    let diff = '&difficulty=' + difficulty;
    let cat = '&category=' + category;
    let url = 'https://opentdb.com/api.php?amount=10&type=multiple' + cat + diff;
    console.log(url);
    axios.get(url)
      .then(response => {
        console.log(response.data.results);
        if (response.data.results.length === 0) {
          alert('Sorry, this combination does not have any questions. Please choose again.')
        } else {
          this.setState({
            questions: response.data.results,
            questionsPanel: true,
            playing: true
          })
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  showResults() {
    this.setState({
      questionsPanel: false
    })
  }

  updateScore(current, total) {
    this.setState({
      currentScore: current,
      totalScore: total
    })
    let obj = {
      totalScore: total,
      username: this.state.username
    }

    axios.post('http://localhost:8585/saveUserData', obj)
      .then(response => {
        console.log('Saved user data to server: ' + response.data.totalScore);
      })
      .catch(error => {
        console.log(error);
      })
  }

  goToUserCreate() {
    this.setState({
      userCreate: true
    })
  }

  goToLogin() {
    this.setState({
      userCreate: false
    })
  }

  goToSelect() {
    this.setState({
      questionsPanel: false,
      playing: false
    })
  }

  createAvatar(type) {
    let url = 'https://robohash.org/' + this.state.username + '?set=' + type;
    this.setState({
      avatar: url
    })
  }

  quit() {
    this.setState({
      playing: false,
      loggedIn: false
    })
  }

  render() {
    var avatar;
    var user;
    if (this.state.loggedIn) {
      avatar = <img src={this.state.avatar} alt='avatar'/>;
      user = <div className='user'>
                <div>
                  <span>{this.state.username}</span>
                </div>
                <div>
                  <span>{'Score: ' + this.state.totalScore}</span>
                </div>
              </div>
    } 
    var snippet;
    if (!this.state.playing) {
      if (!this.state.loggedIn) {
        if(this.state.userCreate) {
          snippet = <CreateUser
                      goToLogin = {this.goToLogin}
                      createAvatar = {this.createAvatar}
                    />
        } else {
          snippet = <Login 
                      enablePlayButton = {this.enablePlayButton}
                      updateLoginStatus = {this.updateLoginStatus}
                      updateUsername = {this.updateUsername}
                      goToUserCreate = {this.goToUserCreate}
                      createAvatar = {this.createAvatar}
                      updateScore = {this.updateScore}
                    />       
        }
      } else { snippet = <Select 
                            updateQuestions = {this.updateQuestions}
                        />
      }
    } else if (this.state.playing && this.state.questionsPanel) {
      snippet = <Game 
                  questions = {this.state.questions}
                  showResults = {this.showResults}
                  updateScore = {this.updateScore}
                  totalScore = {this.state.totalScore}
                />
    } else snippet = <Result 
                        currentScore = {this.state.currentScore}
                        totalScore = {this.state.totalScore}
                        difficulty = {this.state.difficulty}
                        category = {this.state.category}
                        updateQuestions = {this.updateQuestions}
                        goToSelect = {this.goToSelect}
                        quit = {this.quit}
                      />
    return (
      <div className="App">
        <div className="App-header">
          <div className='avatar'>
            {user}
            {avatar}
          </div>
          <h1>Hackathon Trivia</h1>          
        </div>
        <div className='text-center'>
          {snippet}
        </div>
      </div>
    );
  }
}

export default App;
