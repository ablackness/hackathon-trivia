import React, { Component } from 'react';
const axios = require('axios');

class CreateUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            type: '',
            username: '',
            password: ''
        }
        this.updatePassword = this.updatePassword.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.chooseAvatarType = this.chooseAvatarType.bind(this);
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

    chooseAvatarType(e) {
        this.setState({
            type: e.target.value
        })
    }

    createUser() {
        let obj = {
           username: this.state.username,
           password: this.state.password,
           type: this.state.type,
           totalScore: 0
        }
        axios.post('http://localhost:8585/addUser', obj)
            .then(response => {
                alert('User created successfully. Please log in with your username and password.')
                this.props.createAvatar(this.state.type);
                this.props.goToLogin();
            })
            .catch(error => {
                alert('Unable to create user. Username is already in use.')
                console.log(error)
            });
        }

    render() {
        return(
            <div className='row'>
                <div className='col-md-4'></div>
                <div className='col-md-4'>
                    <div className='panel'>
                        <div className='panel-body'>
                            <form>
                                <div className='form-group'>
                                    <label>Username</label>
                                    <input type='text' onChange={this.updateUsername} id='username' className='btn-block form-control' />
                                    <label>Password</label>
                                    <input type='password' onChange={this.updatePassword} id='password' className='btn-block form-control' />
                                    <label>Select Type of Avatar</label>
                                    <select onChange={this.chooseAvatarType} className='btn-block form-control'>
                                        <option value='set1'>Robots</option>
                                        <option value='set2'>Monsters</option>
                                        <option value='set3'>Disembodied Robot Heads</option>
                                        <option value='set4'>Kittens</option>
                                    </select>
                                    <hr/>
                                    <button type='button' onClick={() => this.createUser()} className='btn btn-primary btn-block'>Create</button>
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

export default CreateUser;