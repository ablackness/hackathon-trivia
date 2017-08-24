import React, { Component } from 'react';

class Select extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: '',
            difficulty: ''
        }
        this.updateCategory = this.updateCategory.bind(this);
        this.updateDifficulty = this.updateDifficulty.bind(this);
    }

    updateCategory(e) {
        this.setState({
            category: e.target.value
        })
    }

    updateDifficulty(e) {
        this.setState({
            difficulty: e.target.value
        })
    }

    play() {
        this.props.updateQuestions(this.state.difficulty, this.state.category);
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
                                    <label>Select Difficulty</label>
                                    <select onChange={this.updateDifficulty} className='btn-block form-control'>
                                        <option value=''>Random</option>
                                        <option value='easy'>Easy</option>
                                        <option value='medium'>Moderate</option>
                                        <option value='hard'>Hard</option>
                                    </select>
                                    <label>Select Category</label>
                                    <select onChange={this.updateCategory} className='btn-block form-control'>
                                        <option value=''>Random</option>
                                        <option value="9">General Knowledge</option>
                                        <option value="10">Entertainment: Books</option>
                                        <option value="11">Entertainment: Film</option>
                                        <option value="12">Entertainment: Music</option>
                                        <option value="13">Entertainment: Musicals &amp; Theatres</option>
                                        <option value="14">Entertainment: Television</option>
                                        <option value="15">Entertainment: Video Games</option>
                                        <option value="16">Entertainment: Board Games</option>
                                        <option value="17">Science &amp; Nature</option>
                                        <option value="18">Science: Computers</option>
                                        <option value="19">Science: Mathematics</option>
                                        <option value="20">Mythology</option>
                                        <option value="21">Sports</option>
                                        <option value="22">Geography</option>
                                        <option value="23">History</option>
                                        <option value="24">Politics</option>
                                        <option value="25">Art</option>
                                        <option value="26">Celebrities</option>
                                        <option value="27">Animals</option>
                                        <option value="28">Vehicles</option>
                                        <option value="29">Entertainment: Comics</option>
                                        <option value="30">Science: Gadgets</option>
                                        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                                        <option value="32">Entertainment: Cartoon &amp; Animations</option>
                                    </select>
                                    
                                    <button className='btn-block btn btn-success' type='button' onClick={() => this.play()}>Play!</button>
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

export default Select;
