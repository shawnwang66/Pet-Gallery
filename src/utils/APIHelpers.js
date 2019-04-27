import axios from 'axios';
const API_URL = "http://pet-gallery.herokuapp.com/api/";

export function getUserInfo(token) {
  // get user info

  const config ={
    headers: {'Authorization': "bearer " + token}
  };

  return axios.get(API_URL + 'user', config)
    .then((response)=>{
      const resData = response.data.data;

      return resData;
    });
}

export function addPetToFavorite(token, id) {
  if (token === undefined) {
    return;
  }
  const config ={
    headers: {'Authorization': "bearer " + token}
  };

  return axios.get(API_URL + 'user', config)
    .then((response)=>{
      const favoritedPets = response.data.data.favoritedPets;
      console.log(favoritedPets, id);
    });}
