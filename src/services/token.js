import jwtDecode from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
import { TOKEN_KEY } from './apiServices';

export const useCheckToken = () => {
  // const navigate = useNavigate();

  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return true;
  }

  const decodedToken = jwtDecode(token);

  // "exp" is in Unix time (seconds since 1970-01-01T00:00:00Z) not in milliseconds
  const dateNow = new Date().getTime() / 1000;

  if (decodedToken.exp < dateNow) {
    // The token is expired
    localStorage.removeItem(TOKEN_KEY);
    // navigate('/login');
    return true;
  }

  return false;
};

export function removeTokenIfExpired() {
  if (isTokenExpired(localStorage[TOKEN_KEY])) {
    localStorage.removeItem(TOKEN_KEY);
  }
}

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export async function getUserData() {
  try {
    const response = await axios.get('/api/user/data', {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`
      }
    });
    const data = response.data;
    // Use your data
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // If token is invalid
      localStorage.removeItem(TOKEN_KEY);
    }
    // Handle error
    console.error(error);
  }
}

getUserData();
