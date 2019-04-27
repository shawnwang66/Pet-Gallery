import React, { Component } from 'react';
import "./MainView.style.scss";
import Masonry from 'react-masonry-component';
import ImageCell from '../ImageCell/ImageCell';
import axios from 'axios';

/**
 * Renders a our MainView in a printerest-like layout
 * We are request a list of pet from our backend and displaying it using the Masonry component
 * We are using react-masonry-component to handle this layout
 * reference: https://www.npmjs.com/package/react-masonry-component
 */
const API_URL = 'http://pet-gallery.herokuapp.com/api';

export default class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    axios.get(API_URL + '/pets')
      .then( res => {
        this.setState({
          data: res.data.data
        });
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
          isFavorite={false}
        />);
      }
      return(null);
    });
    return(
      <div className={'main-view-container'}>
         <div className={'masonry-container'}>
           <Masonry
             className={'masonry-component'}
             options={{isFitWidth: true}}
           >
             {petDivs}
           </Masonry>
         </div>
      </div>);
  }
}
