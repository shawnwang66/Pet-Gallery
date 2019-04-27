import React, { Component } from 'react';
import NavBar from "../NavBar/NavBar";
import axios from 'axios'
import './PetDetail.style.scss'
import {removePetFromFavorite, addPetToFavorite,getUserInfo} from '../../utils/APIHelpers'
import { withStyles } from '@material-ui/core/styles/index';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import {Divider} from 'semantic-ui-react';

const API = 'http://pet-gallery.herokuapp.com/api';


export default class PetDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            owner: null,
            price:0,
            category:'',
            questions:[],
            description:'',
            breed:'',
            age:-1,
            gender:'unknown',
            favorite:false,
            images:[],
            energy:'',
            user: null
        };
        this.toggleFavorite = this.toggleFavorite.bind(this);
        this.generateFav = this.generateFav.bind(this);
    }

    componentDidMount() {
        getUserInfo(localStorage.getItem('token'))
            .then(data => this.setState({
                user:data
            }));

        axios.get(API+'/pets/'+this.state.id)
            .then(result => {
                const data = result.data.data[0];
                this.setState({
                    name:data.name,
                    price:data.price,
                    age:data.age,
                    breed:data.breed,
                    category:data.category,
                    questions:data.questions,
                    description:data.description,
                    gender:data.gender,
                    images:data.imageURLs,
                    energy:data.energyLevel,
                    favorite: this.state.user?data.favoritedBy.includes(this.state.user._id):false
                });
            axios.get(API+'/user/'+data.owner)
                .then(result =>{
                    const owner = result.data.data[0];
                    this.setState({owner:owner})
                })
            }).catch(err=>console.log(err));
    }

    toggleFavorite(){
        if (this.state.favorite){
            removePetFromFavorite(this.state.id)
                .then(()=>this.setState({
                    favorite:false
                }))
        }
        else{
            addPetToFavorite(this.state.id)
                .then(()=>this.setState({
                    favorite:true
                }))
        }
    }

    generateFav(){
        if (this.state.user){
            return (!this.state.favorite?
                <button className='favorite' onClick={this.toggleFavorite}>Favorite</button>
                :<button className='favorited' onClick={this.toggleFavorite}>Favorited</button>);
        }
        else{
            return null;
        }
    }

    render() {
        const favorite = this.generateFav();
        console.log(this.state.owner)
        return (
            <div className='main'>
                <NavBar expanded={false}/>
                <div className="main-info">
                    <div className='img-container'>
                        <img style={{backgroundImage:`url(${this.state.images[0]})`}}/>
                    </div>
                    <div className='description'>
                        <h1>{this.state.name}</h1>
                        {favorite}
                        <h3>{'$'+this.state.price}</h3>
                        <div className='button-group'>
                            <Button variant="contained" color="primary">
                                {this.state.gender}
                            </Button>
                            <Button variant="contained" color="primary">
                                {this.state.category}
                            </Button>
                            <Button variant="contained" color="primary">
                                {this.state.breed}
                            </Button>
                            <Button variant="contained" color="primary">
                                {this.state.age+' Months'}
                            </Button>
                            <Button variant="contained" color="primary">
                                {this.state.energy+' energy level'}
                            </Button>
                        </div>
                        <Divider horizontal className='divider'>Owner's Note</Divider>
                        <div className='owner-note'>
                            {this.state.owner &&
                            <Avatar alt={this.state.owner.name} src={this.state.owner.imageURL} className='avatar' />
                            }
                            {this.state.description}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
