import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import "./MainView.style.scss";
import Masonry from 'react-masonry-component';
import ImageCell from '../ImageCell/ImageCell';
import axios from 'axios';
import {getUserInfo} from "../../utils/APIHelpers";

/**
 * Renders a our MainView in a printerest-like layout
 * We are request a list of pet from our backend and displaying it using the Masonry component
 * We are using react-masonry-component to handle this layout
 * reference: https://www.npmjs.com/package/react-masonry-component
 */
const API_URL = 'http://pet-gallery.herokuapp.com/api';
let LOGIN_TOKEN = undefined;

export default class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritedPets: [],
      data: [],
      searchMode: false,
      displayBreedPicker: false,
    }
  }

  componentDidMount() {
    setTimeout(function() {
      this.setState({searchMode: true})
    }.bind(this), 1000);
    setTimeout(function() {
      this.setState({displayBreedPicker: true})
    }.bind(this), 2000);
    axios.get(API_URL + '/pets')
      .then( res => {
        this.setState({
          data: res.data.data
        });
        LOGIN_TOKEN = window.localStorage.getItem('token');
        if (LOGIN_TOKEN !== null) {
          getUserInfo(LOGIN_TOKEN).then(
            resData => {
              this.setState({
                favoritedPets: resData.favoritedPets
              });
            }
          ).catch(e => {});
        }
      })
      .catch( e => {})
  }

  render() {
    let petDivs = this.state.data.map( (item, idx)=> {
      // we have to filter out some data first
      // we also need to save the location info for the pet
      if (item.age >= 0) {
        return(<ImageCell
          key={idx}
          name={item.name}
          imageURL={item.imageURLs[0]}
          id={item._id}
          isFavorite={this.state.favoritedPets.includes(item._id)}
          isLoggedIn={LOGIN_TOKEN!==undefined}
          ownerID={item.owner}
          location={item.location}
        />);
      }
      return(null);
    });
    return(
        <div>
          <NavBar expanded={true}/>
          <div className={'main-view-container'}>
            <div className={'masonry-container'}>
              <Masonry
                 className={'masonry-component'}
                 options={{isFitWidth: true}}
              >
                {petDivs}
              </Masonry>
            </div>
          </div>
        </div>);
  }
}
