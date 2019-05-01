import React from 'react'
import './QASection.style.scss'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import QuestionCell from '../QuestionCell/QuestionCell';
import {getUserInfo} from "../../utils/APIHelpers";
import Avatar from "@material-ui/core/Avatar";

const API = 'http://pet-gallery.herokuapp.com/api';


export default class QASection extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questions:['1'],
            user:null,
            userText:''
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
                console.log('data=', data);
                this.setState({questions: data});
            })
    }


    handleChange = (event) =>{
        this.setState({
            userText:event.target.value
        })
    };

    submitQuestion(){

    }

    render() {
        let questionList = this.state.questions.map((item,idx) => {
            return (<QuestionCell
                key={idx}
                question={item}
            />);
        });

        return (
            <div className='QA-section'>
                <div className='comment-section'>
                    {this.state.user &&
                    <Avatar alt={this.state.user.name} src={this.state.user.imageURL} className='avatar' />}
                    <TextField
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
                <div className='question-container'>
                    {questionList}
                </div>
            </div>
        )
    }

}
