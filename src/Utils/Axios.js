import axios from 'axios';
import { urlPrefix } from 'Config/Config.js';

const post = async (url, body, validateState, auth) => {
  return await axios.post(urlPrefix + url, body, {
    validateState: validateState,
    headers: {
      Authorization: auth ? localStorage.getItem('token') : '',
    },
  });
};

const get = async (url, validateState, auth) => {
  return await axios.get(urlPrefix + url, {
    validateState: validateState,
    headers: {
      Authorization: auth ? localStorage.getItem('token') : '',
    },
  });
};

const getPages = async (url, page, size, validateState, auth) => {
  return await axios.get(urlPrefix + url, {
    params: { page, size },
    validateState: validateState,
    headers: {
      Authorization: auth ? localStorage.getItem('token') : '',
    },
  });
};

export { post, get, getPages };
