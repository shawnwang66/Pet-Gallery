import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import "./SearchView.style.scss";
import Masonry from 'react-masonry-component';
import {Loader, Dimmer} from "semantic-ui-react";
import ImageCell from '../ImageCell/ImageCell';
import axios from 'axios';
import {getUserInfo} from "../../utils/APIHelpers";
import queryString from 'querystring';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Grow from '@material-ui/core/Grow';



/**
 * Renders a our MainView in a printerest-like layout
 * We are request a list of pet from our backend and displaying it using the Masonry component
 * We are using react-masonry-component to handle this layout
 * reference: https://www.npmjs.com/package/react-masonry-component
 * https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition
 * https://material-ui.com/demos/selects/
 * https://material-ui.com/lab/slider/
 * https://www.npmjs.com/package/rc-slider
 */
const API_URL = 'http://pet-gallery.herokuapp.com/api';
let LOGIN_TOKEN = undefined;

const categoryOptions = ['Cat', 'Dog'];

const catBreedOptions = ['Siamese', 'Persian', 'Maine Coon','Ragdoll', 'Bengal', 'Abyssinian','Birman',
  'Oriental Shorthair', 'Sphynx', 'Devon Rex','Himalayan',  'American Shorthair'];

const dogBreedOptions = ['Retrievers','German Shepherd Dogs','American Bobtail Cat', 'French Bulldogs',
  'Bulldogs', 'Beagles', 'Poodles', 'Rottweilers', 'German Shorthaired', 'Yorkshire Terriers', 'Boxers', 'Dachshunds'];

const catYears = ['Kitten', 'Young', 'Adult', 'Senior'];

const dogYears = ['Puppy', 'Young', 'Adult', 'Senior'];

const energyLevel = ['Low', 'Moderate', 'High'];

const priceRange = ['$', '$$', '$$$'];

// const birdBreedOptions = ['Canaries', 'Budgies', 'Finches', 'Cockatiels', 'Quaker Parakeets', 'Pionus Parrots',
//   'Poicephalus Parrots', 'Amazon Parrots', 'Pyrrhura Conures', 'Peach-Faced Lovebirds'];

