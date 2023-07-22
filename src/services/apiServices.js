import axios from 'axios';
const urlbackend = import.meta.env.VITE_BACKEND_URL;

export const API_URL = urlbackend;
// export const API_URL = 'http://172.20.10.3:3001';
// export const API_URL = 'http://localhost:3001';
// export const API_URL = 'http://192.168.1.29:3001';
// export const API_URL = 'http://172.20.10.3:3001';

//maintainable for fast change

export const TOKEN_KEY = 'x-api-key';
//to-do : change for another token / add others

export const handleApiGet = async (_url) => {
  try {
    const resp = await axios({
      url: _url,
      headers: {
        'x-api-key': localStorage[TOKEN_KEY]
      }
    });

    return resp.data;
  } catch (err) {
    // We assume that the API returns a 404 status when a category is not found in the database
    if (err.response && err.response.status === 404) {
      return null;
    }

    // If the error is not about a category not being found, rethrow the error
    throw err;
  }
};

export const handleApiPost = async (_url, data) => {
  try {
    const resp = await axios.post(_url, data, {
      headers: {
        'x-api-key': localStorage[TOKEN_KEY]
      }
    });
    // console.log(resp.data);
    // console.log(data);
    return resp.data;
  } catch (err) {
    throw err;
  }
};

// apiServices.js

export const handleApiDelete = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'x-api-key': localStorage[TOKEN_KEY],
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error deleting product');
    }

    // Return the response if needed
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// for post,put,patch,delete methods
export const handleApiMethod = async (_url, _method, _body = {}) => {
  try {
    const resp = await axios({
      url: _url,
      method: _method,
      data: _body,
      headers: {
        'x-api-key': localStorage[TOKEN_KEY]
      }
    });
    return resp.data;
  } catch (err) {
    // same as before
    throw err;
  }
};
