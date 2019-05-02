import React, { Component } from 'react'
import './DiscussionPosts.style.scss'
import axios from "axios/index";
import DiscussionPost from '../DiscussionPosts/DiscussionPost'
const API_URL = "http://pet-gallery.herokuapp.com/api/";

class DiscussionPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: this.props.userId,
            questions: [],
            answers: []
        };

        this.userName = "";
        this.password = "";
    }

    componentDidMount() {
        const token = window.localStorage.getItem('token');
        const config = {
            headers: { 'Authorization': `bearer ${token}` }
        }
        axios
            .get(`${API_URL}question/user/${this.state.uid}`, config)
            .then((res) => {
                const questions = res.data.data;
                this.setState({
                    questions: questions
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }


    render() {
        return(
            <div className='posts-wrapper'>
                {   this.state.questions ?
                    <DiscussionPost question={0}></DiscussionPost>
                :   this.state.questions.length() === 0 ?
                    <DiscussionPost question={0}></DiscussionPost>
                :
                    this.state.questions.map((q, idx) => <DiscussionPost key={idx} question={q}></DiscussionPost>
                    )
                }
            </div>
        );
    }
}


export default DiscussionPosts;
