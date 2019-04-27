import React, { Component } from 'react';
import NavBar from "../NavBar/NavBar";
import axios from 'axios'
import './PetDetail.style.scss'
import {Button} from 'semantic-ui-react'

const API = 'http://pet-gallery.herokuapp.com/api';

const userId = localStorage.getItem('userId');

export default class PetDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            owner: '',
            price:0,
            questions:[],
            description:'',
            breed:'',
            age:-1,
            gender:'unknown',
            favorite:false,
            images:[],
        };
    }

    componentDidMount() {
        axios.get(API+'/pets/'+this.state.id)
            .then(result => {
                const data = result.data.data[0];
                this.setState({
                    name:data.name,
                    owner:data.owner,
                    price:data.price,
                    breed:data.breed,
                    questions:data.questions,
                    description:data.description,
                    gender:data.gender,
                    images:data.imageURLs,
                    favorite: data.favoritedBy.includes(userId)
                })
            }).catch(err=>console.log(err));
    }

    render() {
        console.log(this.state);
        const Avatar = {
            backgroundImage: `url(${this.state.images[0]})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }
        return (
            <div className='main'>
                <NavBar expanded={false}/>
                <div class="main-info">
                    <div className='imgContainer'>
                        <img style={Avatar}/>
                    </div>
                    <div className='description'>
                        <h1>{this.state.name}</h1>
                        <button className='favorite'>Favorite</button>
                        <h2>{this.state.gender}</h2>
                    </div>
                </div>
            </div>
        )
    }
}
