import React from 'react'
import './AnswerCell.style.scss'
import axios from 'axios'
import Avatar from "@material-ui/core/Avatar";
import { Divider, Icon } from 'semantic-ui-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const API = 'http://pet-gallery.herokuapp.com/api';


export default class AnswerCell extends React.Component {
  constructor(props){
    super(props);
    this.state={
      upvoted: false,
      upvoteCount: 0,
      content: '',
      user:null,
    };
    this.toggleUpvote = this.toggleUpvote.bind(this);
  }



  toggleUpvote() {
    let upvoteChange = 1;
    if (this.state.upvoted) {
      upvoteChange = -1;
    }
    this.setState({
      upvoted: !this.state.upvoted,
      upvoteCount: this.state.upvoteCount + upvoteChange,
    });
  }

  render() {
    return (
      <div>
        <div className={'answer-inner-container'}>
          <Divider/>
          {
            (this.state.userImageURL==='')?
              <Avatar alt={'test name'} className='avatar' /> :
              <Avatar alt={'test name'} src={this.state.userImageURL} className='avatar' />
          }
          <div className={'answer-poster-name'}>
            Test User
          </div>
          <div className={'answer-entry'}>
            Answer AnswerAnswerAnswerAnswerAnswerAnswerAnswerAnswerAnswerAnswerAnswerAnswerAnswerAnswerAnswerAnswer
          </div>
        </div>
        {
          this.state.upvoted?
            <div className={'answer-upvoted'} onClick={this.toggleUpvote}>
              ▲ {this.state.upvoteCount}
            </div> :
            <div className={'answer-upvote'} onClick={this.toggleUpvote}>
              ▲ {this.state.upvoteCount}
            </div>
        }
      </div>
    )
  }

}
