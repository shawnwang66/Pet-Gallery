import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './Profile.module.scss'
import axios from "axios";

class Profile extends Component{

    constructor(){
        super();
        this.state = {
            profile_img : "",
            basURL : "http://localhost:4000/api/"
        }

        this.getUserInfo = this.getUserInfo.bind(this);
    }

    getUserInfo(){
        axios.get()
    }



    render(){

        return(
            <div className={styles.testCase}>
                <h1>Init</h1>
            </div>
        );
    }
}


export default Profile