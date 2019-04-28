import React from 'react'
import './QASection.style.scss'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import {getUserInfo} from "../../utils/APIHelpers";
import Avatar from "@material-ui/core/Avatar";

const API = 'http://pet-gallery.herokuapp.com/api';


export default class QASection extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questions:[],
            user:null
        }
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

    render() {

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
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className='comment'
                    />
                </div>
                <button className='submit'>Submit</button>
            </div>
        )
    }

}
