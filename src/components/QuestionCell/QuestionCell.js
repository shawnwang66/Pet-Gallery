import React from 'react'
import './QuestionCell.style.scss'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import {getUserInfo} from "../../utils/APIHelpers";
import Avatar from "@material-ui/core/Avatar";

const API = 'http://pet-gallery.herokuapp.com/api';


export default class QuestionCell extends React.Component {
  constructor(props){
    super(props);
    this.state={
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      null
    )
  }

}
