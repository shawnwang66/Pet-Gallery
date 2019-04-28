import React, { Component } from 'react'
import './Login.style.scss'
import axios from "axios/index";
import { Link, Redirect } from 'react-router-dom';

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
        const inputName = e.target.name;
        switch (inputName) {
            case 'username':
                this.userName = e.target.value;
                break;
            case 'pwd':
                this.password = e.target.value;
                break;
        }
        
        this.setState({
            disableSubmit: this.userName === "" || this.password === "",
            errorHappened: false
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
                    <div className='input-wrapper'>
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
                    <Link to={{ pathname: "/register" }}>
                        <p>Sign up</p>
                    </Link>
                </div>
            </div>
        );
    }
}


export default Login