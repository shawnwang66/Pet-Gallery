import React, { Component } from 'react'
import './DiscussionPost.style.scss'
import axios from "axios/index";
import { Link, Redirect } from 'react-router-dom';

const API_URL = "http://pet-gallery.herokuapp.com/api/";
const APP_NAME = "Pet Gallery";

class DiscussionPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question.content,
            date: this.props.question.dateCreated,
            upvote: this.props.question.upvote
        };
    }

    
    render() {
        return(
            <div>
                {`${this.state.question}\n${this.state.date}\n${this.state.upvote}`}
            </div>
        );
    }
}


export default DiscussionPost;