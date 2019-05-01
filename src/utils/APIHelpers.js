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

  let data = {
    'pet_id': id
  };

  return axios.post(API_URL + 'favorite', data, config)
    .then((response)=>{
    })
    .catch();
}

export async function removePetFromFavorite(id) {
  let token = await window.localStorage.getItem('token');
  let config = {
    headers: {'Authorization': "bearer " + token},
    data: {'pet_id': id}
  };

  return axios.delete(API_URL + 'favorite', config)
    .then((response)=>{
    })
    .catch();

}

export async function upvoteQuestion(id) {
  let token = await window.localStorage.getItem('token');
  let config = {
    headers: {'Authorization': "bearer " + token}
  };

  let data = {
    'id': id
  };

  return axios.post(API_URL + 'upvoteq', data, config)
    .then((response)=>{
    })
    .catch();
}

export async function undoUpvoteQuestion(id) {
  let token = await window.localStorage.getItem('token');
  let config = {
    headers: {'Authorization': "bearer " + token},
    data: {'id': id}
  };

  return axios.delete(API_URL + 'upvoteq', config)
    .then((response)=>{
    })
    .catch();

}

