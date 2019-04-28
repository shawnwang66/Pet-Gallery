import React from 'react'
import './QASection.style.scss'
import axios from 'axios'

const API = 'http://pet-gallery.herokuapp.com/api';


export default class QASection extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questions:[]
        }
    }

    componentDidMount() {
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
            <div></div>
        )
    }

}
