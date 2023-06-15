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
