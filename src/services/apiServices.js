import axios from 'axios';

export const API_URL = 'http://localhost:3001';
//maintainable for fast change

export const TOKEN_KEY = 'brio-token';
//to-do : change for another token / add others

export const handleApiGet = async (_url) => {
  // headers: -> sends through a token that sits in the local storage
  // Even if there is no local storage information, we will not get an error
  try {
    const resp = await axios({
      url: _url,
      headers: {
        'x-api-key': localStorage[TOKEN_KEY]
      }
    });
    return resp.data;
  } catch (err) {
    // throw -> reject is equivalent to error
    // So we know there is a problem with the request
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
    console.log(resp.data);
    console.log(data);
    return resp.data;
  } catch (err) {
    throw err;
  }
};

export const handleApiPatch = async (url, data) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
  }

  return await response.json();
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
