import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './Profile.module.scss'

class Profile extends Component{

    constructor(){
        super();
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