export default class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritedPets: [],
      data: [],
      displayBreedPicker: false,
      dataRequested: false,
      searchQuery: '',
      selectedCategory: '',
      selectedBreed: '',
      selectedAge: '',
      selectedEnergyLevel: '',
      selectedPrice: '',
    };

    this.setCategory = this.setCategory.bind(this);
    this.setBreed = this.setBreed.bind(this);
    this.setPrice = this.setPrice.bind(this);
    this.setEnergyLevel = this.setEnergyLevel.bind(this);
    this.setAge = this.setAge.bind(this);
    this.updateSearch = this.updateSearch.bind(this);


  }

  updateSearch() {
    this.setState({dataRequested: false});
    let params = {};
    if (this.state.searchQuery!=='') {
      params['filter'] = {input: this.state.searchQuery};
    }
    if (this.state.selectedCategory!=='') {
      params['type'] = this.state.selectedCategory;
    }
    if (this.state.selectedAge!=='') {
      params['age'] = this.state.selectedAge;
    }
    if (this.state.selectedBreed!=='') {
      if (this.state.selectedCategory==0) {
        params['breed'] = {breed: catBreedOptions[this.state.selectedBreed]};
      } else {
        params['breed'] = {breed: dogBreedOptions[this.state.selectedBreed]};
      }
    }
    if (this.state.selectedPrice!=='') {
      params['price'] = this.state.selectedPrice;
    }
    if (this.state.selectedEnergyLevel!=='') {
      params['energyLevel'] = this.state.selectedEnergyLevel;
    }


    axios.get(API_URL + '/pets', {params: params})
      .then( res => {
        console.log(res.data.data);
        this.setState({
          data: res.data.data,
          dataRequested: true
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

  componentDidMount() {
    window.scrollTo(0,0);
    let thisQuery = queryString.parse(this.props.location.search)['?text'];
    if (thisQuery !== this.state.searchQuery) {
      this.setState({searchQuery: thisQuery}, this.updateSearch);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('did update! search!!!!');

    let thisQuery = queryString.parse(this.props.location.search)['?text'];
    console.log(thisQuery, this.state.searchQuery);
    if (thisQuery !== this.state.searchQuery) {
      console.log('string=', thisQuery,'end');
      if (thisQuery !== this.state.searchQuery || this.state.data.length === 0) {
        window.scrollTo(0, 0);
        this.setState({searchQuery: thisQuery}, this.updateSearch);
      }
    }
  }

  setCategory(e) {
    let value = e.target.value;
    if (value !== this.state.selectedCategory) {
      this.setState({selectedCategory: value});
      this.setState({selectedBreed: ''});
      this.setState({selectedAge: ''});

    }
    this.setState({selectedCategory: value}, this.updateSearch);
  }

  setBreed(e) {
    let value = e.target.value;
    if (value !== this.state.selectedBreed) {
      this.setState({selectedBreed: value}, this.updateSearch);

    }
  }

  setPrice(e) {
    let value = e.target.value;
    if (value !== this.state.selectedPrice) {
      this.setState({selectedPrice: value}, this.updateSearch);

    }
  }

  setAge(e) {
    let value = e.target.value;
    if (value !== this.state.selectedAge) {
      this.setState({selectedAge: value}, this.updateSearch);

    }
  }

  setEnergyLevel(e) {
    let value = e.target.value;
    if (value !== this.state.selectedEnergyLevel) {
      this.setState({selectedEnergyLevel: value}, this.updateSearch);
    }
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
      return(<MenuItem value={idx} key={idx}>{item}</MenuItem>);
    });

    let catBreedItems = catBreedOptions.map( (item,idx) => {
      return(<MenuItem value={idx} key={idx}>{item}</MenuItem>);
    });

    let dogBreedItems = dogBreedOptions.map( (item,idx) => {
      return(<MenuItem value={idx} key={idx}>{item}</MenuItem>);
    });

    let catYearItems = catYears.map( (item,idx) => {
      return (<MenuItem value={idx} key={idx}>{item}</MenuItem>);
    });

    let dogYearItems = dogYears.map( (item,idx) => {
      return (<MenuItem value={idx} key={idx}>{item}</MenuItem>);
    });

    let priceItems = priceRange.map( (item,idx) => {
      return (<MenuItem value={idx} key={idx}>{item}</MenuItem>);
    });

    let energyItems = energyLevel.map( (item,idx) => {
      return (<MenuItem value={idx} key={idx}>{item}</MenuItem>);
    });

    // let birdBreedItems = birdBreedOptions.map( (item,idx) => {
    //   return(<MenuItem value={idx} key={idx}>{item}</MenuItem>);
    // });

    return(
      <div className={'search-background'}>
        <NavBar expanded={false} searchQuery={this.state.searchQuery}/>
        <div className={'search-view-container'}>
          <div className={'nav-bar-place-holder'}>

          </div>
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
                  {
                    this.state.selectedCategory === '' ? null :
                      <div className={'filter-container'}>
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
                              {this.state.selectedCategory===0?catBreedItems:dogBreedItems
                              }
                            </Select>
                          </FormControl>
                        </Grow>
                      </div>
                  }
                  {
                    this.state.selectedCategory === '' ? null :
                      <div className={'filter-container'}>
                        <Grow in={this.state.selectedCategory!==''}>
                          <FormControl className='filter-select-container'>
                            <InputLabel>
                              Age
                            </InputLabel>
                            <Select
                              value={this.state.selectedAge}
                              onChange={this.setAge}
                            >
                              <MenuItem value=''>
                                Age
                              </MenuItem>
                              {this.state.selectedCategory===0?catYearItems:dogYearItems}
                            </Select>
                          </FormControl>
                        </Grow>
                      </div>
                  }
                <div className={'filter-container'}>
                  <FormControl className='filter-select-container'>
                    <InputLabel>
                      Price
                    </InputLabel>
                    <Select
                      value={this.state.selectedPrice}
                      onChange={this.setPrice}
                    >
                      <MenuItem value=''>
                        Price
                      </MenuItem>
                      {priceItems}
                    </Select>
                  </FormControl>
                </div>
                <div className={'filter-container'}>
                  <FormControl className='filter-select-container'>
                    <InputLabel>
                      Energy Level
                    </InputLabel>
                    <Select
                      value={this.state.selectedEnergyLevel}
                      onChange={this.setEnergyLevel}
                    >
                      <MenuItem value=''>
                        Energy Level
                      </MenuItem>
                      {energyItems}
                    </Select>
                  </FormControl>
                </div>
              </div>
          {
            (this.state.data.length!==0 && this.state.dataRequested) ?
              <div className={'masonry-container'}>
                <Masonry
                  className={'masonry-component'}
                  options={{isFitWidth: true}}
                >
                  {petDivs}
                </Masonry>
              </div> :
              <div className={'not-found-outer-container'}>
                <div className={'not-found-inner-container'}>
                  <div className={'not-found-center'}>

                    {
                      this.state.dataRequested?
                        "No Results Found":
                      <Loader active/>
                    }
                  </div>
                </div>
              </div>

          }
        </div>
      </div>);
  }
}
