import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Login.style.scss'
import axios from "axios/index";
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button/index';
import NavBar from '../NavBar/NavBar'

const API_URL = "http://pet-gallery.herokuapp.com/api/";
const APP_NAME = "Pet Gallery";

class Login extends Component {

    constructor(){
        super();
        this.state = {
            disableSubmit: true,
            errorHappened: false,
            redirect: false
        };

        this.userName = "";
        this.password = "";
        this.onInputChanged = this.onInputChanged.bind(this);
        this.submitLoginInfo = this.submitLoginInfo.bind(this);
    }

    onInputChanged(e) {
        this.setState({
            errorHappened: false
        });

        const inputName = e.target.name;
        if (inputName === 'username')
            this.userName = e.target.value;
        else if (inputName === 'pwd')
            this.password = e.target.value;

        if (this.userName !== "" && this.password !== "")
            this.setState({
                disableSubmit: false
            });
        else 
            this.setState({
                disableSubmit: true
            });
    }

    submitLoginInfo() {
        // "raymondlx" "123456"
        axios.post(API_URL + 'login',{
            username : this.userName,
            password : this.password
        })
        .then((res) => {
            const token = res.data.token;
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('username', this.userName);
            this.setState({
                redirect: true
            });
        })
        .catch((err) => {
            console.log(`Error during login: ${err}`);
            this.setState({
                errorHappened: true
            });
        });
    }

    render() {
        return(
            <div className='cp-root'>
                {this.state.redirect ? <Redirect to='/'/> : []}
                <div className='wrapper form'>
                    <p className='app-title'>{APP_NAME}</p>
                    <div className='input_wrapper'>
                        <input id="usr_box" placeholder="Username" name="username" type="text" onChange={this.onInputChanged}></input>
                        <input id="pwd_box" placeholder="Password" name="pwd" type="password" onChange={this.onInputChanged}></input>
                    </div>
                    <button className='submit-bt' disabled={this.state.disableSubmit} onClick={this.submitLoginInfo}>
                        <p className='bt-text'>Submit</p>
                    </button>
                    {this.state.errorHappened ? <p className='error-text'>Invalid username or password :(</p> : []}
                </div>
                <div className='wrapper register'>
                    <p className="app-text">Do not have an account?</p>
                    <a>Register</a>
                </div>
            </div>
        );
    }
}


export default Login