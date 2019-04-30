import React from 'react'
import './QASection.style.scss'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import {getUserInfo} from "../../utils/APIHelpers";
import Avatar from "@material-ui/core/Avatar";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import {animateScroll as scroll } from 'react-scroll';


const API = 'http://pet-gallery.herokuapp.com/api';


export default class QASection extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questions:[],
            user:null,
            userText:'',
            dialog: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitQuestion = this.submitQuestion.bind(this);
    }

    componentDidMount() {
        getUserInfo(localStorage.getItem('token'))
            .then(data => this.setState({
                user:data,
            }))
            .catch(err=>console.log(err));

        const pet = this.props.pet;
        axios.get(API+'/question/pet/'+pet)
            .then(result=>{
                const data = result.data.data;
                data.map(item=>{
                    this.setState({
                        questions:[item,...this.state.questions]
                    });
                })
            })
    }


    handleChange = (event) =>{
        this.setState({
            userText:event.target.value
        })
    };

    async submitQuestion(){
        let token = await window.localStorage.getItem('token');
        let config = {
            headers: {'Authorization': "bearer " + token},
        };

        let data = {
            'pet': this.props.pet,
            'content':this.state.userText,
            'upvote':0,
            'answer':[],
            'author':this.state.user._id,

        };

        axios.post(API+'/question/', data, config)
            .then(()=>{
                data.dateCreated='Just now';
                this.setState({
                    question:[...this.state.questions,data],
                    userText:'',
                    dialog:true
                })

            })
            .catch(err=>console.log(err))
    }

    render() {
        console.log(this.state.question);
        return (
            <div className='QA-section'>
                <div className='comment-section'>
                    {this.state.user &&
                    <Avatar alt={this.state.user.name} src={this.state.user.imageURL} className='avatar' />}
                    <TextField
                        value={this.state.userText}
                        label="Ask a question"
                        placeholder="Type your question here..."
                        multiline={true}
                        margin="normal"
                        variant="outlined"
                        rows={4}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className='comment'
                    />
                </div>
                <button className='submit' onClick={this.submitQuestion}>Submit</button>
                <Dialog
                    open={this.state.dialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Question Submitted!"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={()=>{
                            this.setState({dialog:false});
                            scroll.scrollToBottom({
                                duration: 1500,
                                delay: 100,
                                smooth: true,})
                        }} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}
