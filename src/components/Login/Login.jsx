import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Login.style.scss'
import axios from "axios/index";
import Button from '@material-ui/core/Button/index';
import NavBar from '../NavBar/NavBar'

const API_URL = "http://pet-gallery.herokuapp.com/api/";
const APP_NAME = "WELCOME BACK";

class Login extends Component {

    constructor(){
        super();
        this.state = {
            disableSubmit: true
        };

        this.userName = "";
        this.password = "";
        this.login = this.login.bind(this);
        this.onInputChanged = this.onInputChanged.bind(this);
    }

    login(baseURL){
        // login
        axios.post(baseURL + 'login',{
            username : "raymondlx",
            password : "123456"
        })
            .then((response)=>{
                // console.log(response);
                window.localStorage.setItem('token',response.data.token);
            })
    }

    getUserInfo(baseURL, token){
        // get user info
        const config ={
            headers: {'Authorization': "bearer " + token}
        }

        axios.get(baseURL + 'user', config)
            .then((response)=>{

            })
    }

    onInputChanged(e) {
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

    async componentWillMount() {
        window.localStorage.setItem('baseURL', API_URL);

        let token;
        // login adn get token
        await this.login(API_URL);
        token = window.localStorage.getItem('token');

        // get user info
        await this.getUserInfo(API_URL, token)
    }

    render() {
        return(
            <div className='cp-root'>
                <div className='wrapper form'>
                    <p className='app-title'>{APP_NAME}</p>
                    <div className='input_wrapper'>
                        <input id="usr_box" placeholder="Username" name="username" type="text" onChange={this.onInputChanged}></input>
                        <input id="pwd_box" placeholder="Password" name="pwd" type="password" onChange={this.onInputChanged}></input>
                    </div>
                    <button className='submit-bt' disabled={this.state.disableSubmit}>
                        <p className='bt-text'>Submit</p>
                    </button>
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