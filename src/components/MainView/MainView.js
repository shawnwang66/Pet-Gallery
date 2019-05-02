import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import "./MainView.style.scss";
import Masonry from 'react-masonry-component';
import ImageCell from '../ImageCell/ImageCell';
import axios from 'axios';
import {getUserInfo} from "../../utils/APIHelpers";
import Pagination from "material-ui-flat-pagination";
import queryString from "querystring";
import {Link} from "react-router-dom";

/**
 * Renders a our MainView in a printerest-like layout
 * We are request a list of pet from our backend and displaying it using the Masonry component
 * We are using react-masonry-component to handle this layout
 * reference: https://www.npmjs.com/package/react-masonry-component
 * https://stackoverflow.com/questions/45585542/detecting-when-user-scrolls-to-bottom-of-div-with-react-js
 */
const API_URL = 'http://pet-gallery.herokuapp.com/api';
let LOGIN_TOKEN = undefined;
const PAGE_LIMIT = 420;

export default class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritedPets: [],
      data: [],
      currentPage: 0,
      pageCount: 1,
    };

    this.requestDataForPage = this.requestDataForPage.bind(this);
    this.updateDataForPage = this.updateDataForPage.bind(this);

  }

  componentDidMount() {
    this.requestDataForPage(this.props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.requestDataForPage(nextProps)
  }

  requestDataForPage(inputProps) {
    console.log('request new stuff!');
    try {
      let thisPage = queryString.parse(inputProps.location.search)['?page'];
      if (thisPage===undefined) {
        thisPage = 0;
      } else {
        thisPage = parseInt(thisPage);
        if (isNaN(thisPage)) {
          thisPage = 0;
        }
      }
      let offset = thisPage * PAGE_LIMIT;
      axios.get(API_URL + '/pets' + '?limit=' + PAGE_LIMIT + '&skip=' + offset)
        .then( res => {
          let pageNum = Math.ceil(res.data.count/PAGE_LIMIT);
          this.setState({
            data: res.data.data,
            pageCount: pageNum,

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
    } catch {

    }
  }

  updateDataForPage() {
    this.props.history.push('/?page=' + this.state.currentPage);
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
    let thisRef = this;
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
