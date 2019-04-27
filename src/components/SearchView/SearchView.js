import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import "./SearchView.style.scss";
import Masonry from 'react-masonry-component';
import {Dropdown, Transition} from "semantic-ui-react";
import ImageCell from '../ImageCell/ImageCell';
import axios from 'axios';
import {getUserInfo} from "../../utils/APIHelpers";
import queryString from 'querystring';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Grow from '@material-ui/core/Grow';
import Slider, { Range } from 'rc-slider';



/**
 * Renders a our MainView in a printerest-like layout
 * We are request a list of pet from our backend and displaying it using the Masonry component
 * We are using react-masonry-component to handle this layout
 * reference: https://www.npmjs.com/package/react-masonry-component
 * https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition
 * https://material-ui.com/demos/selects/
 * https://material-ui.com/lab/slider/
 */
const API_URL = 'http://pet-gallery.herokuapp.com/api';
let LOGIN_TOKEN = undefined;

const categoryOptions = ['Cat', 'Dog', 'Bird',];

const catBreedOptions = ['Siamese', 'Persian', 'Maine Coon','Ragdoll', 'Bengal', 'Abyssinian','Birman',
  'Oriental Shorthair', 'Sphynx', 'Devon Rex','Himalayan',  'American Shorthair'];

const dogBreedOptions = ['Retrievers','German Shepherd Dogs','American Bobtail Cat', 'French Bulldogs',
  'Bulldogs', 'Beagles', 'Poodles', 'Rottweilers', 'German Shorthaired', 'Yorkshire Terriers', 'Boxers', 'Dachshunds'];

const birdBreedOptions = ['Canaries', 'Budgies', 'Finches', 'Cockatiels', 'Quaker Parakeets', 'Pionus Parrots',
  'Poicephalus Parrots', 'Amazon Parrots', 'Pyrrhura Conures', 'Peach-Faced Lovebirds'];

export default class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritedPets: [],
      data: [],
      displayBreedPicker: false,
      searchQuery: '',
      selectedCategory: '',
      selectedBreed: '',
      priceSliderValue: 0,
    };

    this.setCategory = this.setCategory.bind(this);
    this.setBreed = this.setBreed.bind(this);
    this.updatePriceSlider = this.updatePriceSlider.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0,0);
    let thisQuery = queryString.parse(this.props.location.search)['?text'];
    if (thisQuery !== this.state.searchQuery) {
      this.setState({searchQuery: thisQuery});
    }
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    let thisQuery = queryString.parse(this.props.location.search)['?text'];
    if (thisQuery !== this.state.searchQuery) {
      window.scrollTo(0, 0);
      this.setState({searchQuery: thisQuery});
    }
  }

  setCategory(e) {
    let value = e.target.value;
    if (value !== this.state.selectedCategory) {
      this.setState({selectedCategory: value});
      this.setState({selectedBreed: ''});

    }
    this.setState({selectedCategory: value});
  }

  setBreed(e) {
    let value = e.target.value;
    if (value !== this.state.selectedBreed) {
      this.setState({selectedBreed: value});

    }
  }

  updatePriceSlider(e, val) {
    this.setState({priceSliderValue: val})
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

    let categoryItems = categoryOptions.map( (item,idx) => {
      return(<MenuItem value={idx}>{item}</MenuItem>);
    });

    let catBreedItems = catBreedOptions.map( (item,idx) => {
      return(<MenuItem value={idx}>{item}</MenuItem>);
    });

    let dogBreedItems = dogBreedOptions.map( (item,idx) => {
      return(<MenuItem value={idx}>{item}</MenuItem>);
    });

    let birdBreedItems = birdBreedOptions.map( (item,idx) => {
      return(<MenuItem value={idx}>{item}</MenuItem>);
    });

    return(
      <div>
        <NavBar expanded={false} searchQuery={this.state.searchQuery}/>
        <div className={'search-view-container'}>
              <div className={'filter-container expanded'}>
                <div className={'filter-container'}>
                  <FormControl className='filter-select-container'>
                    <InputLabel>
                      Category
                    </InputLabel>
                    <Select
                      value={this.state.selectedCategory}
                      onChange={this.setCategory}
                    >
                      <MenuItem value=''>
                        Category
                      </MenuItem>
                      {categoryItems}
                    </Select>
                  </FormControl>
                </div>
                <div className={'filter-container expanded'}>
                  {
                    this.state.selectedCategory === '' ? null :
                      <Grow in={this.state.selectedCategory!==''}>
                        <FormControl className='filter-select-container'>
                          <InputLabel>
                            Breed
                          </InputLabel>
                          <Select
                            value={this.state.selectedBreed}
                            onChange={this.setBreed}
                          >
                            <MenuItem value=''>
                              Breed
                            </MenuItem>
                            {this.state.selectedCategory===0?catBreedItems:
                              (this.state.selectedCategory===1?dogBreedItems:birdBreedItems)
                            }
                          </Select>
                        </FormControl>
                      </Grow>
                  }
                </div>
              </div>
              <div className={'filter-container closed'}/>
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
