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

export async function addPetToFavorite(id) {
  let token = await window.localStorage.getItem('token');
  let config = {
    headers: {'Authorization': "bearer " + token}
  };

  return axios.get(API_URL + 'user', config)
    .then((response)=>{
      const favoritedPets = response.data.data.favoritedPets;
      if (favoritedPets.includes(id)) {
        return;
      } else {
        favoritedPets.push(id);

        let data = {
          'favoritedPets': favoritedPets
        };
        axios.put(API_URL + 'user', data, config)
          .then( res => {});

      }
    });
}

export async function removePetFromFavorite(id) {
  let token = await window.localStorage.getItem('token');
  let config = {
    headers: {'Authorization': "bearer " + token}
  };

  return axios.get(API_URL + 'user', config)
    .then((response)=>{
      let favoritedPets = response.data.data.favoritedPets;
      if (favoritedPets.includes(id)) {
        favoritedPets.splice(favoritedPets.indexOf(id),1);
        let data = {
          'favoritedPets': favoritedPets
        };
        axios.put(API_URL + 'user', data, config)
          .then( res => {});
      } else {
        return;
      }
    });
}
