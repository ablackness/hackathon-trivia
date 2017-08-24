import React, { Component } from 'react';
const axios = require('axios');

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.updatePassword = this.updatePassword.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
    }

    updateUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    updatePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    login() {
        let obj = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post('http://localhost:8585/checkUser',obj)
            .then(response => {
                this.props.updateLoginStatus(true);
                this.props.updateUsername(this.state.username);
                this.props.createAvatar(response.data.type);
                console.log(response.data.totalScore);
                this.props.updateScore(0, response.data.totalScore);
            })
            .catch(error => {
                alert('Username or password is incorrect')
                console.log(error)
            });
    }

    render() {
            return(
                <div className='row'>
                <div className='col-md-4'></div>
                <div className='col-md-4'>
                    <div className='panel'>
                        <h2 className='panel-heading'>Welcome to Trivia</h2>
                        <div className='panel-body'>
                            <form>
                                <div className='form-group'>
                                    <label>Username</label>
                                    <input type='text' onChange={this.updateUsername} id='username' className='btn-block form-control' />
                                    <label>Password</label>
                                    <input type='password' onChange={this.updatePassword} id='password' className='btn-block form-control' />
                                    <button onClick={() => this.login()} type='button' className='btn-block btn btn-primary'>Login</button>
                                    <button onClick={this.props.goToUserCreate} type='button' className='btn-block btn btn-primary'>Create New User</button>
                                    <hr/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'></div>
            </div>
            )
        }
    }

export default Login;