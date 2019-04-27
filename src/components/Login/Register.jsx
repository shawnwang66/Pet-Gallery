import React, { Component } from 'react'
import './Login.style.scss'
import axios from "axios/index";
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_URL = "http://pet-gallery.herokuapp.com/api/";
const TITLE = "Welcome";

class Register extends Component {

    constructor(){
        super();
        this.state = {
            disableSubmit: true,
            errorHappened: false,
            requireAllFilled: false,
            validEmail: true,
            redirect: false
        };

        this.userName = "";
        this.password = "";
        this.fullName = "";
        this.userEmail = "";
        this.userLoc = "";

        this.onInputChanged = this.onInputChanged.bind(this);
        this.submitRegisterInfo = this.submitRegisterInfo.bind(this);
    }

    isEmailValid(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    onInputChanged(e) {

        const inputName = e.target.name;
        const val = e.target.value;
        let validEmail = this.state.validEmail, 
            requireAllFilled = true;

        switch (inputName) {
            case 'username':
                this.userName = val;
                break;
            case 'pwd':
                this.password = val;
                break;
            case 'email':
                if (this.isEmailValid(e.target.value)) {
                    this.userEmail = e.target.value;
                    validEmail = true;
                } else
                    validEmail = false;
                break;
            case 'fullname':
                this.fullName = e.target.value;
                break;
            case 'loc':
                this.loc = e.target.value;
                break;
        }

        const inputs = Object.values(document.getElementById('input-wrapper').childNodes);

        inputs.some((element, _) => {
            console.log(requireAllFilled);
            if (element.className === 'required' && 
                (!element.value || element.value === '')) {
                requireAllFilled = false;
                return true;
            }
        });

        this.setState({
            disableSubmit: (requireAllFilled && validEmail) ? false : true,
            requireAllFilled: requireAllFilled,
            validEmail: validEmail,
            errorHappened: false
        });
    }

    submitRegisterInfo() {
        // "raymondlx" "123456"
        axios.post(API_URL + 'user', {
            username: this.userName,
            password: this.password,
            name: this.fullName,
            email: this.userEmail,
            location: this.userLoc
        })
        .then((res) => {
            console.log(`User Created: ${res}`);
        })
        .catch((err) => {
            console.log(`Cannot create user: ${err}`);
            this.setState({
                errorHappened: true
            });
        });
    }

    render() {
        return(
            <div className='cp-root'>
                {this.state.redirect ? <Redirect to='/'/> : []}
                <p className='slogan'>
                    <span class="font-icon"><FontAwesomeIcon icon="cat" /></span>
                    <span class="font-icon"><FontAwesomeIcon icon="dove" /></span>
                    <span class="font-icon"><FontAwesomeIcon icon="dog" /></span>
                </p>
                <div className='wrapper form'>
                    <p className='app-title'>{TITLE}</p>
                    <div id='input-wrapper' className='input-wrapper'>
                        <input id="usr_box" class="required" placeholder="Username *" name="username" type="text" onChange={this.onInputChanged}></input>
                        <input id="pwd_box" class="required" placeholder="Password *" name="pwd" type="password" onChange={this.onInputChanged}></input>
                        <input id="email_box" class="required" placeholder="Email *" name="email" type="text" onChange={this.onInputChanged}></input>
                        <input id="name_box" class="required" placeholder="Fullname *" name="fullname" type="text" onChange={this.onInputChanged}></input>
                        <input id="loc_box" placeholder="Location" name="loc" type="text" onChange={this.onInputChanged}></input>
                    </div>
                    <button className='submit-bt' disabled={this.state.disableSubmit} onClick={this.submitRegisterInfo}>
                        <p className='bt-text'>Submit</p>
                    </button>
                    {this.state.errorHappened ? <p className='error-text'>Username or email already taken :(</p> : 
                    !this.state.validEmail ? <p className='error-text'>Invalid email</p> : 
                    !this.state.requireAllFilled ? <p className='error-text'>Please fill all required fields</p> : []}
                </div>
                <div className='wrapper register'>
                    <p className="app-text">Already have an account?</p>
                    <Link to={{ pathname: "/login" }}>
                        <a>Log in</a>
                    </Link>
                </div>
            </div>
        );
    }
}


export default Register