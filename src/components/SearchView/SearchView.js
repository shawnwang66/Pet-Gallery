import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import "./SearchView.style.scss";
import Masonry from 'react-masonry-component';
import {Dropdown, Transition} from "semantic-ui-react";
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

const sizeOptions = [
  {text: 'Small', key: 1, value:1},
  {text: 'Medium', key: 2, value:2},
  {text: 'Large', key: 3, value:3},
];

const categoryOptions = [
  {text: 'Cat', key: 1, value:1},
  {text: 'Dog', key: 2, value:2},
  {text: 'Bird', key: 3, value:3},
];

const catBreedOptions = [
  {text: 'Siamese', key: 1, value:1},
  {text: 'Persian', key: 2, value:2},
  {text: 'Maine Coon', key: 3, value:3},
  {text: 'Ragdoll', key: 4, value:4},
  {text: 'Bengal', key: 5, value:5},
  {text: 'Abyssinian', key: 6, value:6},
  {text: 'Birman', key: 7, value:7},
  {text: 'Oriental Shorthair', key: 8, value:8},
  {text: 'Sphynx', key: 9, value:9},
  {text: 'Devon Rex', key: 10, value:10},
  {text: 'Himalayan', key: 11, value:11},
  {text: 'American Shorthair', key: 12, value:12},
];

const dogBreedOptions = [
  {text: 'Retrievers', key: 1, value:1},
  {text: 'German Shepherd Dogs', key: 2, value:2},
  {text: 'American Bobtail Cat', key: 3, value:3},
  {text: 'French Bulldogs', key: 4, value:4},
  {text: 'Bulldogs', key: 5, value:5},
  {text: 'Beagles', key: 6, value:6},
  {text: 'Poodles', key: 7, value:7},
  {text: 'Rottweilers', key: 8, value:8},
  {text: 'German Shorthaired', key: 9, value:9},
  {text: 'Yorkshire Terriers', key: 10, value:10},
  {text: 'Boxers', key: 11, value:11},
  {text: 'Dachshunds', key: 12, value:12},
];

const birdBreedOptions = [
  {text: 'Canaries', key: 1, value:1},
  {text: 'Budgies', key: 2, value:2},
  {text: 'Finches', key: 3, value:3},
  {text: 'Cockatiels', key: 4, value:4},
  {text: 'Quaker Parakeets', key: 5, value:5},
  {text: 'Pionus Parrots', key: 6, value:6},
  {text: 'Poicephalus Parrots', key: 7, value:7},
  {text: 'Amazon Parrots', key: 8, value:8},
  {text: 'Pyrrhura Conures', key: 9, value:9},
  {text: 'Peach-Faced Lovebirds', key: 10, value:10},
];

export default class SearchView extends Component {
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
        if (LOGIN_TOKEN !== undefined) {
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
      if (item.age > 0) {
        return(<ImageCell
          key={idx}
          name={item.name}
          imageURL={item.imageURLs[0]}
          location={'Champaign, IL'}
          id={item._id}
          isFavorite={this.state.favoritedPets.includes(item._id)}
          isLoggedIn={LOGIN_TOKEN!==undefined}
        />);
      }
      return(null);
    });
    if (this.state.searchMode) {
      console.log('search mode!');
    }
    return(
      <div>
        <NavBar expanded={false}/>
        <div className={'main-view-container'}>
          {
            this.state.searchMode?
              <div className={'filter-container expanded'}>
                <Dropdown
                  placeholder={'Size'}
                  floating
                  options={birdBreedOptions}
                  clearable
                  selection/>
                <Dropdown
                  placeholder={'Category'}
                  floating
                  options={categoryOptions}
                  clearable
                  selection/>

              </div> :
              <div className={'filter-container closed'}/>
          }
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
