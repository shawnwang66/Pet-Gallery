import React, { Component } from 'react';
import "./ImageCell.style.scss";
import { Icon } from 'semantic-ui-react'
import {addPetToFavorite, removePetFromFavorite} from "../../utils/APIHelpers";
import { Link } from 'react-router-dom';

/**
 * Renders a our MainView in a printerest-like layout
 * We are request a list of pet from our backend and displaying it using the Masonry component
 * We are using react-masonry-component to handle this layout
 * reference: https://www.npmjs.com/package/react-masonry-component
 * https://www.w3schools.com/howto/howto_css_image_overlay.asp
 */
const API_URL = 'http://pet-gallery.herokuapp.com/api';

export default class ImageCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Test',
      imageURL: 'https://imaggites.unsplash.com/photo-1512546148165-e50d714a565a',
      location: undefined,
      id: '',
      isFavorite: false,
      loggedIn: false,
      ownerID: '',
    };

    this.favoriteButtonOnClick = this.favoriteButtonOnClick.bind(this);
    this.infoButtonOnClick = this.infoButtonOnClick.bind(this);
    this.updateState = this.updateState.bind(this);
    this.petOnClick = this.petOnClick.bind(this);

  }

  componentDidMount() {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.updateState(nextProps);
  }

  updateState(props) {
    this.setState({
      name: props.name,
      imageURL: props.imageURL,
      id: props.id,
      isFavorite: props.isFavorite,
      loggedIn: localStorage.getItem('token')!==null,
      ownerID: props.ownerID,
      location: props.location,
    });
  }

  favoriteButtonOnClick() {
    if (!this.props.isLoggedIn) {
      return;
    }
    if (this.state.isFavorite) {
      // remove this id from favorite
      removePetFromFavorite(this.props.id);
    } else {
      // add this id to favorite
      addPetToFavorite(this.props.id);

    }
    this.setState({
      isFavorite: !this.state.isFavorite,
    })
  }

  infoButtonOnClick() {

  }

  petOnClick() {
  }

  render() {
    return(<div className={'image-cell-container'}>
      <Link to={{ pathname: '/pet/'+this.state.id }}>
        <img src={this.state.imageURL} className={'round-image'} alt={this.state.name}/>
      </Link>
      <div className={'detail-flex-container'}>
        <div className={'name-location-container'}>
          <div className={'name-container'}>
            {this.state.name}
          </div>
          <div className={'location-container'}>
            {(this.state.location!==undefined)?this.state.location:'Unknown Location'}
          </div>
        </div>
        <div className={'button-container'}>
          {this.state.loggedIn?
            this.state.isFavorite?
            <Icon className={'heart-icon'} name="heart" size='large' onClick={this.favoriteButtonOnClick} color={'red'}/>:
            <Icon className={'heart-icon'} name="heart outline" size='large' onClick={this.favoriteButtonOnClick}/> :
            <Icon className={'heart-icon'} disabled name="heart outline" size='large'/>
          }
          <Icon className={'info-icon'} name="ellipsis horizontal" size='large' onClick={this.infoButtonOnClick}/>
        </div>
      </div>
    </div>);
  }
}
