import React from 'react'
import './QuestionCell.style.scss'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import {upvoteQuestion, undoUpvoteQuestion, getUserInfo} from "../../utils/APIHelpers";
import Avatar from "@material-ui/core/Avatar";
import { Divider, Icon } from 'semantic-ui-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimateHeight from 'react-animate-height';
import AnswerCell from '../AnswerCell/AnswerCell';
import anonymous from "../../assets/anonymous.png";


const API = 'http://pet-gallery.herokuapp.com/api';


export default class QuestionCell extends React.Component {
  constructor(props){
    super(props);
    this.state={
      upvoted: false,
      upvoteCount: 0,
      commentExpanded: false,
      content: '',
      userName: '',
      userImageURL: '',
      authorID: '',
      showAnswer:'0',
      questionID: '',
      answers:[],
      user:null,
      userText:'',
      loggedIn: false,

    };
    this.toggleUpvote = this.toggleUpvote.bind(this);
    this.commentButtonOnClick = this.commentButtonOnClick.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  componentDidMount() {
    getUserInfo(localStorage.getItem('token'))
        .then(data => this.setState({
          user:data,
        }))
        .catch(err=>console.log(err));

    this.updateContent(this.props.question);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.updateContent(nextProps.question);
  }

  updateContent(inputQuestion) {
    this.setState({
      content: inputQuestion.content,
      upvoteCount: inputQuestion.upvotedBy.length,
      questionID: inputQuestion._id,
      loggedIn: localStorage.getItem('token')!==null
    });
    const token = window.localStorage.getItem('uid');
    this.setState({
      upvoted: inputQuestion.upvotedBy.indexOf(token)!==-1
    });
    if (inputQuestion.author === this.state.authorID) {
      return;
    }
    this.setState({authorID: inputQuestion.author})
    axios.get(API + '/user/' + inputQuestion.author)
      .then(data => {
        data = data.data.data[0];
        this.setState({userName: data.name, userImageURL: data.imageURL});
      })
      .catch(e => {});
    axios.get(API+'/answer/question/'+inputQuestion._id)
        .then(data=>{
          this.setState({
            answers:data.data.data
          })
        })
  }

  toggleUpvote() {
    let upvoteChange = 1;
    if (this.state.upvoted) {
      upvoteChange = -1;
      undoUpvoteQuestion(this.state.questionID);
    } else {
      upvoteQuestion(this.state.questionID);
    }
    this.setState({
      upvoted: !this.state.upvoted,
      upvoteCount: this.state.upvoteCount + upvoteChange,
    });
  }

  showAnswer(){
    if (this.state.showAnswer==='0'){
      this.setState({
        showAnswer:'auto'
      })
    }
    else{
      this.setState({
        showAnswer:'0'
      })
    }

  }

  commentButtonOnClick() {
    this.setState({commentExpanded: !this.state.commentExpanded});
  }

  async submitAnswer(){
    let token = await window.localStorage.getItem('token');
    let config = {
      headers: {'Authorization': "bearer " + token},
    };
    let data = {
      'question': this.state.questionID,
      'content':this.state.userText,
      'author':this.state.user._id,
    };

    axios.post(API+'/answer/', data, config)
        .then(res=>{
          this.setState({
            answers:[...this.state.answers,res.data.data],
            userText:'',
          }, () => {
            this.forceUpdate()
          })
        })
        .catch(err=>console.log(err))
  }

  handleChange = (event) =>{
    this.setState({
      userText:event.target.value
    })
  };

  render() {

    let answerList = this.state.answers.map((item, idx) => {
      return (<AnswerCell
          answer={item}
          key={idx}
      />);
    });
    return (
      <div>
        <div className={'question-inner-container'}>
          <Divider/>
          {
            (this.state.userImageURL==='')?
              <Avatar alt={'test name'} className='avatar' /> :
              <Avatar alt={'test name'} src={this.state.userImageURL} className='avatar' />
          }
          <div className={'question-poster-name'}>
            {this.state.userName}
          </div>
          <div className={'question-entry'}>
            {this.state.content}
          </div>
        </div>
        {
          this.state.loggedIn?
            this.state.upvoted?
              <div className={'upvoted'} onClick={this.toggleUpvote}>
                ▲ {this.state.upvoteCount}
              </div> :
              <div className={'upvote'} onClick={this.toggleUpvote}>
                ▲ {this.state.upvoteCount}
              </div> :
            <div className={'upvote-disabled'}>
              ▲ {this.state.upvoteCount}
            </div>
        }

        <div className={'comment-button'} onClick={this.commentButtonOnClick}>
          <FontAwesomeIcon className='comment-icon' icon="comment-alt"/>
          <div className={'comment-text'} onClick={this.showAnswer}>
            Answers
          </div>
        </div>

        <AnimateHeight
            className='answer'
            duration={ 500 }
            height={ this.state.showAnswer }
        >
          {answerList}
          <div className='answer-section'>
            {this.state.user ?
                <Avatar alt={this.state.user.name} src={this.state.user.imageURL} className='avatar' />:
                <Avatar alt='Anonymous' src={anonymous} className='avatar' />
            }
            {this.state.user ?
                <TextField
                    value={this.state.userText}
                    label="Answer this question"
                    placeholder="Type your answer here..."
                    multiline={true}
                    margin="normal"
                    variant="outlined"
                    rows={4}
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className='comment'

                />:
                <TextField
                    value={this.state.userText}
                    label="Answer this question"
                    placeholder="You have to login to answer a question"
                    multiline={true}
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    disabled={true}
                    rows={4}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className='comment'
                />
            }
            {this.state.user &&
            <button className='submit-answer pink' onClick={this.submitAnswer}>Submit</button>
            }
          </div>
        </AnimateHeight>
      </div>
    )
  }

}
