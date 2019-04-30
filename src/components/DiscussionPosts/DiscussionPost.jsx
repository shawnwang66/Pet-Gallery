import React, { Component } from 'react'
import './DiscussionPost.style.scss'
import { Link, Redirect } from 'react-router-dom';
import { format } from 'timeago.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class DiscussionPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question.content,
            date: this.props.question.dateCreated,
            upvote: this.props.question.upvote
        };

        this.extractDate = this.extractDate.bind(this);
    }

    extractDate(dateStr) {
        try {
            const date = dateStr.split('T')[0];
            const time = dateStr.split('T')[1].split('.')[0];
            return {
                raw: `${date} ${time}`, 
                formatted: format(dateStr, 'en-US')
            };
        } catch {
            return '';
        }
    }
    
    render() {
        return(
            <div className="discus-root">
                <div className='upvote-wrapper'>
                    <FontAwesomeIcon className='upvote-icon' icon="caret-up" />
                    <p>{this.state.upvote}</p>
                </div>
                <div className='question-txt'>
                    <p>{this.state.question}</p>
                </div>
                {this.extractDate(this.state.date) === "" ? (
					[]
				) : (
					<div className="post-time">
						<p id="formatted">{this.extractDate(this.state.date).formatted}</p>
						<p id="raw">{this.extractDate(this.state.date).raw}</p>
					</div>
				)}
            </div>
        );
    }
}


export default DiscussionPost;