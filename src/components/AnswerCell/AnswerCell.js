import React from 'react'
import './AnswerCell.style.scss'
import axios from 'axios'
import Avatar from "@material-ui/core/Avatar";
import { Divider, Icon } from 'semantic-ui-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {upvoteAnswer, undoUpvoteAnswer, undoUpvoteQuestion, upvoteQuestion, getUserInfo} from "../../utils/APIHelpers";


const API = 'http://pet-gallery.herokuapp.com/api';


export default class AnswerCell extends React.Component {
  constructor(props){
    super(props);
    this.state={
      upvoted: false,
      upvoteCount: 0,
      content: '',
      userName:'',
      userImageURL:'',
      user:null,
      answerId:''
    };
    this.toggleUpvote = this.toggleUpvote.bind(this);
  }

  componentDidMount() {
    this.updateContent(this.props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.updateContent(nextProps);
  }

  updateContent(input){
    const answer = input.answer;
    const uid = window.localStorage.getItem('uid');
    this.setState({
      answerId:answer._id,
      content:answer.content,
      upvoteCount:answer.upvotedBy.length,
    });
    const token = window.localStorage.getItem('uid');
    this.setState({
      upvoted: answer.upvotedBy.indexOf(token)!==-1
    });
    axios.get(API + '/user/' + answer.author)
        .then(data => {
          data = data.data.data[0];
          this.setState({userName: data.name, userImageURL: data.imageURL});
        })
        .catch(e => {});
  }

  toggleUpvote() {
    let upvoteChange = 1;
    if (this.state.upvoted) {
      upvoteChange = -1;
      undoUpvoteAnswer(this.state.answerId);
    } else {
      upvoteAnswer(this.state.answerId);
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
            {this.state.userName}
          </div>
          <div className={'answer-entry'}>
            {this.state.content}
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
